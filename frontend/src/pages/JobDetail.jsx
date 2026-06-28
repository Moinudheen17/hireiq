import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/client";
import FileUpload from "../components/FileUpload";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [screening, setScreening] = useState(false);

  useEffect(() => {
    API.get(`/jobs/${id}`).then((res) => setJob(res.data));
  }, [id]);

  const handleUpload = async () => {
    if (files.length === 0) return alert("Please select files first");
    setUploading(true);
    const formData = new FormData();
    files.forEach((f) => formData.append("files", f));
    try {
      await API.post(`/jobs/${id}/upload`, formData);
      alert(`${files.length} resume(s) uploaded successfully`);
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleScreen = async () => {
    setScreening(true);
    try {
      await API.post(`/jobs/${id}/screen`);
      navigate(`/jobs/${id}/results`);
    } catch (err) {
      alert("Screening failed");
    } finally {
      setScreening(false);
    }
  };

  const btnStyle = (color, disabled) => ({
    width: "100%",
    background: disabled ? "rgba(255,255,255,0.03)" : `rgba(${color},0.12)`,
    color: disabled ? "#94C8E8" : `rgb(${color})`,
    border: `1px solid rgba(${color},0.25)`,
    padding: "14px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 700,
    fontFamily: "'Space Grotesk', sans-serif",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.2s",
    letterSpacing: "0.3px",
  });

  if (!job) return <p style={{ padding: "36px 28px", color: "#94C8E8", fontWeight: 500 }}>Loading...</p>;

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "36px 28px", position: "relative" }}>

      <div style={{ position: "fixed", width: "380px", height: "380px", background: "radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 65%)", top: "-140px", left: "-100px", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "fixed", width: "280px", height: "280px", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 65%)", bottom: "-60px", right: "-80px", borderRadius: "50%", pointerEvents: "none" }} />

      <div style={{ fontSize: "10px", fontWeight: 700, color: "#38BDF8", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "8px" }}>Job Detail</div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 900, color: "#fff", letterSpacing: "-0.8px", marginBottom: "4px" }}>
        {job.title}
      </div>
      <div style={{ fontSize: "12px", fontWeight: 500, color: "#94C8E8", marginBottom: "32px", lineHeight: 1.6 }}>
        {job.description}
      </div>

      <div style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "14px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}>
        <div>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#38BDF8", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "14px" }}>
            Upload Resumes
          </div>
          <FileUpload onFilesSelected={setFiles} />
        </div>

        <button
          onClick={handleUpload}
          disabled={uploading}
          style={btnStyle("148,200,232", uploading)}
          onMouseEnter={e => { if (!uploading) e.currentTarget.style.boxShadow = "0 0 24px rgba(56,189,248,0.15)"; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; }}
        >
          {uploading ? "Uploading..." : "Upload Resumes →"}
        </button>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "20px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#38BDF8", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "10px" }}>
            Run AI Screening
          </div>
          <div style={{ fontSize: "12px", fontWeight: 500, color: "#94C8E8", marginBottom: "16px" }}>
            Scores and ranks all uploaded resumes against this job description.
          </div>
          <button
            onClick={handleScreen}
            disabled={screening}
            style={{
              ...btnStyle("56,189,248", screening),
              background: screening ? "rgba(56,189,248,0.06)" : "rgba(56,189,248,0.14)",
              color: "#38BDF8",
            }}
            onMouseEnter={e => { if (!screening) e.currentTarget.style.boxShadow = "0 0 28px rgba(56,189,248,0.22)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; }}
          >
            {screening ? "Screening... please wait" : "Screen Candidates →"}
          </button>
        </div>
      </div>
    </div>
  );
}