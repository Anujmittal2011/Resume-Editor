import React, { useState } from 'react';

function Skills({ data, setData, enhance }) {
  const [input, setInput] = useState('');

  const addSkill = () => {
    if (input.trim()) {
      const safeArray = Array.isArray(data) ? data : [];
      setData([...safeArray, input.trim()]);
      setInput('');
    }
  };

  const removeSkill = (index) => {
    if (!Array.isArray(data)) return;
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white shadow p-4 rounded mt-4">
      <div className="flex justify-between">
        <h2 className="font-semibold text-lg">Skills</h2>
        <button onClick={enhance} className="bg-purple-500 text-white px-2 rounded">Enhance with AI</button>
      </div>
      <div className="flex gap-2 mt-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter a skill"
          className="input w-full border rounded p-2"
        />
        <button onClick={addSkill} className="bg-green-500 text-white px-3 rounded">Add</button>
      </div>
      <ul className="mt-2">
        {Array.isArray(data) &&
          data.map((skill, index) => (
            <li key={index} className="flex justify-between items-center border-b py-1">
              <span>{skill}</span>
              <button onClick={() => removeSkill(index)} className="text-red-500">Remove</button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Skills;
