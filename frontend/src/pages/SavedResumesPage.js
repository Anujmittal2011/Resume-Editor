import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { PersonalInfo, Summary, WorkExperience, Education, Skills } from './components';
import SavedResumes from './SavedResumes';
import { saveAs } from 'file-saver';
import axios from 'axios';

function EditorPage({ resume, setResume, handleEnhance }) {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center">AI-Powered Resume Editor</h1>
      <div className="text-center my-4">
        <Link to="/saved" className="text-blue-600 underline">View Saved Resumes</Link>
      </div>

      <PersonalInfo
        data={resume.personalInfo}
        setData={(data) => setResume({ ...resume, personalInfo: data })}
        enhance={() => handleEnhance('personalInfo', resume.personalInfo)}
      />
      <Summary
        data={resume.summary}
        setData={(summary) => setResume({ ...resume, summary })}
        enhance={() => handleEnhance('summary', resume.summary)}
      />
      <WorkExperience
        data={resume.work}
        setData={(work) => setResume({ ...resume, work })}
      />
      <Education
        data={resume.education}
        setData={(education) => setResume({ ...resume, education })}
        enhance={() => handleEnhance('education', resume.education)}
      />
      <Skills
        data={resume.skills}
        setData={(skills) => setResume({ ...resume, skills })}
        enhance={() => handleEnhance('skills', resume.skills)}
      />
    </div>
  );
}

function App() {
  const [resume, setResume] = useState({
    personalInfo: {
      fullName: '', email: '', phone: '', location: '', linkedin: '', website: ''
    },
    summary: '',
    work: [],
    education: [],
    skills: []
  });

  const handleEnhance = async (section, content) => {
    try {
      const response = await axios.post('http://localhost:8000/ai-enhance', { section, content });
      const cleaned = response.data.content.replace(/^✨.*?✨:\s*/, '');
      const newData = { ...resume };

      if (section === 'skills') {
        newData.skills = cleaned.split(',').map(skill => skill.trim()).filter(Boolean);
      } else if (section === 'summary') {
        newData.summary = cleaned;
      } else if (section === 'personalInfo') {
        newData.personalInfo = JSON.parse(cleaned);
      } else if (section === 'education') {
        newData.education = response.data.content;
      }

      setResume(newData);
    } catch (error) {
      console.error("AI enhancement failed:", error.message);
      alert("AI enhancement failed. Check backend and content format.");
    }
  };

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:8000/save-resume', resume);
      alert('Resume saved successfully!');
    } catch (error) {
      console.error("Save failed:", error.message);
      alert("Failed to save resume.");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(resume, null, 2)], { type: 'application/json' });
    saveAs(blob, 'resume.json');
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <EditorPage resume={resume} setResume={setResume} handleEnhance={handleEnhance} />
              <div className="text-center">
                <button onClick={handleSave} className="m-2 px-4 py-2 bg-blue-500 text-white rounded">Save Resume</button>
                <button onClick={handleDownload} className="m-2 px-4 py-2 bg-gray-500 text-white rounded">Download JSON</button>
              </div>
            </>
          }
        />
        <Route path="/saved" element={<SavedResumes />} />
      </Routes>
    </Router>
  );
}

export default App;
