import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{
      background: "rgba(13,17,23,0.7)",
      backdropFilter: "blur(28px)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      padding: "18px 28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "36px", height: "36px",
          background: "linear-gradient(135deg, #38BDF8, #6366F1)",
          borderRadius: "10px",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 18px rgba(56,189,248,0.4), 0 0 40px rgba(99,102,241,0.2)",
          flexShrink: 0,
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="7" r="4" fill="white" opacity="0.95"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
            <circle cx="19" cy="9" r="2.5" fill="white" opacity="0.7"/>
            <path d="M22 16c0-2-1.3-3.5-3-4" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "19px", fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>
          Hire<span style={{ color: "#38BDF8" }}>IQ</span>
        </span>
      </Link>

      <Link to="/create" style={{
        background: "rgba(56,189,248,0.1)",
        color: "#38BDF8",
        border: "1px solid rgba(56,189,248,0.22)",
        padding: "9px 18px",
        borderRadius: "8px",
        fontSize: "13px",
        fontWeight: 600,
        textDecoration: "none",
        transition: "all 0.2s",
      }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(56,189,248,0.2)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(56,189,248,0.2)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "rgba(56,189,248,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
      >
        + New job
      </Link>
    </nav>
  );
}