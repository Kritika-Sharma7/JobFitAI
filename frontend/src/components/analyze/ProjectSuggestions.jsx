function ProjectSuggestions({ projects }) {
  if (!projects || !projects.length) return null;

  return (
    <div className="glass-heavy border border-white/10 rounded-3xl p-8">
      <h3 className="text-xl font-bold text-white mb-6">
        JD-Matched Projects
      </h3>

      <div className="space-y-6">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="border border-white/10 rounded-2xl p-6 bg-slate-900/40"
          >
            {/* 1️⃣ Project Title */}
            <h4 className="text-lg font-semibold text-violet-300">
              {project.title}
            </h4>

            {/* 2️⃣ Skills Proved */}
            {project.skillsProved?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {project.skillsProved.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-medium
                               bg-violet-500/15 text-violet-300
                               border border-violet-500/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {/* 3️⃣ WHY this project (JD Mapping) */}
            {project.jdMapping?.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">
                  Why this project improves your job fit:
                </p>
                <ul className="list-disc ml-5 text-sm text-gray-300 space-y-1">
                  {project.jdMapping.map((reason, i) => (
                    <li key={i}>{reason}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Fallback if no JD mapping */}
            {!project.jdMapping?.length && (
              <p className="mt-4 text-sm text-gray-500">
                This project aligns well with the job description.
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Phase 3 explainability hint */}
      <p className="text-xs text-gray-400 mt-6">
        These projects are selected to directly match responsibilities mentioned in the job description.
      </p>
    </div>
  );
}

export default ProjectSuggestions;
