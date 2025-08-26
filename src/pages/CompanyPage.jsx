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
      .then((r) => r.json())
      .then((d) => {
        if (d.status === "Y") {
          setProjects(d.projects);
          setOrgName(d.organization);
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
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold text-indigo-700">{orgName}</h1>
          {isOrgAdmin && (
            <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700">
              + Add Project
            </button>
          )}
        </div>

        {/* 3-column grid always */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="border border-gray-300 rounded-xl p-6 bg-white shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {proj.name}
              </h2>
              <p className="text-gray-600 text-sm mb-4">{proj.description}</p>
              <div className="text-sm text-gray-700 space-y-1">
                <p><span className="font-medium">Manager:</span> {proj.managerName}</p>
                <p><span className="font-medium">Start:</span> {proj.startDate}</p>
                <p><span className="font-medium">End:</span> {proj.endDate}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
