import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/client";

export default function CandidateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    API.get(`/candidates/${id}`).then((res) => setCandidate(res.data));
  }, [id]);

  const getRingColor = (score) => {
    if (score >= 70) return "#4ADE80";
    if (score >= 40) return "#FBB040";
    return "#F87171";
  };

  const getStrokeDashoffset = (score) => {
    const circumference = 138.2;
    return circumference - (score / 100) * circumference;
  };

  if (!candidate) return <p style={{ padding: "36px 28px", color: "#94C8E8", fontWeight: 500 }}>Loading...</p>;

  const color = getRingColor(candidate.score);

  return (
    <div style={{ maxWidth: "780px", margin: "0 auto", padding: "36px 28px", position: "relative" }}>

      <div style={{ position: "fixed", width: "380px", height: "380px", background: "radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 65%)", top: "-140px", left: "-100px", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "fixed", width: "280px", height: "280px", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 65%)", bottom: "-60px", right: "-80px", borderRadius: "50%", pointerEvents: "none" }} />

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        style={{ background: "none", border: "none", color: "#38BDF8", fontSize: "13px", fontWeight: 600, cursor: "pointer", marginBottom: "24px", display: "flex", alignItems: "center", gap: "6px", fontFamily: "'Space Grotesk', sans-serif", padding: 0 }}
      >
        ← Back to results
      </button>

      {/* Header card */}
      <div style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "14px",
        padding: "28px 28px",
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
        gap: "24px",
      }}>
        {/* Big score ring */}
        <div style={{ position: "relative", width: "80px", height: "80px", flexShrink: 0 }}>
          <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: "rotate(-90deg)" }}>
            <defs>
              <filter id="glow-detail">
                <feGaussianBlur stdDeviation="3" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5"/>
            <circle
              cx="40" cy="40" r="34" fill="none"
              stroke={color} strokeWidth="5"
              strokeDasharray="213.6"
              strokeDashoffset={(213.6 - (candidate.score / 100) * 213.6)}
              strokeLinecap="round"
              filter="url(#glow-detail)"
            />
          </svg>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "'Playfair Display', serif",
            fontSize: "20px", fontWeight: 900, color: "#fff",
          }}>
            {candidate.score?.toFixed(0)}
          </div>
        </div>

        <div>
          <div style={{ fontSize: "10px", fontWeight: 700, color: "#38BDF8", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "6px" }}>Candidate</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 900, color: "#fff", letterSpacing: "-0.5px", marginBottom: "4px" }}>
            {candidate.filename}
          </div>
          <div style={{ fontSize: "12px", fontWeight: 500, color: "#94C8E8" }}>
            Score: <span style={{ color, fontWeight: 700 }}>{candidate.score?.toFixed(1)} / 100</span>
          </div>
        </div>
      </div>

      {/* AI Explanation */}
      <div style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "14px",
        padding: "24px 28px",
        marginBottom: "16px",
      }}>
        <div style={{ fontSize: "11px", fontWeight: 700, color: "#38BDF8", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "14px" }}>
          AI Explanation
        </div>
        <p style={{ fontSize: "14px", fontWeight: 500, color: "#FFFFFF", lineHeight: 1.7 }}>
          {candidate.explanation}
        </p>
      </div>

      {/* Resume Text */}
      <div style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "14px",
        padding: "24px 28px",
      }}>
        <div style={{ fontSize: "11px", fontWeight: 700, color: "#38BDF8", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "14px" }}>
          Resume Text
        </div>
        <pre style={{
          fontSize: "13px", fontWeight: 400, color: "#FFFFFF",
          lineHeight: 1.7, whiteSpace: "pre-wrap",
          fontFamily: "'Space Grotesk', sans-serif",
        }}>
          {candidate.resume_text}
        </pre>
      </div>
    </div>
  );
}