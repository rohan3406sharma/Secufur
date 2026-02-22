import { useState } from "react";
import { createEvent } from "../services/api";

function Events() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
    if (!name || !description) return;

    await createEvent(name, description);
    setName("");
    setDescription("");
    alert("Event Created Successfully 🚀");
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "30px", marginBottom: "30px" }}>
        📅 Create New Event
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
          placeholder="Event Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <textarea
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...inputStyle, height: "100px", resize: "none" }}
        />

        <button onClick={handleCreate} style={buttonStyle}>
          + Create Event
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

export default Events;