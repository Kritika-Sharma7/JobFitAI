function ProjectSuggestions({ projects }) {
  if (!projects || !projects.length) return null;

  return (
    <div className="glass-heavy border border-white/10 rounded-3xl p-8">
      <h3 className="text-xl font-bold text-white mb-2">
        JD-Matched Project Ideas
      </h3>
      <p className="text-sm text-gray-400 mb-6">
        Build these projects to directly align your profile with this job
      </p>

      <div className="space-y-5">
        {projects.map((project, index) => (
          <div
            key={index}
            className="relative p-6 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-violet-500/40 transition"
          >
            {/* Index badge */}
            <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white text-sm font-bold shadow-lg">
              {index + 1}
            </div>

            <h4 className="text-lg font-semibold text-white mb-2">
              {project.title}
            </h4>

            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              {project.explanation}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.techStack?.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectSuggestions;
