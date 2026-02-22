import { useState } from "react";
import { issueCertificate } from "../services/api";

function Certificates() {
  const [participantId, setParticipantId] = useState("");

  const handleIssue = async () => {
    if (!participantId) return;

    await issueCertificate(participantId);
    setParticipantId("");
    alert("Certificate Issued Successfully 🎓");
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      
      <h1 style={{ fontSize: "30px", marginBottom: "30px" }}>
        🎓 Issue Certificate
      </h1>

      <div
        style={{
          background: "#1e293b",
          padding: "30px",
          borderRadius: "14px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <input
          placeholder="Participant ID"
          value={participantId}
          onChange={(e) => setParticipantId(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleIssue} style={buttonStyle}>
          🎓 Issue Certificate
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  fontSize: "14px",
  background: "#0f172a",
  color: "white",
};

const buttonStyle = {
  background: "#2563eb",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

export default Certificates;