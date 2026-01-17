import { motion } from "framer-motion";
import { TrendingUp, Award, Target, Zap } from "lucide-react";

function JobFitScore({ score }) {
  if (typeof score !== "number") return null;

  const getMessage = () => {
    if (score >= 85) return { text: "Exceptional Match", icon: Award, desc: "Your profile aligns perfectly with this role", color: "text-emerald-400", gradient: "from-emerald-500 to-cyan-500" };
    if (score >= 75) return { text: "Strong Match", icon: TrendingUp, desc: "Excellent fit with minor optimization opportunities", color: "text-accent-purple", gradient: "from-accent-purple to-accent-cyan" };
    if (score >= 60) return { text: "Good Match", icon: Target, desc: "Solid foundation — a few gaps to address", color: "text-blue-400", gradient: "from-blue-500 to-indigo-500" };
    if (score >= 45) return { text: "Moderate Match", icon: Zap, desc: "Potential candidate with development areas", color: "text-amber-400", gradient: "from-amber-500 to-orange-500" };
    return { text: "Needs Improvement", icon: Target, desc: "Focus on skill building for this role", color: "text-rose-400", gradient: "from-rose-500 to-red-500" };
  };

  const message = getMessage();
  const Icon = message.icon;
  
  // Circle progress calculation
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const breakdown = [
    { label: "Skills Match", value: Math.min(score + 10, 100), color: "bg-accent-purple" },
    { label: "Experience Fit", value: Math.max(score - 5, 0), color: "bg-accent-cyan" },
    { label: "Keyword Coverage", value: score, color: "bg-pink-500" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 relative overflow-hidden group"
    >
      {/* Background Glow */}
      <div className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br ${message.gradient} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-500`} />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${message.gradient} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">Job Fit Score</h3>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Circular Score */}
          <div className="relative">
            <svg width="200" height="200" className="transform -rotate-90">
              {/* Background Circle */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="12"
              />
              {/* Progress Circle */}
              <motion.circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Score Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="text-5xl font-bold text-white"
              >
                {score}
              </motion.span>
              <span className="text-dark-400 text-sm">out of 100</span>
            </div>
          </div>

          {/* Right Side Content */}
          <div className="flex-1 space-y-6">
            {/* Verdict Badge */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${message.gradient} bg-opacity-20 border border-white/10`}>
                <Icon className="w-4 h-4 text-white" />
                <span className="text-white font-semibold">{message.text}</span>
              </div>
              <p className="text-dark-300">{message.desc}</p>
            </motion.div>

            {/* Breakdown Bars */}
            <div className="space-y-4">
              {breakdown.map((item, idx) => (
                <motion.div 
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between text-sm">
                    <span className="text-dark-300">{item.label}</span>
                    <span className="text-white font-medium">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: 0.7 + idx * 0.1 }}
                      className={`h-full ${item.color} rounded-full`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default JobFitScore;
