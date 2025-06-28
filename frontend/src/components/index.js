
export { default as PersonalInfo } from './PersonalInfo';
export { default as Summary } from './Summary';
export { default as WorkExperience } from './WorkExperience';
export { default as Education } from './Education';
export { default as Skills } from './Skills';


function PersonalInfo({ data, setData, enhance }) {
  return (
    <div className="bg-white shadow p-4 rounded mt-4">
      <div className="flex justify-between">
        <h2 className="font-semibold text-lg">Personal Information</h2>
        <button onClick={enhance} className="bg-purple-500 text-white px-2 rounded">Enhance with AI</button>
      </div>
      <input placeholder="Full Name" value={data.fullName} onChange={e => setData({ ...data, fullName: e.target.value })} className="input" />
      <input placeholder="Email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} className="input" />
      <input placeholder="Phone" value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })} className="input" />
      <input placeholder="Location" value={data.location} onChange={e => setData({ ...data, location: e.target.value })} className="input" />
      <input placeholder="LinkedIn" value={data.linkedin} onChange={e => setData({ ...data, linkedin: e.target.value })} className="input" />
      <input placeholder="Website" value={data.website} onChange={e => setData({ ...data, website: e.target.value })} className="input" />
    </div>
  );
}

export default PersonalInfo;