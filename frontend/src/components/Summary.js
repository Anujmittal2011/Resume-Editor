import React from 'react';

function Summary({ data, setData, enhance }) {
  return (
    <div className="bg-white shadow p-4 rounded mt-4">
      <div className="flex justify-between">
        <h2 className="font-semibold text-lg">Professional Summary</h2>
        <button onClick={enhance} className="bg-purple-500 text-white px-2 rounded">Enhance with AI</button>
      </div>
      <textarea
        value={data}
        onChange={e => setData(e.target.value)}
        className="input w-full h-24 p-2 border rounded mt-2"
        placeholder="Write a compelling summary..."
      ></textarea>
    </div>
  );
}

export default Summary;