"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Navbar() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    setRole(Cookies.get("role"));
  }, []);

  const logout = () => {
    Cookies.remove("role");
    window.location.href = "/";
  };

  return (
    <nav className="nav-blur" style={{ padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Link href="/">
        <span style={{ fontSize: "1.5rem", fontWeight: "700", color: "#f5f5f7" }}>Exam Buddy</span>
      </Link>
      
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        {role === "TEACHER" && (
          <Link href="/teacher">
            <span style={{ color: "#f5f5f7", fontWeight: "500" }}>Teacher Dashboard</span>
          </Link>
        )}
        {role === "STUDENT" && (
          <Link href="/student">
            <span style={{ color: "#f5f5f7", fontWeight: "500" }}>Student Dashboard</span>
          </Link>
        )}
        
        {role ? (
          <button onClick={logout} className="btn btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}>
            Logout
          </button>
        ) : (
          <span style={{ color: "var(--gray-light)", fontSize: "0.9rem" }}>Select a role on the home page</span>
        )}
      </div>
    </nav>
  );
}
