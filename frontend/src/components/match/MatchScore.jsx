import { useEffect, useState, useId } from "react";
import { motion } from "framer-motion";
import { Target, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

export default function MatchScore({ score }) {
  const safeScore = Math.min(Math.max(Number(score) || 0, 0), 100);
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    setAnimatedScore(safeScore);
  }, [safeScore]);

  const getStyle = () => {
    if (safeScore >= 75) return { 
      gradient: "from-emerald-500 to-cyan-500",
      text: "text-emerald-400",
      label: "Strong Match",
      icon: CheckCircle,
      description: "Your resume aligns well with this role"
    };
    if (safeScore >= 50) return { 
      gradient: "from-amber-500 to-orange-500",
      text: "text-amber-400",
      label: "Partial Match",
      icon: TrendingUp,
      description: "Some skills match, others need development"
    };
    return { 
      gradient: "from-red-500 to-rose-500",
      text: "text-red-400",
      label: "Low Match",
      icon: AlertTriangle,
      description: "Consider focusing on key skill gaps"
    };
  };

  const style = getStyle();
  const Icon = style.icon;
  const gradientId = useId();
  
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Circular Progress */}
        <div className="relative flex-shrink-0">
          <svg width="160" height="160" className="transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="10"
            />
            <motion.circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="text-4xl font-bold text-white"
            >
              {animatedScore}%
            </motion.span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${style.gradient} bg-opacity-20 border border-white/10`}>
            <Icon className="w-4 h-4 text-white" />
            <span className="text-white font-semibold">{style.label}</span>
          </div>

          <p className="text-dark-300">
            {style.description}
          </p>

          <p className="text-sm text-dark-500">
            This score represents how closely your resume aligns with the
            job description based on skills, experience, and keywords.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
