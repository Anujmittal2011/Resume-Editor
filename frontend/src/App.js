import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ResumeEditorPage from './pages/ResumeEditorPage';
import ViewResumes from './pages/ViewResumes';

function App() {
  return (
    <Router>
      <div className="p-4 max-w-4xl mx-auto">
        <nav className="flex justify-between mb-4">
          <Link to="/" className="text-blue-600 font-bold">Editor</Link>
          <Link to="/resumes" className="text-blue-600 font-bold">View Resumes</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ResumeEditorPage />} />
          <Route path="/resumes" element={<ViewResumes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
