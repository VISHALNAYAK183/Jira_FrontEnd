import React, { useState } from "react";

export default function AddProject() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    managerId:"",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const token = JSON.parse(localStorage.getItem("authData"))?.token;
    const orgId = localStorage.getItem("orgId");
  //  const managerId = localStorage.getItem("userId"); 

    try {
      const res = await fetch("http://localhost:8080/projects/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          orgId,
         
        }),
      });

      const data = await res.json();
      if (data.status === "Y") {
        setMessage({ type: "success", text: "Project created successfully!" });
        setForm({ name: "", description: "", startDate: "", endDate: "" });
      } else {
        setMessage({ type: "error", text: data.message || "Failed to create project." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Server error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-lg p-10">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Add New Project
        </h1>

        {message && (
          <div
            className={`mb-4 text-center p-3 rounded-lg ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Name */}
          <div>
            <label className="block text-left text-gray-700 font-medium mb-2">
              Project Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter project name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-left text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter project description"
            ></textarea>
          </div>
           {/* Manager Id */}
          <div>
            <label className="block text-left text-gray-700 font-medium mb-2">
              Manager Id
            </label>
            <textarea
              name="managerId"
              value={form.managerId}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter Manager id"
            ></textarea>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-left text-gray-700 font-medium mb-2">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-left text-gray-700 font-medium mb-2">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
          >
            {loading ? "Adding Project..." : "Add Project"}
          </button>
        </form>
      </div>
    </div>
  );
}
