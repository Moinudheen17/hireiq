import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/client";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "36px 28px", position: "relative" }}>

      {/* Orbs */}
      <div style={{ position: "fixed", width: "380px", height: "380px", background: "radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 65%)", top: "-140px", left: "-100px", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "fixed", width: "280px", height: "280px", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 65%)", bottom: "-60px", right: "-80px", borderRadius: "50%", pointerEvents: "none" }} />

      <div style={{ fontSize: "10px", fontWeight: 700, color: "#38BDF8", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "8px" }}>Dashboard</div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "30px", fontWeight: 900, color: "#fff", letterSpacing: "-0.8px", marginBottom: "4px" }}>
        Active <em style={{ fontStyle: "italic", color: "#38BDF8" }}>Openings.</em>
      </div>
      <div style={{ fontSize: "12px", fontWeight: 500, color: "#94C8E8", marginBottom: "32px" }}>
        {jobs.length} job{jobs.length !== 1 ? "s" : ""} · click any to view details
      </div>

      {loading && <p style={{ color: "#94C8E8", fontWeight: 500 }}>Loading...</p>}

      {!loading && jobs.length === 0 && (
        <div style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "12px",
          padding: "48px",
          textAlign: "center",
        }}>
          <div style={{ fontSize: "32px", marginBottom: "12px" }}>💼</div>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#FFFFFF", marginBottom: "8px" }}>No jobs yet</div>
          <div style={{ fontSize: "13px", fontWeight: 500, color: "#94C8E8" }}>Create a job to start screening candidates.</div>
        </div>
      )}

      <div>
        {jobs.map((job) => (
          <div
            key={job.id}
            onClick={() => navigate(`/jobs/${job.id}`)}
            style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "12px",
              padding: "20px 22px",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              transition: "all 0.25s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(56,189,248,0.05)";
              e.currentTarget.style.borderColor = "rgba(56,189,248,0.25)";
              e.currentTarget.style.boxShadow = "0 0 32px rgba(56,189,248,0.08), inset 0 0 28px rgba(56,189,248,0.03)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.3px" }}>
                {job.title}
              </div>
              <div style={{ fontSize: "11px", fontWeight: 500, color: "#7EB8D4", marginTop: "5px" }}>
                Created {new Date(job.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </div>
            </div>
            <span style={{
              fontSize: "10px", fontWeight: 700,
              padding: "5px 12px", borderRadius: "6px",
              letterSpacing: "0.8px", textTransform: "uppercase",
              background: job.status === "screened" ? "rgba(56,189,248,0.1)" : "rgba(245,158,11,0.09)",
              color: job.status === "screened" ? "#38BDF8" : "#FBB040",
              border: job.status === "screened" ? "1px solid rgba(56,189,248,0.25)" : "1px solid rgba(245,158,11,0.2)",
            }}>
              {job.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}