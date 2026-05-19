"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TeacherDashboardClient({ initialDocuments }) {
  const [documents, setDocuments] = useState(initialDocuments);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleUpload = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const formData = new FormData(e.target);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const { document } = await res.json();
      setDocuments([document, ...documents]);
      e.target.reset();
      router.refresh();
    } else {
      alert("Upload failed");
    }

    setIsUploading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      <div>
        <h1 className="h1" style={{ marginBottom: "1rem" }}>Teacher Dashboard</h1>
        <p className="p">Upload and manage study materials and previous year papers.</p>
      </div>

      <div className="card" style={{ maxWidth: "600px" }}>
        <h2 className="h2" style={{ marginBottom: "1.5rem" }}>Upload Material</h2>
        <form onSubmit={handleUpload} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--gray-light)" }}>Title</label>
            <input 
              name="title" 
              required 
              style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)", background: "#000", color: "#fff" }} 
              placeholder="e.g. 2023 Mathematics Final Paper"
            />
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--gray-light)" }}>Semester</label>
              <select name="semester" style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)", background: "#000", color: "#fff" }}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={s}>Semester {s}</option>)}
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--gray-light)" }}>Subject</label>
              <input 
                name="subject" 
                required 
                style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)", background: "#000", color: "#fff" }} 
                placeholder="e.g. Mathematics"
              />
            </div>
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--gray-light)" }}>Description</label>
            <textarea 
              name="description" 
              style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)", background: "#000", color: "#fff", minHeight: "100px" }} 
              placeholder="Add any notes..."
            ></textarea>
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--gray-light)" }}>PDF File</label>
            <input 
              type="file" 
              name="file" 
              accept="application/pdf" 
              required 
              style={{ color: "var(--gray-light)" }}
            />
          </div>
          <button type="submit" className="btn" disabled={isUploading} style={{ marginTop: "1rem" }}>
            {isUploading ? "Uploading..." : "Upload Document"}
          </button>
        </form>
      </div>

      <div>
        <h2 className="h2" style={{ marginBottom: "1.5rem" }}>Your Uploaded Documents</h2>
        {documents.length === 0 ? (
          <p className="p">No documents uploaded yet.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {documents.map((doc) => (
              <div key={doc.id} className="card" style={{ padding: "1.5rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>{doc.title}</h3>
                <p style={{ color: "var(--gray-light)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                  {new Date(doc.createdAt).toLocaleDateString()} &bull; Sem {doc.semester} &bull; {doc.subject}
                </p>
                {doc.description && <p style={{ fontSize: "0.95rem", marginBottom: "1.5rem" }}>{doc.description}</p>}
                <a href={doc.fileUrl} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ width: "100%", fontSize: "0.9rem" }}>
                  View PDF
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
