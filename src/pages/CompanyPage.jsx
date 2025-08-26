import React, { useEffect, useState } from "react";

export default function CompanyPage() {
  const [projects, setProjects] = useState([]);
  const [orgName, setOrgName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("authData"))?.token;
    const orgId = localStorage.getItem("orgId");

    if (!orgId || !token) return;

    fetch(`http://localhost:8080/dashboard/org/${orgId}/projects`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "Y") {
          setProjects(data.projects);
          setOrgName(data.organization);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700 text-lg">Loading projects...</p>
      </div>
    );
  }

  const isOrgAdmin =
    localStorage.getItem("designation")?.toLowerCase() === "orgadmin";

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-indigo-700">{orgName}</h1>
        {isOrgAdmin && (
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700">
            + Add Project
          </button>
        )}
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {proj.name}
            </h2>
            <p className="text-gray-600 text-sm mt-2">{proj.description}</p>
            <div className="mt-4 text-sm text-gray-700">
              <p>
                <strong>Manager:</strong> {proj.managerName}
              </p>
              <p>
                <strong>Start:</strong> {proj.startDate} |{" "}
                <strong>End:</strong> {proj.endDate}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
