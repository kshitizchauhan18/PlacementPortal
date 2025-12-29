import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import JobListPage from "./pages/JobListPage";
import ProtectedRoute from "./components/ProtectedRoute";
import UserApplicationsPage from "./pages/UserApplicationsPage";
import CompanyDashboard from "./pages/CompanyDashboard";
import PostNewJobPage from "./pages/PostNewJobPage";
import CompanyPostedJobsPage from "./pages/CompanyPostedJobsPage";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* You can keep these routes for direct access if needed */}
          <Route path="/login" element={<HomePage />} />
          <Route path="/register" element={<HomePage />} />
          <Route path="/my-applications" element={<UserApplicationsPage />} />

          {/* Student Dashboard - only for students */}
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <DashboardPage />
            </ProtectedRoute>
          } />

          {/* Company routes - only for companies */}
          <Route path="/company-dashboard" element={
            <ProtectedRoute allowedRoles={["COMPANY"]}>
              <CompanyDashboard />
            </ProtectedRoute>
          } />
          <Route path="/company/post-job" element={
            <ProtectedRoute allowedRoles={["COMPANY"]}>
              <PostNewJobPage />
            </ProtectedRoute>
          } />
          <Route path="/company/posted-jobs" element={
            <ProtectedRoute allowedRoles={["COMPANY"]}>
              <CompanyPostedJobsPage />
            </ProtectedRoute>
          } />

          {/* Jobs - any logged-in user */}
          <Route path="/jobs" element={
            <ProtectedRoute>
              <JobListPage />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
  );
}

export default App;
