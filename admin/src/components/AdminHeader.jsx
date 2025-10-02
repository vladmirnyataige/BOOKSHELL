import React from "react";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("AdminToken"); // clear token
    navigate("/admin/login"); // redirect back to login page
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        background: "linear-gradient(to right,#1a237e,#26a69a)", // ✅ add gradient
        color: "white",
        borderRadius: "8px",
      }}
    >
      <h1 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
        📊 Admin Dashboard
      </h1>

      <button
        onClick={handleLogout}
        style={{
          padding: "8px 16px",
          background: "white",
          color: "#1a237e",
          fontWeight: "600",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default AdminHeader;
