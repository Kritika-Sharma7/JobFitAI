import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Lightbulb, 
  TrendingUp, 
  Target, 
  Award,
  BarChart3,
  PieChart,
  Zap,
  CheckCircle,
  Loader2,
  FileSearch,
  ArrowRight
} from "lucide-react";
import { getDashboardData } from "../services/api";

export default function Insights() {
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState({
    topSkills: [],
    skillGaps: [],
    avgMatchScore: 0,
    totalAnalyses: 0,
    bestMatch: 0,
    improvementRate: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardData();
        setInsights({
          topSkills: data.topSkills || [],
          skillGaps: data.skillGaps || [],
          avgMatchScore: data.avgMatch || 0,
          totalAnalyses: data.totalJDs || 0,
          bestMatch: data.bestMatch || 0,
          improvementRate: Math.max(0, (data.bestMatch || 0) - (data.avgMatch || 0))
        });
      } catch (err) {
        console.error("Failed to fetch insights:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const insightCards = [
    {
      title: "Average Match Score",
      value: `${insights.avgMatchScore}%`,
      change: insights.totalAnalyses > 0 ? "Based on your analyses" : "No data yet",
      icon: Target,
      color: "from-accent-purple to-accent-cyan"
    },
    {
      title: "Total Analyses",
      value: insights.totalAnalyses,
      change: insights.totalAnalyses > 0 ? "Jobs analyzed" : "Start analyzing",
      icon: BarChart3,
      color: "from-emerald-500 to-cyan-500"
    },
    {
      title: "Improvement Rate",
      value: `${insights.improvementRate}%`,
      change: "Best vs average",
      icon: TrendingUp,
      color: "from-amber-500 to-orange-500"
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-accent-purple animate-spin" />
      </div>
    );
  }

  // Check if user has any analyses
  const hasData = insights.totalAnalyses > 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Career Insights</h1>
        <p className="text-dark-400">AI-powered insights to accelerate your job search</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-3 gap-4"
      >
        {insightCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="glass-card p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} bg-opacity-20 flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-emerald-400 font-medium">{card.change}</span>
              </div>
              <p className="text-3xl font-bold text-white mb-1">{card.value}</p>
              <p className="text-sm text-dark-400">{card.title}</p>
            </div>
          );
        })}
      </motion.div>

      {/* Skills Analysis */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Skills */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <Award className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Your Top Skills</h3>
              <p className="text-sm text-dark-400">Most frequently matched skills</p>
            </div>
          </div>
          
          {insights.topSkills.length > 0 ? (
            <div className="space-y-3">
              {insights.topSkills.map((skill, idx) => (
                <div key={skill} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-white font-medium">{skill}</span>
                  </div>
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-xl bg-dark-700 flex items-center justify-center mx-auto mb-3">
                <FileSearch className="w-6 h-6 text-gray-500" />
              </div>
              <p className="text-gray-400 font-medium mb-1">No skills data yet</p>
              <p className="text-gray-500 text-sm mb-4">Analyze job descriptions to discover your top skills</p>
              <Link 
                to="/analyze"
                className="inline-flex items-center gap-2 text-accent-purple text-sm font-medium hover:underline"
              >
                Start analyzing <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </motion.div>

        {/* Skill Gaps */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Skills to Develop</h3>
              <p className="text-sm text-dark-400">Most requested skills you're missing</p>
            </div>
          </div>
          
          {insights.skillGaps.length > 0 ? (
            <>
              <div className="space-y-3">
                {insights.skillGaps.map((skill) => (
                  <div key={skill} className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <span className="text-white font-medium">{skill}</span>
                    <span className="text-xs text-amber-400 font-medium px-2 py-1 rounded-full bg-amber-500/20">
                      High demand
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 rounded-xl bg-accent-purple/10 border border-accent-purple/20">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-accent-purple flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-white font-medium mb-1">Pro Tip</p>
                    <p className="text-xs text-dark-400">
                      Learning these skills could increase your match rate by up to 25% based on recent job postings.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-xl bg-dark-700 flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-gray-500" />
              </div>
              <p className="text-gray-400 font-medium mb-1">No skill gaps identified</p>
              <p className="text-gray-500 text-sm mb-4">Analyze job descriptions to find skills to develop</p>
              <Link 
                to="/analyze"
                className="inline-flex items-center gap-2 text-accent-purple text-sm font-medium hover:underline"
              >
                Start analyzing <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </motion.div>
      </div>

      {/* Performance Summary - Only show if there's data */}
      {hasData && (insights.topSkills.length > 0 || insights.skillGaps.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 rounded-2xl"
        >
          <h3 className="text-lg font-semibold text-white mb-6">Performance Summary</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-emerald-400 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Strong Areas
              </h4>
              <div className="flex flex-wrap gap-2">
                {insights.topSkills.length > 0 ? (
                  insights.topSkills.slice(0, 3).map((skill) => (
                    <span key={skill} className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm border border-emerald-500/20">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">No data yet</span>
                )}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-amber-400 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Areas to Improve
              </h4>
              <div className="flex flex-wrap gap-2">
                {insights.skillGaps.length > 0 ? (
                  insights.skillGaps.slice(0, 3).map((skill) => (
                    <span key={skill} className="px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-sm border border-amber-500/20">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">No data yet</span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Empty State CTA when no data */}
      {!hasData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-8 rounded-2xl text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-purple/20 to-accent-cyan/20 flex items-center justify-center mx-auto mb-4">
            <Lightbulb className="w-8 h-8 text-accent-purple" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Start Building Your Insights</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Analyze job descriptions against your resume to get personalized career insights, 
            skill recommendations, and performance tracking.
          </p>
          <Link 
            to="/analyze"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-purple to-accent-cyan text-white font-semibold hover:opacity-90 transition-opacity"
          >
            <span>Start Your First Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      )}
    </div>
  );
}
