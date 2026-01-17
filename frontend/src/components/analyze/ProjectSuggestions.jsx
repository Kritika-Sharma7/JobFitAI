import { motion } from "framer-motion";
import { Lightbulb, ArrowRight, ExternalLink, Code2 } from "lucide-react";

function ProjectSuggestions({ projects }) {
  if (!projects || !projects.length) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Recommended Projects</h3>
          <p className="text-dark-400 text-sm">Build these to strengthen your application</p>
        </div>
      </div>

      <div className="space-y-4">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative p-6 rounded-xl bg-dark-800/50 border border-white/5 hover:border-accent-purple/30 transition-all"
          >
            {/* Project Number Badge */}
            <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center text-xs font-bold text-white">
              {idx + 1}
            </div>

            <div className="ml-4">
              {/* Project Title */}
              <div className="flex items-start justify-between gap-4">
                <h4 className="text-lg font-semibold text-white group-hover:text-accent-purple transition-colors">
                  {project.title}
                </h4>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-white/10">
                  <ExternalLink className="w-4 h-4 text-dark-400" />
                </button>
              </div>

              {/* Skills Tags */}
              {project.skillsProved?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.skillsProved.map((skill, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent-purple/10 text-accent-purple border border-accent-purple/20"
                    >
                      <Code2 className="w-3 h-3" />
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {/* JD Mapping - Why this project */}
              {project.jdMapping?.length > 0 && (
                <div className="mt-4 p-4 rounded-lg bg-dark-900/50 border border-white/5">
                  <p className="text-sm font-medium text-dark-200 mb-2 flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-accent-cyan" />
                    How this improves your job fit:
                  </p>
                  <ul className="space-y-2">
                    {project.jdMapping.map((reason, i) => (
                      <li key={i} className="text-sm text-dark-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan mt-2 flex-shrink-0" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Fallback - Why it matters */}
              {!project.jdMapping?.length && project.whyItMatters && (
                <div className="mt-4 p-4 rounded-lg bg-dark-900/50 border border-white/5">
                  <p className="text-sm text-dark-300">
                    <span className="font-medium text-white">Why recruiters care: </span>
                    {project.whyItMatters}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info Footer */}
      <div className="mt-6 pt-4 border-t border-white/5">
        <p className="text-xs text-dark-500 flex items-center gap-2">
          <Lightbulb className="w-4 h-4" />
          Projects are selected to directly address skills and responsibilities from the job description.
        </p>
      </div>
    </motion.div>
  );
}

export default ProjectSuggestions;
