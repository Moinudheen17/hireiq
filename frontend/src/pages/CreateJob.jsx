import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/client";

export default function CreateJob() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title || !description) return alert("Please fill in all fields");
    setLoading(true);
    try {
      const res = await API.post("/jobs", { title, description });
      navigate(`/jobs/${res.data.id}`);
    } catch (err) {
      alert("Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    padding: "12px 16px",
    fontSize: "14px",
    fontWeight: 500,
    color: "#FFFFFF",
    fontFamily: "'Space Grotesk', sans-serif",
    outline: "none",
    transition: "all 0.2s",
  };

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "36px 28px", position: "relative" }}>

      <div style={{ position: "fixed", width: "380px", height: "380px", background: "radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 65%)", top: "-140px", left: "-100px", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "fixed", width: "280px", height: "280px", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 65%)", bottom: "-60px", right: "-80px", borderRadius: "50%", pointerEvents: "none" }} />

      <div style={{ fontSize: "10px", fontWeight: 700, color: "#38BDF8", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "8px" }}>New Opening</div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "30px", fontWeight: 900, color: "#fff", letterSpacing: "-0.8px", marginBottom: "4px" }}>
        Create a <em style={{ fontStyle: "italic", color: "#38BDF8" }}>Job.</em>
      </div>
      <div style={{ fontSize: "12px", fontWeight: 500, color: "#94C8E8", marginBottom: "36px" }}>
        Fill in the details — our AI will use this to screen candidates.
      </div>

      <div style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "14px",
        padding: "32px",
      }}>
        <div style={{ marginBottom: "24px" }}>
          <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#38BDF8", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "10px" }}>
            Job Title
          </label>
          <input
            type="text"
            placeholder="e.g. Python Backend Developer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
            onFocus={e => { e.target.style.borderColor = "rgba(56,189,248,0.4)"; e.target.style.boxShadow = "0 0 20px rgba(56,189,248,0.08)"; }}
            onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
          />
        </div>

        <div style={{ marginBottom: "32px" }}>
          <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#38BDF8", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "10px" }}>
            Job Description
          </label>
          <textarea
            rows={7}
            placeholder="Describe the role, required skills, experience level..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
            onFocus={e => { e.target.style.borderColor = "rgba(56,189,248,0.4)"; e.target.style.boxShadow = "0 0 20px rgba(56,189,248,0.08)"; }}
            onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            background: loading ? "rgba(56,189,248,0.08)" : "rgba(56,189,248,0.14)",
            color: "#38BDF8",
            border: "1px solid rgba(56,189,248,0.28)",
            padding: "14px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 700,
            fontFamily: "'Space Grotesk', sans-serif",
            cursor: loading ? "not-allowed" : "pointer",
            letterSpacing: "0.3px",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.boxShadow = "0 0 24px rgba(56,189,248,0.2)"; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; }}
        >
          {loading ? "Creating..." : "Create Job →"}
        </button>
      </div>
    </div>
  );
}