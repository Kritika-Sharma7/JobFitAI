import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, Code, Clock, CheckCircle, Building2 } from "lucide-react";

const EXPERIENCE_LEVELS = [
  { value: "fresher", label: "Fresher", description: "New to the workforce" },
  { value: "0-2", label: "0–2 years", description: "Early career professional" },
  { value: "2-5", label: "2–5 years", description: "Mid-level professional" },
  { value: "5+", label: "5+ years", description: "Senior professional" }
];

export default function ProfileSetup({ value, onProfileChange }) {
  const [profile, setProfile] = useState({
    experience: "",
    role: "",
    company: "",
    techStack: ""
  });
  const [focused, setFocused] = useState(null);

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

  const isComplete = profile.experience && profile.role && profile.company;

  return (
    <div className="space-y-6">
      {/* Experience Level */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-accent-purple" />
          <label className="text-sm font-medium text-white">
            Experience Level <span className="text-red-400">*</span>
          </label>
        </div>
        <p className="text-xs text-dark-400 ml-7">
          Affects scoring thresholds, feedback depth, and role expectations
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 ml-7">
          {EXPERIENCE_LEVELS.map((level) => (
            <button
              key={level.value}
              type="button"
              onClick={() => {
                const updatedProfile = { ...profile, experience: level.value };
                setProfile(updatedProfile);
                onProfileChange?.(updatedProfile);
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                profile.experience === level.value
                  ? "border-accent-purple bg-accent-purple/10 ring-1 ring-accent-purple"
                  : "border-white/10 bg-dark-800/50 hover:bg-dark-800 hover:border-white/20"
              }`}
            >
              <p className={`font-medium text-sm ${
                profile.experience === level.value ? "text-accent-purple" : "text-white"
              }`}>
                {level.label}
              </p>
              <p className="text-xs text-dark-400 mt-1">{level.description}</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Target Role */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-accent-cyan" />
          <label className="text-sm font-medium text-white">
            Target Role <span className="text-red-400">*</span>
          </label>
        </div>
        <p className="text-xs text-dark-400 ml-7">
          Used to align required skills, responsibilities, and match accuracy
        </p>
        
        <div className="ml-7 relative">
          <input
            type="text"
            name="role"
            value={profile.role}
            onChange={handleChange}
            onFocus={() => setFocused('role')}
            onBlur={() => setFocused(null)}
            placeholder="e.g. Frontend Developer, Data Scientist"
            className="glass-input"
          />
          {profile.role && (
            <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-cyan" />
          )}
        </div>
      </motion.div>

      {/* Target Company */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-amber-400" />
          <label className="text-sm font-medium text-white">
            Company Name <span className="text-red-400">*</span>
          </label>
        </div>
        <p className="text-xs text-dark-400 ml-7">
          The company you're applying to — helps personalize feedback and track applications
        </p>
        
        <div className="ml-7 relative">
          <input
            type="text"
            name="company"
            value={profile.company}
            onChange={handleChange}
            onFocus={() => setFocused('company')}
            onBlur={() => setFocused(null)}
            placeholder="e.g. Google, Microsoft, Startup XYZ"
            className="glass-input"
          />
          {profile.company && (
            <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
          )}
        </div>
      </motion.div>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-pink-400" />
          <label className="text-sm font-medium text-white">
            Preferred Tech Stack
            <span className="text-dark-500 font-normal ml-2">(Optional)</span>
          </label>
        </div>
        <p className="text-xs text-dark-400 ml-7">
          Helps prioritize missing skills and personalize your roadmap
        </p>
        
        <div className="ml-7">
          <input
            type="text"
            name="techStack"
            value={profile.techStack}
            onChange={handleChange}
            onFocus={() => setFocused('techStack')}
            onBlur={() => setFocused(null)}
            placeholder="React, TypeScript, Node.js, AWS"
            className="glass-input"
          />
          {profile.techStack && (
            <div className="mt-3 flex flex-wrap gap-2">
              {profile.techStack.split(',').map((tech, idx) => tech.trim() && (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-pink-500/10 text-pink-300 border border-pink-500/20"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Completion Status */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm"
        >
          <CheckCircle className="w-5 h-5" />
          Profile complete — ready to analyze
        </motion.div>
      )}
    </div>
  );
}
