"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const role = Cookies.get("role");
    if (role === "TEACHER") router.push("/teacher");
    else if (role === "STUDENT") router.push("/student");
  }, [router]);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "2rem",
      background: "radial-gradient(ellipse at 50% -20%, rgba(41,151,255,0.15) 0%, #000 60%)",
    }}>
      {/* Logo */}
      <div style={{
        width: "90px", height: "90px",
        borderRadius: "24px",
        overflow: "hidden",
        marginBottom: "1.5rem",
        boxShadow: "0 0 60px rgba(41,151,255,0.3)",
        border: "1px solid rgba(41,151,255,0.25)",
      }}>
        <Image src="/logo.png" alt="Exam Buddy" width={90} height={90} style={{ objectFit: "cover" }} />
      </div>

      {/* Badge */}
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        background: "rgba(41,151,255,0.1)",
        border: "1px solid rgba(41,151,255,0.3)",
        borderRadius: "999px",
        padding: "0.35rem 1rem",
        marginBottom: "1.5rem",
        fontSize: "0.85rem",
        color: "#2997ff",
        fontWeight: "500",
      }}>
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2997ff", display: "inline-block" }} />
        AI-Powered Learning Platform
      </div>

      {/* Headline */}
      <h1 style={{
        fontSize: "clamp(2.5rem, 6vw, 4rem)",
        fontWeight: "700",
        color: "#f5f5f7",
        letterSpacing: "-0.03em",
        lineHeight: 1.05,
        maxWidth: "700px",
        marginBottom: "1.25rem",
      }}>
        Your smartest study<br />
        <span style={{ color: "#2997ff" }}>companion</span>
      </h1>

      <p style={{
        fontSize: "1.15rem",
        color: "#86868b",
        maxWidth: "520px",
        lineHeight: 1.6,
        marginBottom: "3rem",
      }}>
        Access previous year papers, study notes, and AI-generated expected questions — all in one place.
      </p>

      {/* CTA Cards */}
      <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/login/teacher">
          <div style={{
            width: "240px",
            background: "rgba(29,29,31,0.8)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "1.75rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.25,0.1,0.25,1)",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.border = "1px solid rgba(41,151,255,0.4)";
              e.currentTarget.style.boxShadow = "0 20px 60px rgba(41,151,255,0.15)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ fontSize: "2.5rem" }}>👨‍🏫</div>
            <div>
              <h2 style={{ fontSize: "1.15rem", fontWeight: "600", color: "#f5f5f7", marginBottom: "0.35rem" }}>Teacher</h2>
              <p style={{ fontSize: "0.85rem", color: "#86868b", lineHeight: 1.5 }}>Upload materials & manage your class resources</p>
            </div>
            <div style={{
              width: "100%",
              padding: "0.65rem",
              borderRadius: "10px",
              background: "#2997ff",
              color: "#fff",
              fontWeight: "600",
              fontSize: "0.9rem",
            }}>
              Sign in →
            </div>
          </div>
        </Link>

        <Link href="/login/student">
          <div style={{
            width: "240px",
            background: "rgba(29,29,31,0.8)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "1.75rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.25,0.1,0.25,1)",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.border = "1px solid rgba(52,199,89,0.4)";
              e.currentTarget.style.boxShadow = "0 20px 60px rgba(52,199,89,0.12)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ fontSize: "2.5rem" }}>👨‍🎓</div>
            <div>
              <h2 style={{ fontSize: "1.15rem", fontWeight: "600", color: "#f5f5f7", marginBottom: "0.35rem" }}>Student</h2>
              <p style={{ fontSize: "0.85rem", color: "#86868b", lineHeight: 1.5 }}>Study smarter with AI-powered question generation</p>
            </div>
            <div style={{
              width: "100%",
              padding: "0.65rem",
              borderRadius: "10px",
              background: "#34C759",
              color: "#fff",
              fontWeight: "600",
              fontSize: "0.9rem",
            }}>
              Sign in →
            </div>
          </div>
        </Link>
      </div>

      {/* Footer note */}
      <p style={{ marginTop: "3rem", fontSize: "0.8rem", color: "#555" }}>
        Secured with Google Authentication • No password needed
      </p>
    </div>
  );
}
