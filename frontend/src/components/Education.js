import React from 'react';

function Education({ data, setData, enhance }) {
  const addEducation = () => {
    setData([...data, { institution: '', degree: '', year: '' }]);
  };

  const updateField = (index, field, value) => {
    const updated = [...data];
    updated[index][field] = value;
    setData(updated);
  };

  return (
    <div className="bg-white shadow p-4 rounded mt-4">
      <div className="flex justify-between">
        <h2 className="font-semibold text-lg">Education</h2>
        <button onClick={enhance} className="bg-purple-500 text-white px-2 rounded">Enhance with AI</button>
      </div>
      {data.map((edu, idx) => (
        <div key={idx} className="border p-2 my-2 rounded">
          {Object.entries(edu).map(([field, value]) => (
            <input
              key={field}
              placeholder={field}
              value={value}
              onChange={e => updateField(idx, field, e.target.value)}
              className="input my-1 block w-full border rounded p-2"
            />
          ))}
        </div>
      ))}
      <button onClick={addEducation} className="mt-2 px-4 py-1 bg-green-500 text-white rounded">Add Education</button>
    </div>
  );
}

export default Education;