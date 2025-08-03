import React, { useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

function HomePage() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="home-container" style={{
      maxWidth: 500,
      margin: "50px auto",
      padding: "40px 20px",
      borderRadius: "15px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
      border: "1px solid rgba(255, 255, 255, 0.18)"
    }}>
      <h1 style={{
        textAlign: "center",
        background: "linear-gradient(45deg, #1a5f7a 0%, #159957 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: "30px",
        fontSize: "2.7em",
        fontWeight: "700",
        textShadow: "2px 2px 4px rgba(0,0,0,0.1)"
      }}>
        Welcome to Placement Portal
      </h1>
      <div style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "30px",
        gap: "20px"
      }}>
        <button
          onClick={() => setShowLogin(true)}
          style={{
            padding: "12px 30px",
            fontSize: "16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            background: showLogin 
              ? "linear-gradient(45deg, #2193b0 0%, #6dd5ed 100%)" 
              : "#f0f2f5",
            color: showLogin ? "white" : "#555",
            transition: "all 0.3s ease",
            boxShadow: showLogin 
              ? "0 4px 15px rgba(33, 147, 176, 0.3)" 
              : "none",
            fontWeight: "600"
          }}
        >
          Login
        </button>
        <button
          onClick={() => setShowLogin(false)}
          style={{
            padding: "12px 30px",
            fontSize: "16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            background: !showLogin 
              ? "linear-gradient(45deg, #159957 0%, #155799 100%)" 
              : "#f0f2f5",
            color: !showLogin ? "white" : "#555",
            transition: "all 0.3s ease",
            boxShadow: !showLogin 
              ? "0 4px 15px rgba(21, 153, 87, 0.3)" 
              : "none",
            fontWeight: "600"
          }}
        >
          Register
        </button>
      </div>
      {showLogin ? <LoginPage /> : <RegisterPage />}
    </div>
  );
}

export default HomePage;
