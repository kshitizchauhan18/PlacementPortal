import { Link, useNavigate } from "react-router-dom";

function DashboardPage() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{
      maxWidth: 700,
      margin: "50px auto",
      padding: "45px 35px",
      borderRadius: "20px",
      boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
      background: "linear-gradient(120deg, #fdfbfb 0%, #f5f8ff 100%)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      position: "relative"
    }}>
      <div style={{
        textAlign: "center",
        marginBottom: "40px"
      }}>
        <h2 style={{
          background: "linear-gradient(120deg, #2c3e50 0%, #3498db 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "2.8em",
          fontWeight: "800",
          marginBottom: "20px",
          letterSpacing: "-0.5px"
        }}>
          Welcome to Your Dashboard
        </h2>
        <div style={{
          display: "inline-block",
          padding: "12px 25px",
          background: "linear-gradient(120deg, rgba(44, 62, 80, 0.1) 0%, rgba(52, 152, 219, 0.1) 100%)",
          borderRadius: "30px",
          color: "#2c3e50",
          fontSize: "1.1em",
          fontWeight: "500",
          marginBottom: "40px"
        }}>
          Ready to explore opportunities 🚀
        </div>
        <button
          onClick={handleLogout}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(120deg, #e74c3c 0%, #c0392b 100%)",
            color: "white",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(231, 76, 60, 0.2)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
        >
          Logout
        </button>
      </div>

      <div style={{
        display: "grid",
        gap: "25px",
        padding: "0 15px"
      }}>
        <Link to="/jobs" style={{ textDecoration: "none" }}>
          <button style={{
            width: "100%",
            padding: "20px",
            fontSize: "17px",
            border: "none",
            borderRadius: "15px",
            cursor: "pointer",
            background: "linear-gradient(120deg, #3498db 0%, #2c3e50 100%)",
            color: "white",
            transition: "all 0.3s ease",
            boxShadow: "0 8px 20px rgba(52, 152, 219, 0.3)",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px"
          }}>
            <span style={{ fontSize: "24px" }}>🔍</span>
            Browse Available Jobs
          </button>
        </Link>

        <Link to="/my-applications" style={{ textDecoration: "none" }}>
          <button style={{
            width: "100%",
            padding: "20px",
            fontSize: "17px",
            border: "none",
            borderRadius: "15px",
            cursor: "pointer",
            background: "linear-gradient(120deg, #2c3e50 0%, #3498db 100%)",
            color: "white",
            transition: "all 0.3s ease",
            boxShadow: "0 8px 20px rgba(44, 62, 80, 0.3)",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px"
          }}>
            <span style={{ fontSize: "24px" }}>📋</span>
            View My Applications
          </button>
        </Link>
      </div>
    </div>
  );
}

export default DashboardPage;
