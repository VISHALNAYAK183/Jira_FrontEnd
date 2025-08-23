import React from "react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6">
      {/* Card */}
      <div className="w-full max-w-md bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.6)] p-10 transform transition duration-500 hover:scale-105 hover:shadow-[0_12px_45px_rgba(0,0,0,0.8)]">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center text-white mb-4 drop-shadow-lg">
          Welcome Back ✨
        </h2>
        <p className="text-center text-gray-300 mb-8 text-lg">
          Sign in to continue your journey
        </p>

        {/* Login Form */}
        <form className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-gray-200 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:bg-gray-900 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-200 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-bold text-lg rounded-xl shadow-lg transition transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(236,72,153,0.7)]"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-8">
          <hr className="flex-grow border-gray-700" />
          <span className="px-3 text-gray-400 text-sm">or</span>
          <hr className="flex-grow border-gray-700" />
        </div>

        {/* Social Login */}
        <div className="flex space-x-4">
          <button className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition text-white font-medium border border-gray-600">
            Google
          </button>
          <button className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition text-white font-medium border border-gray-600">
            GitHub
          </button>
        </div>

        {/* Footer */}
        <p className="mt-8 text-sm text-center text-gray-400">
          Don’t have an account?{" "}
          <a href="#" className="text-pink-400 hover:underline font-semibold">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
