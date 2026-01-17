import { motion } from "framer-motion";
import { Bot, Key, Zap, FileText, TrendingUp, Lightbulb, AlertTriangle, CheckCircle, Info } from "lucide-react";

/* Score category configurations */
const CATEGORY_INFO = {
  keywords: {
    label: "Keywords",
    description: "JD keywords found in resume",
    icon: Key,
    color: "accent-purple",
    maxScore: 35
  },
  actionVerbs: {
    label: "Action Verbs",
    description: "Strong verbs like built, led, designed",
    icon: Zap,
    color: "accent-cyan",
    maxScore: 25
  },
  structure: {
    label: "Structure",
    description: "Resume format and readability",
    icon: FileText,
    color: "pink-500",
    maxScore: 25
  },
  experience: {
    label: "Experience",
    description: "Years of relevant experience",
    icon: TrendingUp,
    color: "amber-500",
    maxScore: 15
  }
};

/* Get score styling */
function getScoreStyle(score) {
  if (score >= 80) return { 
    gradient: "from-emerald-500 to-cyan-500",
    text: "text-emerald-400",
    bg: "bg-emerald-500",
    label: "Excellent",
    description: "Your resume is well-optimized for ATS systems",
    icon: CheckCircle
  };
  if (score >= 60) return { 
    gradient: "from-accent-purple to-accent-cyan",
    text: "text-accent-purple",
    bg: "bg-accent-purple",
    label: "Good",
    description: "Your resume should pass most ATS filters",
    icon: CheckCircle
  };
  if (score >= 40) return { 
    gradient: "from-amber-500 to-orange-500",
    text: "text-amber-400",
    bg: "bg-amber-500",
    label: "Needs Work",
    description: "Consider adding more keywords and action verbs",
    icon: AlertTriangle
  };
  return { 
    gradient: "from-red-500 to-rose-500",
    text: "text-red-400",
    bg: "bg-red-500",
    label: "Critical",
    description: "Your resume may be filtered out by ATS systems",
    icon: AlertTriangle
  };
}

export default function ATSScore({ data }) {
  if (!data) {
    return (
      <div className="glass-card p-8">
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-2xl bg-dark-700 flex items-center justify-center mx-auto mb-4">
            <Bot className="w-8 h-8 text-dark-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            ATS Score Unavailable
          </h3>
          <p className="text-dark-400 text-sm">
            Upload your resume to see ATS compatibility analysis
          </p>
        </div>
      </div>
    );
  }

  const { atsScore = 0, breakdown = {} } = data;
  const style = getScoreStyle(atsScore);
  const VerdictIcon = style.icon;

  const breakdownItems = [
    { key: "keywords", value: breakdown.keywords || 0 },
    { key: "actionVerbs", value: breakdown.actionVerbs || 0 },
    { key: "structure", value: breakdown.structure || 0 },
    { key: "experience", value: breakdown.experience || 0 }
  ];

  // Circle progress calculation
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (atsScore / 100) * circumference;

  const tips = [
    "Use exact keywords from the job description",
    "Start bullet points with strong action verbs",
    "Avoid graphics, tables, and complex formatting",
    "Use standard section headers (Experience, Skills, Education)"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br ${style.gradient} opacity-10 rounded-full blur-3xl`} />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center`}>
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">ATS Compatibility</h3>
              <p className="text-dark-400 text-sm">Automated screening score</p>
            </div>
          </div>
          
          {/* Verdict Badge */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${style.gradient} bg-opacity-20 border border-white/10`}>
            <VerdictIcon className="w-4 h-4 text-white" />
            <span className="text-white font-semibold">{style.label}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Circular Score */}
          <div className="relative flex-shrink-0">
            <svg width="180" height="180" className="transform -rotate-90">
              <circle
                cx="90"
                cy="90"
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="10"
              />
              <motion.circle
                cx="90"
                cy="90"
                r={radius}
                fill="none"
                stroke="url(#atsGradient)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="atsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
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
                className={`text-5xl font-bold ${style.text}`}
              >
                {atsScore}
              </motion.span>
              <span className="text-dark-400 text-sm">out of 100</span>
            </div>
          </div>

          {/* Breakdown Bars */}
          <div className="flex-1 space-y-4 w-full">
            {breakdownItems.map((item, idx) => {
              const info = CATEGORY_INFO[item.key];
              const percentage = (item.value / info.maxScore) * 100;
              const Icon = info.icon;
              
              return (
                <motion.div 
                  key={item.key}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="group"
                >
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-dark-200 flex items-center gap-2">
                      <Icon className={`w-4 h-4 text-${info.color}`} />
                      <span>{info.label}</span>
                      <span className="hidden group-hover:inline text-xs text-dark-500 transition-all">
                        — {info.description}
                      </span>
                    </span>
                    <span className="text-white font-medium">
                      {item.value} / {info.maxScore}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-dark-700 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                      className={`h-full rounded-full ${
                        percentage >= 70 ? "bg-emerald-500" :
                        percentage >= 40 ? "bg-accent-purple" :
                        "bg-amber-500"
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Verdict Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={`mt-8 p-4 rounded-xl bg-gradient-to-r ${style.gradient} bg-opacity-5 border border-white/10`}
        >
          <div className="flex items-start gap-3">
            <Info className={`w-5 h-5 ${style.text} flex-shrink-0 mt-0.5`} />
            <p className="text-sm text-dark-200">
              <span className="font-medium text-white">What this means: </span>
              {style.description}
            </p>
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 pt-6 border-t border-white/10"
        >
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <h4 className="text-sm font-semibold text-white">Quick Tips to Improve</h4>
          </div>
          <div className="grid md:grid-cols-2 gap-2">
            {tips.map((tip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + idx * 0.1 }}
                className="flex items-start gap-2 text-sm text-dark-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent-purple mt-2 flex-shrink-0" />
                {tip}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
