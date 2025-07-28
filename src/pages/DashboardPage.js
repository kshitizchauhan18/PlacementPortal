import { Link } from "react-router-dom";

function DashboardPage() {
  return (
    <div style={{ maxWidth: 600, margin: "50px auto" }}>
      <h2>Welcome to the Placement Portal Dashboard!</h2>
      <p>You are now logged in.</p>
      <Link to="/jobs">
        <button style={{ marginTop: 20, padding: 10 }}>View Jobs</button>
      </Link>
      <Link to="/my-applications">My Applications</Link>

    </div>
  );
}
export default DashboardPage;
