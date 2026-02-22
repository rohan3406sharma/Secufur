import { NavLink, Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const linkStyle = ({ isActive }) => ({
    padding: "12px 16px",
    borderRadius: "10px",
    textDecoration: "none",
    color: isActive ? "#fff" : "#94a3b8",
    background: isActive ? "linear-gradient(90deg,#6366f1,#8b5cf6)" : "transparent",
    transition: "0.3s",
    fontWeight: "500"
  });

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0f172a" }}>
      
      {/* Sidebar */}
      <div
        style={{
          width: "240px",
          background: "#111827",
          padding: "25px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          borderRight: "1px solid #1f2937"
        }}
      >
        <h2 style={{ color: "#fff", marginBottom: "20px" }}>
          Event System
        </h2>

        <NavLink to="/dashboard" style={linkStyle}>Dashboard</NavLink>
        <NavLink to="/events" style={linkStyle}>Events</NavLink>
        <NavLink to="/participants" style={linkStyle}>Participants</NavLink>
        <NavLink to="/certificates" style={linkStyle}>Certificates</NavLink>
        <NavLink to="/verify" style={linkStyle}>Verify</NavLink>

        <button
          onClick={handleLogout}
          style={{
            marginTop: "auto",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            background: "#ef4444",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Section */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        {/* Topbar */}
        <div
          style={{
            height: "60px",
            background: "#1e293b",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 25px",
            borderBottom: "1px solid #334155"
          }}
        >
          <span style={{ color: "#cbd5e1" }}>Admin Control Panel</span>
          <div style={{ color: "#94a3b8" }}>Welcome Admin</div>
        </div>

        {/* Page Content */}
        <div style={{ padding: "30px", overflowY: "auto" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;