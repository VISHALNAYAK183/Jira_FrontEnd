import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// helper to decode JWT
function decodeJWT(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch (e) {
    console.error("Invalid token", e);
    return null;
  }
}

export default function Dashboard() {
  const [orgData, setOrgData] = useState(null);      // API data
  const [decodedUser, setDecodedUser] = useState(null); // JWT decoded user
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("authData");
    if (!storedData) return;

    const parsed = JSON.parse(storedData);
    const token = parsed.token;

    const decoded = decodeJWT(token);
    console.log("decode",decoded);
    setDecodedUser(decoded); // store decoded user info
    console.log("Decoded Token:", decoded);
const orgId = decoded?.orgId;
     if (decoded?.orgId) {
      localStorage.setItem("orgId", decoded.orgId);
      localStorage.setItem("designation", decoded.designation);
    }
   
    if (!orgId) {
      console.error("OrgId not found in token");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8080/dashboard/org/${orgId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "Y") {
          setOrgData(data);
          console.log("orgvvvvvvvvv",data);
        } else {
          console.error("Failed to fetch org:", data.message);
        }
      })
      .catch((err) => console.error("API error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <p className="text-white text-xl font-semibold">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6">
      {orgData ? (
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-3xl p-12 text-center transform transition hover:scale-105"     onClick={() => navigate("/company")}>
          {/* Logo (dummy placeholder for now) */}
          <div className="flex justify-center mb-6">
            <img
              src="https://via.placeholder.com/120x120.png?text=Logo"
              alt="Organization Logo"
              className="w-28 h-28 rounded-full shadow-md"
            />
          </div>

          {/* Org Name from API */}
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 drop-shadow-md">
            {orgData.orgName}
            
          </h1>

          {/* User Info from Token */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {decodedUser?.fullName || "Welcome User"}
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Designation:{" "}
            <span className="font-semibold text-indigo-600">
              {decodedUser?.designation || "N/A"}
            </span>
          </p>

          {/* Card Content */}
          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-10 shadow-inner">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Company Information
            </h2>
            <p className="text-gray-700">
              This is the organization you are part of. Soon we will fetch and
              display more company details from the API.
            </p>
          </div>
        </div>
      ) : (
        <p className="text-white text-xl font-semibold">
          No organization data found
        </p>
      )}
    </div>
  );
}
