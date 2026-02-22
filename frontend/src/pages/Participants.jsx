import { useState } from "react";
import { addParticipant } from "../services/api";

function Participants() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [eventId, setEventId] = useState("");

  const handleAdd = async () => {
    if (!name || !email || !eventId) return;

    await addParticipant(name, email, eventId);
    setName("");
    setEmail("");
    setEventId("");
    alert("Participant Added Successfully 👥");
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      
      <h1 style={{ fontSize: "30px", marginBottom: "30px" }}>
        👥 Add New Participant
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
          placeholder="Participant Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Event ID"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleAdd} style={buttonStyle}>
          + Add Participant
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

export default Participants;