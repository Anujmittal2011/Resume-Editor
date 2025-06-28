function WorkExperience({ data, setData }) {
  const addExperience = () => {
    setData([...data, { company: '', role: '', duration: '', description: '' }]);
  };

  const updateField = (index, field, value) => {
    const updated = [...data];
    updated[index][field] = value;
    setData(updated);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, idx) => idx !== index);
    setData(updated);
  };

  return (
    <div className="bg-white shadow p-4 rounded mt-4">
      <h2 className="font-semibold text-lg mb-2">Work Experience</h2>
      {data.map((exp, idx) => (
        <div key={idx} className="border p-2 my-2 rounded relative">
          {/* ❌ Remove Icon */}
          <button
            onClick={() => removeExperience(idx)}
            className="absolute top-2 right-2 text-red-600 text-xl leading-none hover:text-red-800"
            aria-label="Remove"
            title="Remove"
          >
            &times;
          </button>

          {/* Input Fields */}
          {Object.entries(exp).map(([field, value]) => (
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
      <button onClick={addExperience} className="mt-2 px-4 py-1 bg-green-500 text-white rounded">
        Add Experience
      </button>
    </div>
  );
}

export default WorkExperience;
