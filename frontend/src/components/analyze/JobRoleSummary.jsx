function JobRoleSummary({ role }) {
  if (!role) return null;

  const { title, level, techStack = [] } = role;

  return (
    <div className="glass-heavy border border-white/10 rounded-3xl p-8">
      <h3 className="text-xl font-bold text-white mb-6">
        Job Role Summary
      </h3>

      <div className="space-y-6">
        {/* Role Title */}
        <div>
          <p className="text-sm text-gray-400 mb-1">Detected Role</p>
          <p className="text-2xl font-semibold text-white">
            {title}
          </p>
        </div>

        {/* Experience Level */}
        <div>
          <p className="text-sm text-gray-400 mb-2">Experience Level</p>
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold
            bg-violet-500/10 text-violet-300 border border-violet-500/30">
            {level}
          </span>
        </div>

        {/* Tech Stack */}
        <div>
          <p className="text-sm text-gray-400 mb-3">Primary Tech Stack</p>

          <div className="flex flex-wrap gap-2">
            {techStack.length > 0 ? (
              techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-xl text-sm font-medium
                    bg-slate-900/70 text-gray-200 border border-white/10
                    hover:border-violet-400/40 transition"
                >
                  {tech}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-500">
                No tech stack detected
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobRoleSummary;
