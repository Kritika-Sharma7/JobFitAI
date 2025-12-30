import { useState, useEffect } from "react";

export default function ProfileSetup({ value, onProfileChange }) {
  const [profile, setProfile] = useState({
    experience: "",
    role: "",
    techStack: ""
  });

  /* 🔁 IMPORTANT: Sync Zustand → UI */
  useEffect(() => {
    if (value) {
      setProfile(value);
    }
  }, [value]);

  const handleChange = (e) => {
    const { name, value: fieldValue } = e.target;

    const updatedProfile = {
      ...profile,
      [name]: fieldValue
    };

    setProfile(updatedProfile);
    onProfileChange?.(updatedProfile);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-6">

      {/* Experience Level */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-300">
          Experience Level
        </label>
        <p className="text-xs text-slate-500">
          Affects scoring thresholds, feedback depth, and role expectations
        </p>
        <select
          name="experience"
          value={profile.experience}
          onChange={handleChange}
          className="w-full rounded-md bg-slate-950 border border-slate-800
                     px-3 py-2 text-sm text-slate-200
                     focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="">Select experience</option>
          <option value="fresher">Fresher</option>
          <option value="0-2">0–2 years</option>
          <option value="2-5">2–5 years</option>
          <option value="5+">5+ years</option>
        </select>
      </div>

      {/* Target Role */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-300">
          Target Role
        </label>
        <p className="text-xs text-slate-500">
          Used to align required skills, responsibilities, and match accuracy
        </p>
        <input
          type="text"
          name="role"
          value={profile.role}
          onChange={handleChange}
          placeholder="e.g. Frontend Developer"
          className="w-full rounded-md bg-slate-950 border border-slate-800
                     px-3 py-2 text-sm text-slate-200
                     placeholder:text-slate-600
                     focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {/* Tech Stack */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-300">
          Preferred Tech Stack
        </label>
        <p className="text-xs text-slate-500">
          Helps prioritize missing skills and personalize your roadmap
        </p>
        <input
          type="text"
          name="techStack"
          value={profile.techStack}
          onChange={handleChange}
          placeholder="React, JavaScript, Redux, HTML, CSS"
          className="w-full rounded-md bg-slate-950 border border-slate-800
                     px-3 py-2 text-sm text-slate-200
                     placeholder:text-slate-600
                     focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

    </div>
  );
}
