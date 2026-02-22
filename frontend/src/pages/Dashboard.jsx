import { useEffect, useState } from "react";
import { getEvents } from "../services/api";

function Dashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const data = await getEvents();
    setEvents(data);
  };

  return (
    <div>
      <h1 style={{ color: "#fff", marginBottom: "25px" }}>
        Dashboard Overview
      </h1>

      {/* Analytics Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
        gap: "20px",
        marginBottom: "40px"
      }}>
        <Card title="Total Events" value={events.length} />
        <Card title="Active Users" value="--" />
        <Card title="Certificates Issued" value="--" />
      </div>

      {/* Event List */}
      <h2 style={{ color: "#cbd5e1", marginBottom: "20px" }}>
        Recent Events
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))",
        gap: "20px"
      }}>
        {events.map((event) => (
          <div key={event.id} style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "12px",
            transition: "0.3s",
            border: "1px solid #334155"
          }}>
            <h3 style={{ color: "#fff" }}>{event.name}</h3>
            <p style={{ color: "#94a3b8" }}>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={{
      background: "#1e293b",
      padding: "25px",
      borderRadius: "12px",
      border: "1px solid #334155"
    }}>
      <p style={{ color: "#94a3b8" }}>{title}</p>
      <h2 style={{ color: "#fff", fontSize: "28px" }}>{value}</h2>
    </div>
  );
}

export default Dashboard;