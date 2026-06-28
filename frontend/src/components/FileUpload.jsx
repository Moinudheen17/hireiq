import { useState } from "react";

export default function FileUpload({ onFilesSelected }) {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);

  const handleFiles = (selected) => {
    const arr = Array.from(selected);
    setFiles(arr);
    onFilesSelected(arr);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
      style={{
        border: `2px dashed ${dragging ? "rgba(56,189,248,0.6)" : "rgba(255,255,255,0.1)"}`,
        borderRadius: "12px",
        padding: "40px 24px",
        textAlign: "center",
        background: dragging ? "rgba(56,189,248,0.05)" : "rgba(255,255,255,0.02)",
        backdropFilter: "blur(12px)",
        transition: "all 0.25s",
        boxShadow: dragging ? "0 0 32px rgba(56,189,248,0.1)" : "none",
      }}
    >
      <div style={{ fontSize: "32px", marginBottom: "12px" }}>📄</div>
      <p style={{ fontSize: "14px", fontWeight: 600, color: "#FFFFFF", marginBottom: "6px" }}>
        Drag & drop resumes here
      </p>
      <p style={{ fontSize: "12px", fontWeight: 500, color: "#94C8E8", marginBottom: "20px" }}>
        Supports PDF and DOCX
      </p>

      <label style={{
        background: "rgba(56,189,248,0.12)",
        color: "#38BDF8",
        border: "1px solid rgba(56,189,248,0.28)",
        padding: "10px 24px",
        borderRadius: "8px",
        fontSize: "13px",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.2s",
      }}>
        Browse Files
        <input
          type="file"
          multiple
          accept=".pdf,.docx"
          style={{ display: "none" }}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </label>

      {files.length > 0 && (
        <ul style={{ marginTop: "20px", textAlign: "left", listStyle: "none", padding: 0 }}>
          {files.map((f, i) => (
            <li key={i} style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "#94C8E8",
              padding: "6px 0",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <span style={{ color: "#4ADE80" }}>✓</span> {f.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}