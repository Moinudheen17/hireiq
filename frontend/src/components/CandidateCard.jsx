import { useNavigate } from "react-router-dom";

export default function CandidateCard({ candidate, rank }) {
  const navigate = useNavigate();

  const getRingColor = (score) => {
    if (score >= 70) return "#4ADE80";
    if (score >= 40) return "#FBB040";
    return "#F87171";
  };

  const getStrokeDashoffset = (score) => {
    const circumference = 138.2;
    return circumference - (score / 100) * circumference;
  };

  const color = getRingColor(candidate.score);

  return (
    <div
      onClick={() => navigate(`/candidates/${candidate.id}`)}
      style={{
        background: "rgba(255,255,255,0.025)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "12px",
        padding: "18px 20px",
        marginBottom: "8px",
        display: "flex",
        alignItems: "center",
        gap: "18px",
        cursor: "pointer",
        transition: "all 0.25s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = "rgba(56,189,248,0.04)";
        e.currentTarget.style.borderColor = "rgba(56,189,248,0.25)";
        e.currentTarget.style.boxShadow = "0 0 32px rgba(56,189,248,0.08), inset 0 0 24px rgba(56,189,248,0.03)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "rgba(255,255,255,0.025)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Score Ring */}
      <div style={{ position: "relative", width: "56px", height: "56px", flexShrink: 0 }}>
        <svg width="56" height="56" viewBox="0 0 56 56" style={{ transform: "rotate(-90deg)" }}>
          <defs>
            <filter id={`glow-${candidate.id}`}>
              <feGaussianBlur stdDeviation="2.5" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4"/>
          <circle
            cx="28" cy="28" r="22" fill="none"
            stroke={color} strokeWidth="4"
            strokeDasharray="138.2"
            strokeDashoffset={getStrokeDashoffset(candidate.score)}
            strokeLinecap="round"
            filter={`url(#glow-${candidate.id})`}
          />
        </svg>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "'Playfair Display', serif",
          fontSize: "15px", fontWeight: 900, color: "#fff",
        }}>
          {candidate.score?.toFixed(0)}
        </div>
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "15px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {candidate.filename}
        </div>
        <div style={{ fontSize: "12px", fontWeight: 500, color: "#94C8E8", marginTop: "5px", lineHeight: 1.55 }}>
          {candidate.explanation?.slice(0, 120)}...
        </div>
      </div>

      {/* Rank */}
      {rank && (
        <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "14px", fontWeight: 700, color: "#38BDF8", opacity: 0.6, flexShrink: 0 }}>
          #{rank}
        </div>
      )}
    </div>
  );
}