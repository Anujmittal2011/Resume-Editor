import React from 'react';

function PersonalInfo({ data, setData, enhance }) {
  return (
    <div className="bg-white shadow p-4 rounded mt-4">
      <div className="flex justify-between">
        <h2 className="font-semibold text-lg">Personal Information</h2>
        <button onClick={enhance} className="bg-purple-500 text-white px-2 rounded">Enhance with AI</button>
      </div>
      {Object.entries(data).map(([key, value]) => (
        <input
          key={key}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          value={value}
          onChange={e => setData({ ...data, [key]: e.target.value })}
          className="input my-1 block w-full border rounded p-2"
        />
      ))}
    </div>
  );
}

export default PersonalInfo;