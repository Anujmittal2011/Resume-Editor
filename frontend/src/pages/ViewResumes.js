import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

function ViewResumes() {
  const [resumes, setResumes] = useState({});
  const resumeRefs = useRef({});
  const [downloaded, setDownloaded] = useState({});

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await axios.get('http://localhost:8000/get-resumes');
      setResumes(res.data);
    } catch (err) {
      console.error('Failed to fetch resumes:', err);
    }
  };

  const handleDownload = (id) => {
    const element = resumeRefs.current[id];
    if (!element) return;

    html2pdf()
      .from(element)
      .set({
        margin: 0.5,
        filename: `${resumes[id].personalInfo.fullName || 'resume'}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      })
      .save()
      .then(() => setDownloaded((prev) => ({ ...prev, [id]: true })));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/delete-resume/${id}`);
      const newResumes = { ...resumes };
      delete newResumes[id];
      setResumes(newResumes);
      const newDownloaded = { ...downloaded };
      delete newDownloaded[id];
      setDownloaded(newDownloaded);
    } catch (error) {
      console.error('Failed to delete resume:', error);
      alert('Failed to delete resume');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8">
      <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-10 drop-shadow-md font-serif">📄 Saved Resumes</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(resumes).map(([id, resume]) => (
          <div
            key={id}
            className="bg-white shadow-xl rounded-2xl p-6 transition-transform transform hover:scale-105 border border-purple-300 relative"
          >
            <div ref={(el) => (resumeRefs.current[id] = el)} className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-blue-700 font-sans mb-2">{resume.personalInfo.fullName || 'No Name'}</h2>
                <p className="text-sm text-gray-500">📧 {resume.personalInfo.email || 'No Email'}</p>
                <p className="text-sm text-gray-500">📱 {resume.personalInfo.phone || 'N/A'}</p>
                <p className="text-sm text-gray-500 italic">📍 {resume.personalInfo.location || 'Unknown'}</p>
              </div>

              <div>
                <h3 className="font-semibold text-purple-700 mb-4">📄 Summary</h3>
                <p className="text-gray-700 text-sm whitespace-pre-wrap bg-gray-50 p-3 rounded-md shadow-inner">
                  {resume.summary || 'No summary provided.'}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-purple-700 mb-4">🛠 Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {(resume.skills || []).map((skill, index) => (
                    <span key={index} className="bg-purple-200 text-purple-900 text-xs px-4 py-2 rounded-full shadow-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-purple-700 mb-4">🎓 Education</h3>
                {(resume.education || []).map((edu, idx) => (
                  <div key={idx} className="text-sm text-gray-800 space-y-1">
                    <p className="font-medium">{edu.degree}</p>
                    <p className="text-gray-600 italic">{edu.institution} | {edu.year}</p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-semibold text-purple-700 mb-4">💼 Work Experience</h3>
                {(resume.work || []).map((work, idx) => (
                  <div key={idx} className="text-sm text-gray-800 space-y-1">
                    <p className="font-medium">{work.position} at {work.company}</p>
                    <p className="text-gray-600 italic">{work.duration}</p>
                    <p className="text-gray-700">{work.description}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-1 mt-4">
                <p className="text-sm text-blue-500">
                  🌐 <a href={resume.personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline">{resume.personalInfo.website}</a>
                </p>
                <p className="text-sm text-blue-500 mb-5">
                  🔗 <a href={resume.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => handleDownload(id)}
                className="text-sm bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 shadow-md"
              >
                Download PDF
              </button>
              <button
                onClick={() => handleDelete(id)}
                className="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 shadow-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewResumes;


