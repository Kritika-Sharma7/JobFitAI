import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileSearch, CheckCircle, XCircle, Lightbulb, Sparkles, Copy, Check, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { improveResume } from "../../services/api";

export default function KeywordSuggestions({ bullets = [], role = "", jobDescription = "" }) {
  const [expandedSuggestions, setExpandedSuggestions] = useState({});
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("weak"); // 'all', 'strong', 'weak'
  const [loadingSuggestions, setLoadingSuggestions] = useState({});
  const [aiSuggestions, setAiSuggestions] = useState({});

  if (!bullets.length) return null;

  const strongBullets = bullets.filter(b => b.grade === "strong");
  const weakBullets = bullets.filter(b => b.grade !== "strong");

  const toggleSuggestion = async (idx, bulletText) => {
    const isExpanded = expandedSuggestions[idx];
    
    setExpandedSuggestions(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));

    // If expanding and no suggestion yet, fetch from API
    if (!isExpanded && !aiSuggestions[idx] && !loadingSuggestions[idx]) {
      setLoadingSuggestions(prev => ({ ...prev, [idx]: true }));
      
      try {
        const response = await improveResume({
          bullet: bulletText,
          role: role || "Software Developer",
          jobDescription: jobDescription || "General software development position requiring strong programming skills"
        });
        
        setAiSuggestions(prev => ({
          ...prev,
          [idx]: response.optimized || "Unable to generate suggestion. Please try again."
        }));
      } catch (err) {
        console.error("Failed to get AI suggestion:", err);
        setAiSuggestions(prev => ({
          ...prev,
          [idx]: getFallbackSuggestion(bulletText)
        }));
      } finally {
        setLoadingSuggestions(prev => ({ ...prev, [idx]: false }));
      }
    }
  };

  // Fallback suggestion if API fails
  const getFallbackSuggestion = (bulletText) => {
    const text = bulletText.toLowerCase();
    
    if (text.includes("work") || text.includes("help")) {
      return "Replace vague verbs like 'worked' or 'helped' with action verbs like 'Engineered', 'Implemented', 'Optimized', or 'Architected'. Add specific metrics to quantify your impact.";
    }
    if (text.includes("responsible")) {
      return "Avoid 'responsible for' - lead with achievements instead. Example: 'Delivered 15+ features ahead of schedule, improving user engagement by 25%'";
    }
    if (!text.match(/\d+/)) {
      return "Add quantifiable metrics to demonstrate impact. Example: 'Increased test coverage from 45% to 92%, reducing production bugs by 60%'";
    }
    
    return "Consider adding specific metrics, technologies used, and quantifiable impact to strengthen this bullet point.";
  };

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const displayBullets = activeTab === "all" ? bullets : 
                         activeTab === "strong" ? strongBullets : weakBullets;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 space-y-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center">
            <FileSearch className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              Resume Bullet Analysis
            </h2>
            <p className="text-dark-400 text-sm mt-1">
              AI-powered analysis of your resume bullet points
            </p>
          </div>
        </div>
        
        {/* Summary badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">{strongBullets.length} Strong</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20">
            <XCircle className="w-4 h-4 text-red-400" />
            <span className="text-red-400 text-sm font-medium">{weakBullets.length} Needs Work</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 p-1 rounded-xl bg-dark-800/50">
        {[
          { id: "weak", label: "Needs Improvement", count: weakBullets.length, color: "red" },
          { id: "strong", label: "Strong Bullets", count: strongBullets.length, color: "emerald" },
          { id: "all", label: "All Bullets", count: bullets.length, color: "purple" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? `bg-${tab.color}-500/20 text-${tab.color}-400 border border-${tab.color}-500/30`
                : "text-dark-400 hover:text-white hover:bg-white/5"
            }`}
            style={activeTab === tab.id ? {
              backgroundColor: tab.color === "red" ? "rgba(239, 68, 68, 0.2)" : 
                              tab.color === "emerald" ? "rgba(16, 185, 129, 0.2)" : 
                              "rgba(139, 92, 246, 0.2)",
              color: tab.color === "red" ? "rgb(248, 113, 113)" : 
                     tab.color === "emerald" ? "rgb(52, 211, 153)" : 
                     "rgb(167, 139, 250)"
            } : {}}
          >
            <span>{tab.label}</span>
            <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Bullets */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {displayBullets.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8 text-dark-400"
            >
              No bullets in this category
            </motion.div>
          ) : (
            displayBullets.map((item, idx) => {
              const isStrong = item.grade === "strong";
              const globalIdx = bullets.indexOf(item);

              return (
                <motion.div
                  key={globalIdx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ delay: idx * 0.03 }}
                  className={`rounded-xl border transition-all ${
                    isStrong
                      ? "border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/30"
                      : "border-red-500/20 bg-red-500/5 hover:border-red-500/30"
                  }`}
                >
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                        isStrong ? "bg-emerald-500/10" : "bg-red-500/10"
                      }`}>
                        {isStrong ? (
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400" />
                        )}
                      </div>

                      <div className="flex-1 space-y-2">
                        {/* Badge */}
                        <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${
                          isStrong
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-red-500/20 text-red-400"
                        }`}>
                          {isStrong ? "Strong Bullet" : "Needs Improvement"}
                        </span>

                        {/* Bullet text */}
                        <p className="text-white text-sm leading-relaxed">
                          "{item.text}"
                        </p>

                        {/* Reason */}
                        <div className="flex items-start gap-2 pt-2">
                          <Lightbulb className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            isStrong ? "text-emerald-400" : "text-amber-400"
                          }`} />
                          <p className="text-dark-400 text-xs">
                            {item.reason}
                          </p>
                        </div>

                        {/* AI Suggestion for weak bullets */}
                        {!isStrong && (
                          <div className="mt-4">
                            <button
                              onClick={() => toggleSuggestion(globalIdx, item.text)}
                              className="flex items-center gap-2 text-accent-purple hover:text-accent-cyan transition-colors text-sm font-medium"
                            >
                              <Sparkles className="w-4 h-4" />
                              <span>AI Improvement Suggestion</span>
                              {loadingSuggestions[globalIdx] ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : expandedSuggestions[globalIdx] ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </button>

                            <AnimatePresence>
                              {expandedSuggestions[globalIdx] && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-3 p-4 rounded-xl bg-accent-purple/10 border border-accent-purple/20"
                                >
                                  {loadingSuggestions[globalIdx] ? (
                                    <div className="flex items-center gap-3 py-2">
                                      <Loader2 className="w-5 h-5 text-accent-purple animate-spin" />
                                      <span className="text-sm text-dark-300">Generating AI suggestion...</span>
                                    </div>
                                  ) : (
                                    <div className="flex items-start gap-3">
                                      <div className="w-8 h-8 rounded-lg bg-accent-purple/20 flex items-center justify-center flex-shrink-0">
                                        <Sparkles className="w-4 h-4 text-accent-purple" />
                                      </div>
                                      <div className="flex-1">
                                        <p className="text-sm text-dark-200 leading-relaxed">
                                          {aiSuggestions[globalIdx] || "Click to generate suggestion"}
                                        </p>
                                        {aiSuggestions[globalIdx] && (
                                          <button
                                            onClick={() => copyToClipboard(aiSuggestions[globalIdx], globalIdx)}
                                            className="mt-3 flex items-center gap-2 text-xs text-accent-purple hover:text-accent-cyan transition-colors"
                                          >
                                            {copiedIndex === globalIdx ? (
                                              <>
                                                <Check className="w-3 h-3" />
                                                <span>Copied!</span>
                                              </>
                                            ) : (
                                              <>
                                                <Copy className="w-3 h-3" />
                                                <span>Copy suggestion</span>
                                              </>
                                            )}
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Tip Section */}
      {activeTab === "weak" && weakBullets.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 rounded-xl bg-gradient-to-r from-accent-purple/10 to-accent-cyan/10 border border-accent-purple/20"
        >
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-accent-purple flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-white mb-1">Pro Tip</p>
              <p className="text-xs text-dark-400">
                Use the STAR method (Situation, Task, Action, Result) and include metrics wherever possible. 
                Strong bullets typically start with powerful action verbs and include quantifiable achievements.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
