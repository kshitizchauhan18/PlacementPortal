import React, { useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

function HomePage() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div style={{ maxWidth: 500, margin: "50px auto", padding: 20 }}>
      <h1>Placement Portal Home</h1>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
        <button onClick={() => setShowLogin(true)} style={{ marginRight: 10 }}>
          Login
        </button>
        <button onClick={() => setShowLogin(false)}>
          Register
        </button>
      </div>
      {showLogin ? <LoginPage /> : <RegisterPage />}
    </div>
  );
}

export default HomePage;
