import dbConnect from "@/app/lib/mongodb";   // ✅ keep lib outside /app
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { usernameOrEmail, password } = body;

    console.log("📥 Incoming request body:", body);

    // --- Validation ---
    if (!usernameOrEmail || !password) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // If looks like email, validate email format
    const isEmail = /\S+@\S+\.\S+/.test(usernameOrEmail);
    if (!isEmail && usernameOrEmail.length < 3) {
      return new Response(
        JSON.stringify({ error: "Username must be at least 3 characters" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (password.length < 6) {
      return new Response(
        JSON.stringify({ error: "Password must be at least 6 characters" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // --- Connect DB ---
    console.log("🔌 Connecting to MongoDB...");
    await dbConnect();
    console.log("✅ MongoDB connected");

    // --- Check duplicate ---
    const existingUser = await User.findOne({ usernameOrEmail });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "User already exists" }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    // --- Save new user ---
    const newUser = await User.create({ usernameOrEmail, password });
    console.log("✅ User saved:", newUser);

    return new Response(JSON.stringify(newUser), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  }catch (error) {
  console.error("❌ Error saving user:", error);

  if (error instanceof Error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { error: "Failed to save user" },
    { status: 500 }
  );
}

}
