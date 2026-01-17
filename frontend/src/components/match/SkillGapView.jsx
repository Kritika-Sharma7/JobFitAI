import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, Zap, Target } from "lucide-react";

export default function SkillGapView({
  matched = [],
  partial = [],
  missing = [],
  details = []
}) {
  const detailsMap = details.reduce((acc, d) => {
    acc[d.skill] = d;
    return acc;
  }, {});

  const totalSkills = matched.length + partial.length + missing.length;
  const matchPercentage = totalSkills > 0 
    ? Math.round(((matched.length + partial.length * 0.5) / totalSkills) * 100)
    : 0;

  const categories = [
    {
      key: "matched",
      title: "Matched Skills",
      description: "Skills that directly match requirements",
      skills: matched,
      icon: CheckCircle,
      iconColor: "text-emerald-400",
      chipClass: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/20",
      dotColor: "bg-emerald-400"
    },
    {
      key: "partial",
      title: "Partial Match",
      description: "Related skills that may transfer",
      skills: partial,
      icon: Zap,
      iconColor: "text-amber-400",
      chipClass: "bg-amber-500/10 text-amber-300 border-amber-500/20 hover:bg-amber-500/20",
      dotColor: "bg-amber-400"
    },
    {
      key: "missing",
      title: "Skills to Develop",
      description: "Key skills to add to your profile",
      skills: missing,
      icon: AlertTriangle,
      iconColor: "text-red-400",
      chipClass: "bg-red-500/10 text-red-300 border-red-500/20 hover:bg-red-500/20",
      dotColor: "bg-red-400"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Skill Gap Analysis</h3>
            <p className="text-dark-400 text-sm">How your skills align with requirements</p>
          </div>
        </div>
        
        {/* Coverage Badge */}
        <div className={`text-center px-4 py-2 rounded-xl ${
          matchPercentage >= 70 ? 'bg-emerald-500/10 border border-emerald-500/20' :
          matchPercentage >= 40 ? 'bg-amber-500/10 border border-amber-500/20' :
          'bg-red-500/10 border border-red-500/20'
        }`}>
          <div className={`text-2xl font-bold ${
            matchPercentage >= 70 ? 'text-emerald-400' :
            matchPercentage >= 40 ? 'text-amber-400' :
            'text-red-400'
          }`}>
            {matchPercentage}%
          </div>
          <div className="text-xs text-dark-500">Coverage</div>
        </div>
      </div>

      {/* Skill Sections */}
      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((cat, catIdx) => {
          const Icon = cat.icon;
          
          return (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIdx * 0.1 }}
              className="space-y-3"
            >
              {/* Category Header */}
              <div className="flex items-center gap-2">
                <Icon className={`w-5 h-5 ${cat.iconColor}`} />
                <h4 className="text-sm font-semibold text-white">{cat.title}</h4>
                <span className={`text-xs px-2 py-0.5 rounded-full ${cat.chipClass}`}>
                  {cat.skills.length}
                </span>
              </div>
              
              <p className="text-xs text-dark-500">{cat.description}</p>

              {/* Skills */}
              {cat.skills.length === 0 ? (
                <p className="text-xs text-dark-600 italic py-2">
                  No skills in this category
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, idx) => {
                    const detail = detailsMap[skill];
                    
                    return (
                      <motion.div 
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: catIdx * 0.1 + idx * 0.05 }}
                        className="group relative"
                      >
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-default ${cat.chipClass}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cat.dotColor}`} />
                          {skill}
                        </span>
                        
                        {/* Tooltip */}
                        {detail && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 
                                          bg-dark-800 rounded-lg text-xs text-dark-300 
                                          opacity-0 group-hover:opacity-100 transition-opacity
                                          pointer-events-none whitespace-nowrap z-10 shadow-xl border border-white/10">
                            {detail.reason || `${cat.key === 'matched' ? 'Found in resume' : 
                                              cat.key === 'partial' ? 'Related skill found' : 
                                              'Not found in resume'}`}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="pt-4 border-t border-white/10">
        <p className="text-xs text-dark-500 flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-emerald-400">Matched</span> = Direct skill match
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-amber-400">Partial</span> = Transferable skill
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <span className="text-red-400">Missing</span> = Skill gap
          </span>
        </p>
      </div>
    </motion.div>
  );
}
