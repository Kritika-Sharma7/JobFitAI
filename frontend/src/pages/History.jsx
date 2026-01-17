import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { 
  FileSearch, 
  Calendar, 
  TrendingUp, 
  Trash2, 
  ExternalLink,
  Search,
  Filter,
  Eye,
  X,
  CheckCircle,
  AlertTriangle,
  Zap,
  Target,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Loader2
} from "lucide-react";
import { getDashboardData, getResumeJDMatch, getAnalysisSummary } from "../services/api";

export default function History() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [loadingModal, setLoadingModal] = useState(false);
  const [aiSummary, setAiSummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Fetch real data from dashboard API
        const data = await getDashboardData();
        if (data.recentJDs && data.recentJDs.length > 0) {
          setAnalyses(data.recentJDs);
        }
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch history:", err);
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const filteredAnalyses = analyses.filter(a => 
    a.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-amber-400";
    return "text-red-400";
  };

  const getScoreBg = (score) => {
    if (score >= 80) return "bg-emerald-500/10 border-emerald-500/30";
    if (score >= 60) return "bg-amber-500/10 border-amber-500/30";
    return "bg-red-500/10 border-red-500/30";
  };

  const getVerdict = (score) => {
    if (score >= 80) return { text: "Strong Match", icon: CheckCircle, color: "text-emerald-400" };
    if (score >= 60) return { text: "Partial Match", icon: Zap, color: "text-amber-400" };
    return { text: "Needs Work", icon: AlertTriangle, color: "text-red-400" };
  };

  const handleViewAnalysis = async (analysis) => {
    // Use the 'id' field which is the MongoDB _id from dashboard service
    const jdId = analysis.id || analysis._id || analysis.jdId;
    console.log("Fetching analysis for jdId:", jdId);
    
    setSelectedAnalysis(analysis);
    setLoadingModal(true);
    setAiSummary(null);
    
    try {
      // Fetch detailed match data
      const matchData = await getResumeJDMatch(jdId);
      console.log("Match data received:", matchData);
      setModalData(matchData);
      
      // Start fetching AI summary in parallel
      setLoadingSummary(true);
      getAnalysisSummary(jdId)
        .then(data => {
          setAiSummary(data.summary);
        })
        .catch(err => {
          console.error("Failed to fetch AI summary:", err);
          setAiSummary(null);
        })
        .finally(() => {
          setLoadingSummary(false);
        });
        
    } catch (err) {
      console.error("Failed to fetch analysis details:", err);
      setModalData(null);
    } finally {
      setLoadingModal(false);
    }
  };

  const closeModal = () => {
    setSelectedAnalysis(null);
    setModalData(null);
    setAiSummary(null);
  };

  const handleNewAnalysis = () => {
    closeModal();
    navigate("/analyze");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analysis History</h1>
          <p className="text-dark-400">Review your past job analyses and match scores</p>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
          <input
            type="text"
            placeholder="Search by role or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80 pl-12 pr-4 py-3 rounded-xl bg-dark-800/50 border border-white/10 text-white placeholder-dark-400 focus:outline-none focus:border-accent-purple/50"
          />
        </div>
      </motion.div>

      {/* Content */}
      {loading ? (
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl animate-pulse">
              <div className="h-6 bg-dark-700 rounded w-1/3 mb-3" />
              <div className="h-4 bg-dark-700 rounded w-1/4" />
            </div>
          ))}
        </div>
      ) : filteredAnalyses.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 rounded-2xl text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-accent-purple/10 flex items-center justify-center mx-auto mb-4">
            <FileSearch className="w-8 h-8 text-accent-purple" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No analyses yet</h3>
          <p className="text-dark-400 mb-6">Start by analyzing your resume against a job description</p>
          <Link
            to="/analyze"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-purple to-accent-cyan text-white font-semibold"
          >
            Start New Analysis
          </Link>
        </motion.div>
      ) : (
        <div className="grid gap-4">
          {filteredAnalyses.map((analysis, idx) => (
            <motion.div
              key={analysis._id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-card p-6 rounded-2xl hover:border-accent-purple/30 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white group-hover:text-accent-purple transition-colors">
                    {analysis.role || "Job Analysis"}
                  </h3>
                  <p className="text-dark-400 text-sm">{analysis.company || "Unknown Company"}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-dark-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(analysis.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className={`text-2xl font-bold ${getScoreColor(analysis.matchScore)}`}>
                      {analysis.matchScore || "-"}%
                    </p>
                    <p className="text-xs text-dark-500">Match Score</p>
                  </div>
                  
                  <button
                    onClick={() => handleViewAnalysis(analysis)}
                    className="p-3 rounded-xl bg-white/5 hover:bg-accent-purple/20 text-dark-400 hover:text-accent-purple transition-all"
                    title="View Analysis"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Analysis Detail Modal */}
      <AnimatePresence>
        {selectedAnalysis && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#141821] rounded-2xl border border-white/10 shadow-2xl"
              style={{ scrollbarGutter: 'stable' }}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-[#141821] px-6 py-5 border-b border-white/10 rounded-t-2xl">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {selectedAnalysis.role || "Job Analysis"}
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                      Analyzed on {new Date(selectedAnalysis.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6 bg-[#141821]">
                {loadingModal ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-12 h-12 border-3 border-accent-purple/30 border-t-accent-purple rounded-full animate-spin mb-4" />
                    <p className="text-gray-400">Loading analysis details...</p>
                  </div>
                ) : (
                  <>
                    {/* Score Section */}
                    <div className="p-5 rounded-xl bg-[#1c2130] border border-white/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center">
                            <Target className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm font-medium">Match Score</p>
                            <p className={`text-4xl font-bold ${getScoreColor(selectedAnalysis.matchScore)}`}>
                              {selectedAnalysis.matchScore || 0}%
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          {(() => {
                            const verdict = getVerdict(selectedAnalysis.matchScore);
                            const Icon = verdict.icon;
                            return (
                              <div className="flex items-center gap-2">
                                <Icon className={`w-5 h-5 ${verdict.color}`} />
                                <span className={`font-semibold ${verdict.color}`}>{verdict.text}</span>
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    </div>

                    {/* Skills Comparison */}
                    {modalData?.skillComparison && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-accent-purple" />
                          Skills Analysis
                        </h3>
                        
                        <div className="space-y-3">
                          {/* Matched Skills */}
                          {modalData.skillComparison.matched?.length > 0 && (
                            <div className="p-4 rounded-xl bg-[#162018] border border-emerald-500/20">
                              <div className="flex items-center gap-2 mb-3">
                                <CheckCircle className="w-4 h-4 text-emerald-400" />
                                <span className="text-sm font-medium text-emerald-400">
                                  Matched Skills ({modalData.skillComparison.matched.length})
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {modalData.skillComparison.matched.map((skill, i) => (
                                  <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-900/40 text-emerald-300 border border-emerald-500/30">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Partial Skills */}
                          {modalData.skillComparison.partial?.length > 0 && (
                            <div className="p-4 rounded-xl bg-[#201c14] border border-amber-500/20">
                              <div className="flex items-center gap-2 mb-3">
                                <Zap className="w-4 h-4 text-amber-400" />
                                <span className="text-sm font-medium text-amber-400">
                                  Partial Match ({modalData.skillComparison.partial.length})
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {modalData.skillComparison.partial.map((skill, i) => (
                                  <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-900/40 text-amber-300 border border-amber-500/30">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Missing Skills */}
                          {modalData.skillComparison.missing?.length > 0 && (
                            <div className="p-4 rounded-xl bg-[#201416] border border-red-500/20">
                              <div className="flex items-center gap-2 mb-3">
                                <AlertTriangle className="w-4 h-4 text-red-400" />
                                <span className="text-sm font-medium text-red-400">
                                  Skills to Develop ({modalData.skillComparison.missing.length})
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {modalData.skillComparison.missing.map((skill, i) => (
                                  <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-900/40 text-red-300 border border-red-500/30">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* No detailed data message */}
                    {!modalData?.skillComparison && (
                      <div className="text-center py-8">
                        <div className="w-12 h-12 rounded-xl bg-[#1c2130] flex items-center justify-center mx-auto mb-3">
                          <FileSearch className="w-6 h-6 text-gray-500" />
                        </div>
                        <p className="text-gray-500">
                          Detailed skill comparison not available for this analysis
                        </p>
                      </div>
                    )}

                    {/* AI Summary Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-accent-cyan" />
                        AI Career Coach Summary
                      </h3>
                      
                      <div className="p-5 rounded-xl bg-[#1c2130] border border-white/5">
                        {loadingSummary ? (
                          <div className="flex items-center gap-3 py-4">
                            <Loader2 className="w-5 h-5 text-accent-purple animate-spin" />
                            <span className="text-gray-400">Generating personalized analysis...</span>
                          </div>
                        ) : aiSummary ? (
                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center flex-shrink-0 mt-1">
                                <Sparkles className="w-4 h-4 text-white" />
                              </div>
                              <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-line">
                                {aiSummary}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <p className="text-gray-500 text-sm">
                              AI summary will appear here when available
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4 border-t border-white/10">
                      <button
                        onClick={handleNewAnalysis}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-accent-purple to-accent-cyan text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-accent-purple/30 transition-all"
                      >
                        <span>Start New Analysis</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
