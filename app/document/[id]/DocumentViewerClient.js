"use client";

import { useState } from "react";
import Link from "next/link";

export default function DocumentViewerClient({ document }) {
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const askAI = async (prompt) => {
    setIsLoading(true);
    setAiResponse("");

    const res = await fetch("/api/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentId: document.id, prompt })
    });

    if (res.ok) {
      const data = await res.json();
      setAiResponse(data.result);
    } else {
      setAiResponse("Failed to generate response.");
    }
    setIsLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", height: "85vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <Link href="/student" style={{ color: "var(--accent)", marginBottom: "0.5rem", display: "inline-block" }}>
            &larr; Back to Dashboard
          </Link>
          <h1 className="h1">{document.title}</h1>
          <p className="p" style={{ fontSize: "0.9rem", color: "var(--gray-light)" }}>
            Uploaded by {document.teacher.name} &bull; Sem {document.semester} &bull; {document.subject}
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "2rem", flex: 1, overflow: "hidden" }}>
        {/* PDF Viewer */}
        <div className="card" style={{ flex: 2, padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "1rem", borderBottom: "1px solid var(--border)", background: "var(--gray-dark)" }}>
            <h3 style={{ fontWeight: 600 }}>Document Viewer</h3>
          </div>
          <iframe 
            src={document.fileUrl} 
            style={{ width: "100%", flex: 1, border: "none", background: "#fff" }} 
            title={document.title}
          />
        </div>

        {/* AI Assistant */}
        <div className="card" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <h3 className="h2" style={{ fontSize: "1.5rem" }}>✨ AI Assistant</h3>
          <p className="p" style={{ fontSize: "0.9rem" }}>
            Ask AI to analyze this document, extract expected questions, or summarize notes.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <button className="btn" onClick={() => askAI("expected questions")}>
              Generate Expected Questions
            </button>
            <button className="btn btn-secondary" onClick={() => askAI("summary")}>
              Summarize Document
            </button>
          </div>

          <div style={{ flex: 1, border: "1px solid var(--border)", borderRadius: "12px", padding: "1rem", background: "#000", overflowY: "auto", whiteSpace: "pre-wrap" }}>
            {isLoading ? (
              <div style={{ color: "var(--gray-light)", textAlign: "center", marginTop: "2rem" }}>
                Analyzing document...
              </div>
            ) : aiResponse ? (
              <div style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
                {aiResponse}
              </div>
            ) : (
              <div style={{ color: "var(--gray-light)", textAlign: "center", marginTop: "2rem", fontSize: "0.9rem" }}>
                AI insights will appear here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
