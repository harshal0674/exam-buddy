"use client";

import Link from "next/link";
import Image from "next/image";
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
    <nav className="nav-blur" style={{
      padding: "0.85rem 2rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}>
      {/* Logo + Brand */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.65rem", textDecoration: "none" }}>
        <div style={{
          width: "32px", height: "32px",
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid rgba(41,151,255,0.3)",
          flexShrink: 0,
        }}>
          <Image src="/logo.png" alt="Exam Buddy" width={32} height={32} style={{ objectFit: "cover" }} />
        </div>
        <span style={{ fontSize: "1.1rem", fontWeight: "700", color: "#f5f5f7", letterSpacing: "-0.01em" }}>
          Exam Buddy
        </span>
      </Link>

      {/* Right side */}
      <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
        {role === "TEACHER" && (
          <Link href="/teacher">
            <span style={{ color: "#86868b", fontWeight: "500", fontSize: "0.9rem", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#f5f5f7"}
              onMouseLeave={e => e.currentTarget.style.color = "#86868b"}
            >Dashboard</span>
          </Link>
        )}
        {role === "STUDENT" && (
          <Link href="/student">
            <span style={{ color: "#86868b", fontWeight: "500", fontSize: "0.9rem", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#f5f5f7"}
              onMouseLeave={e => e.currentTarget.style.color = "#86868b"}
            >Dashboard</span>
          </Link>
        )}

        {/* Role badge */}
        {role && (
          <div style={{
            padding: "0.3rem 0.75rem",
            borderRadius: "999px",
            background: role === "TEACHER" ? "rgba(41,151,255,0.12)" : "rgba(52,199,89,0.12)",
            border: `1px solid ${role === "TEACHER" ? "rgba(41,151,255,0.3)" : "rgba(52,199,89,0.3)"}`,
            color: role === "TEACHER" ? "#2997ff" : "#34C759",
            fontSize: "0.78rem",
            fontWeight: "600",
            letterSpacing: "0.02em",
          }}>
            {role === "TEACHER" ? "👨‍🏫 Teacher" : "👨‍🎓 Student"}
          </div>
        )}

        {role ? (
          <button
            onClick={logout}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
              color: "#86868b",
              fontSize: "0.85rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#f5f5f7"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#86868b"; }}
          >
            Sign out
          </button>
        ) : (
          <Link href="/login/teacher">
            <span style={{
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              background: "#2997ff",
              color: "#fff",
              fontSize: "0.85rem",
              fontWeight: "600",
            }}>Sign in</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
