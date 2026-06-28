import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/client";
import CandidateCard from "../components/CandidateCard";

export default function Results() {
  const { id } = useParams();
  const [results, setResults] = useState(null);

  useEffect(() => {
    API.get(`/jobs/${id}/results`).then((res) => setResults(res.data));
  }, [id]);

  if (!results) return <p style={{ padding: "36px 28px", color: "#94C8E8", fontWeight: 500 }}>Loading...</p>;

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "36px 28px", position: "relative" }}>

      <div style={{ position: "fixed", width: "380px", height: "380px", background: "radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 65%)", top: "-140px", left: "-100px", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "fixed", width: "280px", height: "280px", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 65%)", bottom: "-60px", right: "-80px", borderRadius: "50%", pointerEvents: "none" }} />

      <div style={{ fontSize: "10px", fontWeight: 700, color: "#38BDF8", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "8px" }}>Screening Results</div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "30px", fontWeight: 900, color: "#fff", letterSpacing: "-0.8px", marginBottom: "4px" }}>
        Ranked <em style={{ fontStyle: "italic", color: "#38BDF8" }}>Candidates.</em>
      </div>
      <div style={{ fontSize: "12px", fontWeight: 500, color: "#94C8E8", marginBottom: "8px" }}>
        {results.job.title}
      </div>
      <div style={{ fontSize: "12px", fontWeight: 500, color: "#7EB8D4", marginBottom: "32px" }}>
        {results.candidates.length} candidate{results.candidates.length !== 1 ? "s" : ""} screened · click any to view full detail
      </div>

      {/* Score Legend */}
      <div style={{
        display: "flex", gap: "20px", marginBottom: "24px",
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "10px", padding: "14px 20px",
      }}>
        {[
          { color: "#4ADE80", label: "Strong match", range: "70–100" },
          { color: "#FBB040", label: "Partial match", range: "40–69" },
          { color: "#F87171", label: "Weak match", range: "0–39" },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: item.color, boxShadow: `0 0 6px ${item.color}` }} />
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#FFFFFF" }}>{item.label}</span>
            <span style={{ fontSize: "11px", fontWeight: 500, color: "#7EB8D4" }}>{item.range}</span>
          </div>
        ))}
      </div>

      <div>
        {results.candidates.map((candidate, index) => (
          <CandidateCard key={candidate.id} candidate={candidate} rank={index + 1} />
        ))}
      </div>
    </div>
  );
}