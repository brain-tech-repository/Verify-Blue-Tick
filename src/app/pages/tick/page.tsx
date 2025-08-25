"use client"
import { useState, useEffect } from "react";

export default function InstagramCard() {
  const [likes, setLikes] = useState(2345);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    "Looks great! 🔥",
    "Can’t wait for the update!",
  ]);

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const toggleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const postComment = () => {
    if (comment.trim() === "") return;
    setComments([comment, ...comments]);
    setComment("");
     setTimeout(() => {
    setShowComments(prev => !prev);
  }, 3000);
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
            alt="Instagram"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-gray-800">Instagram</p>
            <p className="text-xs text-gray-500">Official Updates</p>
          </div>
        </div>
        <button onClick={goBack} className="text-gray-600 hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div>
        <h1
          className={`px-4 py-3 text-center font-semibold text-lg bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent transform transition-all duration-1000 ease-out ${
            animate ? "opacity-100 translate-y-0 scale-105" : "opacity-0 -translate-y-10 scale-90"
          }`}
        >
          🎉 Congratulations 🎉
        </h1>
        <p
          className={`px-4 py-6 text-center font-semibold text-lg bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text text-transparent transform transition-all duration-1000 ease-out delay-300 ${
            animate ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-5 scale-95"
          }`}
        >
          Wait for 2–3 days to verify the blue tick on your profile.
        </p>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 ">
        <div className="flex justify-center items-center space-x-10 mb-2">
          {/* Like Button */}
          <button onClick={toggleLike}>
            {liked ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="red"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 animate-bounce"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.239-4.5-5-4.5-1.657 0-3.115.895-4 2.222C11.115 4.645 9.657 3.75 8 3.75c-2.761 0-5 2.015-5 4.5 0 7.5 9 12 9 12s9-4.5 9-12z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 transition-transform duration-300 hover:scale-110"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.239-4.5-5-4.5-1.657 0-3.115.895-4 2.222C11.115 4.645 9.657 3.75 8 3.75c-2.761 0-5 2.015-5 4.5 0 7.5 9 12 9 12s9-4.5 9-12z"
                />
              </svg>
            )}
          </button>

          {/* Comment Button */}
          <button
            className="text-blue-600 font-semibold transition-transform duration-500 hover:scale-110"
            onClick={toggleComments}
          >
            Comment
          </button>
        </div>

        <p className="flex justify-center text-sm font-semibold text-gray-800">
          {likes} likes
        </p>
      </div>

      {/* Comment Section */}
      {showComments && (
        <div className="px-4 py-3 bg-gray-50 animate-fadeIn">
          <div className="flex items-center space-x-2 mb-3">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
            <button
              onClick={postComment}
              className="px-3 py-2 text-sm bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
            >
              Post
            </button>
          </div>

          {/* Comments List */}
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {comments.map((c, i) => (
              <p
                key={i}
                className="text-sm text-gray-800 transition duration-500 ease-in-out transform hover:translate-x-2 hover:scale-105"
              >
                <span className="font-semibold">User{i + 1}: </span>
                {c}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
