import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitCompare, AlertTriangle, Loader2 } from "lucide-react";
import MatchScore from "./MatchScore";
import SkillGapView from "./SkillGapView";
import { getResumeJDMatch } from "../../services/api";

export default function JDComparison({ jdId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jdId) return;

    const fetchMatch = async () => {
      try {
        const res = await getResumeJDMatch(jdId);
        setData(res);
      } catch (err) {
        setError("Failed to load resume match");
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [jdId]);

  if (loading) {
    return (
      <div className="glass-card p-8">
        <div className="flex items-center justify-center gap-3 py-10">
          <Loader2 className="w-6 h-6 text-accent-purple animate-spin" />
          <span className="text-dark-300">Analyzing resume vs job description...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card p-8 border-red-500/20">
        <div className="text-center py-8">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
          <div className="text-red-400 text-lg font-semibold mb-2">
            Match Analysis Unavailable
          </div>
          <p className="text-dark-400 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // Handle message-only response (no resume found case)
  if (data?.message && (!data.skillComparison || data.matchScore === 0)) {
    return (
      <div className="glass-card p-8 border-amber-500/20">
        <div className="text-center py-8">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
          </div>
          <div className="text-amber-400 text-lg font-semibold mb-2">
            Resume Match Unavailable
          </div>
          <p className="text-dark-400 text-sm">{data.message}</p>
        </div>
      </div>
    );
  }

  if (!data?.skillComparison) {
    return (
      <div className="glass-card p-8">
        <div className="text-center py-10 text-dark-400">
          No match data available
        </div>
      </div>
    );
  }

  // Match percentage normalization
  const rawPercentage = Math.round((data.matchScore / 92) * 100);
  const hasMissing = data.skillComparison?.missing?.length > 0;
  const finalPercentage = hasMissing ? Math.min(rawPercentage, 95) : 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 space-y-8"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center">
          <GitCompare className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Resume vs Job Description</h2>
          <p className="text-dark-400 text-sm">How well your resume aligns with this role</p>
        </div>
      </div>

      {/* Match Score */}
      <MatchScore score={finalPercentage} />

      {/* Skill Gap */}
      <SkillGapView
        matched={data.skillComparison?.matched || []}
        partial={data.skillComparison?.partial || []}
        missing={data.skillComparison?.missing || []}
      />
    </motion.div>
  );
}
