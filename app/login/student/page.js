"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

export default function StudentLoginPage() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      Cookies.set("role", "STUDENT", { expires: 7 });
      window.location.href = "/student";
    }, 1500);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "radial-gradient(ellipse at 40% 0%, rgba(52,199,89,0.10) 0%, #000 60%)",
      padding: "2rem",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "420px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
      }}>
        {/* Logo + Brand */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <div style={{
            width: "72px", height: "72px",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 0 40px rgba(52,199,89,0.25)",
            border: "1px solid rgba(52,199,89,0.25)",
          }}>
            <Image src="/logo.png" alt="Exam Buddy Logo" width={72} height={72} style={{ objectFit: "cover" }} />
          </div>
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "1.75rem", fontWeight: "700", color: "#f5f5f7", letterSpacing: "-0.02em" }}>
              Exam Buddy
            </h1>
            <p style={{ color: "#86868b", fontSize: "0.9rem", marginTop: "0.25rem" }}>
              Student Portal
            </p>
          </div>
        </div>

        {/* Card */}
        <div style={{
          width: "100%",
          background: "rgba(29,29,31,0.85)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRadius: "24px",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "2.5rem 2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>👨‍🎓</div>
            <h2 style={{ fontSize: "1.4rem", fontWeight: "600", color: "#f5f5f7" }}>
              Sign in as Student
            </h2>
            <p style={{ color: "#86868b", fontSize: "0.9rem", marginTop: "0.5rem", lineHeight: 1.5 }}>
              Access notes, previous year papers, and AI-generated expected questions.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {/* Google Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                width: "100%",
                padding: "0.85rem 1.5rem",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.15)",
                background: loading ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.08)",
                color: "#f5f5f7",
                fontSize: "0.95rem",
                fontWeight: "500",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                backdropFilter: "blur(8px)",
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
            >
              {loading ? (
                <>
                  <div style={{
                    width: "18px", height: "18px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "#34C759",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }} />
                  Signing in...
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                    <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </>
              )}
            </button>
          </div>

          <p style={{ textAlign: "center", color: "#86868b", fontSize: "0.8rem", lineHeight: 1.5 }}>
            By continuing, you agree to Exam Buddy's{" "}
            <span style={{ color: "#2997ff" }}>Terms of Service</span> and{" "}
            <span style={{ color: "#2997ff" }}>Privacy Policy</span>.
          </p>
        </div>

        {/* Switch role */}
        <p style={{ color: "#86868b", fontSize: "0.875rem" }}>
          Are you a teacher?{" "}
          <Link href="/login/teacher" style={{ color: "#2997ff", fontWeight: "500" }}>
            Sign in here
          </Link>
        </p>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
