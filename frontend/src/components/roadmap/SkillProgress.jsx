import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";

export default function SkillProgress({ skill }) {
  const [completed, setCompleted] = useState(false);

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={() => setCompleted(!completed)}
      className={`flex items-center gap-3 pt-3 mt-2 border-t border-white/5 w-full text-left transition-colors ${
        completed ? 'opacity-75' : ''
      }`}
    >
      {completed ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
      ) : (
        <Circle className="w-5 h-5 text-dark-500 flex-shrink-0" />
      )}
      <span className={`text-sm transition-all ${
        completed 
          ? "text-emerald-400 line-through" 
          : "text-dark-400 hover:text-dark-300"
      }`}>
        {completed ? `${skill} completed!` : `Mark ${skill} as completed`}
      </span>
    </motion.button>
  );
}
