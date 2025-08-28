import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Github, Chrome } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok && data.status === "Y") {
        localStorage.setItem("authData", JSON.stringify(data));
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 p-6">
      {/* Glass Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.25)] p-10 border border-white/20 animate-fadeIn">
        
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center text-white mb-3 tracking-tight drop-shadow-md">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-200 mb-10 text-sm tracking-wide">
          Sign in to continue your journey
        </p>

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-gray-200 text-sm font-medium mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition duration-200"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-200 text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-200"
                required
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm text-center animate-pulse">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 text-white font-bold text-lg rounded-xl shadow-lg transition transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(236,72,153,0.6)] disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-10">
          <hr className="flex-grow border-gray-500/40" />
          <span className="px-3 text-gray-300 text-sm">or</span>
          <hr className="flex-grow border-gray-500/40" />
        </div>

        {/* Social Login */}
        <div className="flex space-x-4">
          <button className="flex-1 flex items-center justify-center space-x-2 py-3 bg-white/10 hover:bg-white/20 rounded-xl shadow-md hover:shadow-lg transition text-white font-medium border border-white/20">
            <Chrome className="w-5 h-5" /> <span>Google</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 py-3 bg-white/10 hover:bg-white/20 rounded-xl shadow-md hover:shadow-lg transition text-white font-medium border border-white/20">
            <Github className="w-5 h-5" /> <span>GitHub</span>
          </button>
        </div>

        {/* Footer */}
        <p className="mt-10 text-sm text-center text-gray-300">
          Don’t have an account?{" "}
          <a
            href="#"
            className="text-pink-400 hover:text-pink-300 hover:underline font-semibold transition"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
