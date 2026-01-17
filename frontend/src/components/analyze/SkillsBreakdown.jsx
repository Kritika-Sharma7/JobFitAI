import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Sparkles, Info } from "lucide-react";

function SkillsBreakdown({ skills }) {
  if (!skills || !skills.length) return null;

  // Group skills by category
  const grouped = {
    missing: skills.filter(s => s.category === "missing"),
    must_have: skills.filter(s => s.category === "must_have"),
    good_to_have: skills.filter(s => s.category === "good_to_have")
  };

  const categories = [
    {
      key: "missing",
      label: "Missing Skills",
      description: "High priority - focus on these first",
      icon: AlertCircle,
      iconColor: "text-red-400",
      chipClass: "bg-red-500/10 text-red-300 border-red-500/30 hover:bg-red-500/20",
      dotColor: "bg-red-400"
    },
    {
      key: "must_have",
      label: "Matched Skills",
      description: "You've got these covered",
      icon: CheckCircle,
      iconColor: "text-emerald-400",
      chipClass: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20",
      dotColor: "bg-emerald-400"
    },
    {
      key: "good_to_have",
      label: "Nice to Have",
      description: "Bonus skills for this role",
      icon: Sparkles,
      iconColor: "text-accent-purple",
      chipClass: "bg-accent-purple/10 text-purple-300 border-accent-purple/30 hover:bg-accent-purple/20",
      dotColor: "bg-accent-purple"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Skills Analysis</h3>
          <p className="text-dark-400 text-sm">How your skills match the job requirements</p>
        </div>
      </div>

      <div className="space-y-6">
        {categories.map((cat, catIdx) => {
          const items = grouped[cat.key];
          if (!items || items.length === 0) return null;
          
          const Icon = cat.icon;

          return (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIdx * 0.1 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-2 mb-3">
                <Icon className={`w-5 h-5 ${cat.iconColor}`} />
                <span className="font-medium text-white">{cat.label}</span>
                <span className="text-dark-500 text-sm">({items.length})</span>
                <span className="text-dark-500 text-xs">• {cat.description}</span>
              </div>

              {/* Skill Pills */}
              <div className="flex flex-wrap gap-2">
                {items.map((skill, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: catIdx * 0.1 + idx * 0.05 }}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-colors cursor-default ${cat.chipClass}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${cat.dotColor}`} />
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Info Note */}
      {grouped.missing && grouped.missing.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 pt-6 border-t border-white/10"
        >
          <div className="flex items-start gap-3 p-4 rounded-xl bg-accent-purple/5 border border-accent-purple/20">
            <Info className="w-5 h-5 text-accent-purple flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-dark-200">
                <span className="font-medium text-white">Pro tip:</span> Missing skills have the highest impact on your job fit score. 
                Consider adding relevant projects or certifications to bridge these gaps.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default SkillsBreakdown;
