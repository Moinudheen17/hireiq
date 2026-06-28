import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import CreateJob from "./pages/CreateJob";
import JobDetail from "./pages/JobDetail";
import Results from "./pages/Results";
import CandidateDetail from "./pages/CandidateDetail";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0D1117 0%, #0F1623 50%, #0D1117 100%)",
        backgroundAttachment: "fixed",
      }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateJob />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/jobs/:id/results" element={<Results />} />
          <Route path="/candidates/:id" element={<CandidateDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}