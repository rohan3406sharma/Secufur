import { useState } from "react";

function Verify() {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!token) return;

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/certificates/verify/${token}`
      );

      if (!response.ok) {
        throw new Error("Invalid");
      }

      const data = await response.json();
      setMessage({ type: "success", text: "Certificate is Valid 🎉" });

    } catch (error) {
      setMessage({ type: "error", text: "Invalid Certificate ❌" });
    }

    setLoading(false);
    setToken("");
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      
      <h1 style={{ fontSize: "30px", marginBottom: "30px", color: "white" }}>
        Verify Certificate
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
          placeholder="Enter Verification Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            fontSize: "14px",
            background: "#0f172a",
            color: "white",
          }}
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          style={{
            background: "#2563eb",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        {message && (
          <div
            style={{
              padding: "12px",
              borderRadius: "8px",
              background:
                message.type === "success" ? "#16a34a" : "#dc2626",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}

export default Verify;