"use client";

import { useState } from "react";
import Link from "next/link";

export default function StudentDashboardClient({ initialDocuments }) {
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [isFilterSet, setIsFilterSet] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFilterSet(true);
  };

  const clearFilters = () => {
    setIsFilterSet(false);
    setSemester("");
    setSubject("");
  };

  // Filter documents based on selection
  const filteredDocuments = initialDocuments.filter((doc) => {
    const matchSemester = semester ? doc.semester.toString() === semester.toString() : true;
    const matchSubject = subject ? doc.subject.toLowerCase().includes(subject.toLowerCase()) : true;
    return matchSemester && matchSubject;
  });

  if (!isFilterSet) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "4rem" }}>
        <h1 className="h1" style={{ marginBottom: "1rem" }}>Welcome, Student</h1>
        <p className="p" style={{ marginBottom: "2rem" }}>Please select your semester and preferred subject to view relevant materials.</p>
        
        <div className="card" style={{ width: "100%", maxWidth: "500px" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--gray-light)" }}>In which semester are you?</label>
              <select 
                value={semester} 
                onChange={(e) => setSemester(e.target.value)}
                required
                style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)", background: "#000", color: "#fff" }}
              >
                <option value="" disabled>Select Semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={s}>Semester {s}</option>)}
              </select>
            </div>
            
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--gray-light)" }}>Preferred Subject</label>
              <input 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                placeholder="e.g. Mathematics"
                style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)", background: "#000", color: "#fff" }}
              />
            </div>

            <button type="submit" className="btn">Continue</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 className="h1" style={{ marginBottom: "0.5rem" }}>Student Dashboard</h1>
          <p className="p">Showing materials for <strong>Semester {semester}</strong> • <strong>{subject}</strong></p>
        </div>
        <button className="btn btn-secondary" onClick={clearFilters}>Change Filters</button>
      </div>

      <div>
        {filteredDocuments.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
            <p className="p">No documents available for this semester and subject.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>{doc.title}</h3>
                <p style={{ color: "var(--gray-light)", fontSize: "0.85rem", marginBottom: "1rem" }}>
                  Uploaded by {doc.teacher.name} on {new Date(doc.createdAt).toLocaleDateString()}
                  <br/>
                  Sem {doc.semester} • {doc.subject}
                </p>
                {doc.description && <p style={{ fontSize: "0.95rem", marginBottom: "1.5rem", flex: 1 }}>{doc.description}</p>}
                
                <Link href={`/document/${doc.id}`} style={{ marginTop: "auto" }}>
                  <span className="btn" style={{ width: "100%", display: "inline-block", textAlign: "center" }}>
                    Open & Study
                  </span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
