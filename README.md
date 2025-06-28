A full-stack web application built with React (frontend) and FastAPI (backend) that allows users to:

Upload and edit resumes

Enhance sections using a mock AI backend

Save and retrieve resume data

Download the final resume as a .json file

🚀 Features

📤 Upload dummy .pdf or .docx resumes (mocked parsing)

🛠 Edit sections: Name, Summary, Experience, Education, Skills, etc.

✨ Enhance with AI: Mock improvements using a button

💾 Save resumes via FastAPI backend (in-memory or localStorage)

📥 Download the final resume as a .json file

🧩 Tech Stack

Frontend

React + TypeScript

Tailwind CSS + shadcn/ui components

Vite (for fast bundling and dev experience)

Backend

FastAPI (Python)

In-memory resume storage (mock only)



⚙️ Installation

1. Clone the Repo

git clone https://github.com/your-username/resume-editor.git
cd resume-editor

2. Backend Setup (FastAPI)

1. cd backend       
2. python -m venv venv        
3. pip install -r ../requirements.txt       
4. uvicorn main:app --reload

Server will start at: http://localhost:8000

3. Frontend Setup (React + Vite)

1. cd frontend           
2. npm install         
3. npm start        

Frontend runs at: http://localhost:5173

Make sure the backend is running at http://localhost:8000

💡 How to Use

Visit http://localhost:5173

Fill or edit resume fields

Click "Enhance with AI" next to any section

Save your resume (stored in memory/localStorage)

Download as .json
