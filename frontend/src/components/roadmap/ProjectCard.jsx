import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Rocket, Zap, BarChart3, CheckCircle } from "lucide-react";
import SkillProgress from "./SkillProgress";

export default function ProjectCard({ data, index, total }) {
  const isMustHave = data.priority === "must_have";
  
  const getDifficultyStyle = (diff) => {
    const d = diff?.toLowerCase();
    if (d?.includes("beginner") || d?.includes("easy")) 
      return { color: "text-emerald-400", bg: "bg-emerald-500/10" };
    if (d?.includes("advanced") || d?.includes("hard")) 
      return { color: "text-red-400", bg: "bg-red-500/10" };
    return { color: "text-amber-400", bg: "bg-amber-500/10" };
  };
  
  const diffStyle = getDifficultyStyle(data.difficulty);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      {/* Timeline Dot */}
      <div className="absolute -left-[26px] top-6 w-6 h-6 rounded-full bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center shadow-lg shadow-accent-purple/30">
        <span className="text-white text-xs font-bold">{index + 1}</span>
      </div>

      <div className="glass-card p-6 space-y-4 hover:border-accent-purple/30 transition-all">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${isMustHave ? 'bg-red-500/10' : 'bg-amber-500/10'} flex items-center justify-center`}>
              <Zap className={`w-5 h-5 ${isMustHave ? 'text-red-400' : 'text-amber-400'}`} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {data.skill}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs px-2 py-0.5 rounded-full ${diffStyle.bg} ${diffStyle.color}`}>
                  {data.difficulty}
                </span>
              </div>
            </div>
          </div>
          
          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${
            isMustHave
              ? "bg-red-500/10 text-red-400 border-red-500/20"
              : "bg-amber-500/10 text-amber-400 border-amber-500/20"
          }`}>
            {isMustHave ? "Must-have" : "Good-to-have"}
          </span>
        </div>

        {/* Learning Plan */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-accent-cyan" />
            <h4 className="text-sm font-semibold text-white">Learning Plan</h4>
          </div>
          <div className="space-y-2 pl-6">
            {data.learningPlan.map((step, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-dark-300">
                <CheckCircle className="w-4 h-4 text-dark-600 flex-shrink-0 mt-0.5" />
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Project */}
        <div className="rounded-xl bg-dark-900/50 border border-white/5 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Rocket className="w-4 h-4 text-accent-purple" />
            <h4 className="text-sm font-semibold text-white">
              Project: {data.project.title}
            </h4>
          </div>
          <p className="text-sm text-dark-300 pl-6">
            {data.project.description}
          </p>
          <div className="flex items-start gap-2 pl-6 pt-2 border-t border-white/5">
            <BarChart3 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-dark-400">
              <span className="text-emerald-400 font-medium">Outcome:</span> {data.project.outcome}
            </p>
          </div>
        </div>

        {/* Progress */}
        <SkillProgress skill={data.skill} />
      </div>
    </motion.div>
  );
}
