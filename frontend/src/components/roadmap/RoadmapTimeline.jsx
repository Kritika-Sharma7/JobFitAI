import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Map, Loader2, AlertTriangle, Target, Sparkles, RefreshCw } from "lucide-react";
import { getRoadmap } from "../../services/api";
import ProjectCard from "./ProjectCard";

export default function RoadmapTimeline({ jdId, data: preloadedData }) {
  const [data, setData] = useState(preloadedData || null);
  const [loading, setLoading] = useState(!preloadedData && !!jdId);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (preloadedData || !jdId) return;

    const fetchRoadmap = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await getRoadmap(jdId);
        
        if (response.roadmap) {
          setData(response);
        } else if (response.projects) {
          setData({
            targetRole: response.role || "Target Role",
            roadmap: response.projects.map(project => ({
              skill: project.title || project.skill,
              priority: project.priority || "good_to_have",
              difficulty: project.difficulty || "Intermediate",
              learningPlan: project.features || project.learningPlan || [
                "Learn the fundamentals",
                "Build a practice project",
                "Apply in real scenarios"
              ],
              project: {
                title: project.title,
                description: project.problem || project.description,
                outcome: project.whyItMatters || project.outcome || "Demonstrates practical skills"
              }
            }))
          });
        } else {
          throw new Error("Invalid roadmap data format");
        }
      } catch (err) {
        console.error("Roadmap fetch error:", err);
        setError(err.message || "Failed to load roadmap");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [jdId, preloadedData]);

  const retryFetch = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await getRoadmap(jdId);
      setData(response);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="glass-card p-8">
        <div className="flex items-center justify-center gap-3 py-12">
          <Loader2 className="w-6 h-6 text-accent-purple animate-spin" />
          <span className="text-dark-300">Generating your personalized roadmap...</span>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="glass-card p-8 border-red-500/20">
        <div className="text-center py-8">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
          <div className="text-red-400 text-lg font-semibold mb-2">
            Roadmap Unavailable
          </div>
          <p className="text-dark-400 text-sm mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={retryFetch}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-800 text-white text-sm hover:bg-dark-700 transition border border-white/10"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </motion.button>
        </div>
      </div>
    );
  }

  // Empty State
  if (!data || !data.roadmap || data.roadmap.length === 0) {
    return (
      <div className="glass-card p-8">
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            No Skill Gaps Detected
          </h3>
          <p className="text-dark-400 text-sm max-w-md mx-auto">
            Your resume already covers the key skills for this role.
            Keep your skills sharp and continue building projects!
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 space-y-8"
    >
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center">
            <Map className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              Personalized Learning Roadmap
            </h2>
            <p className="text-dark-400 text-sm mt-1">
              Tailored plan to close skill gaps for{" "}
              <span className="text-accent-purple font-medium">
                {data.targetRole || data.role || "your target role"}
              </span>
            </p>
          </div>
        </div>
        
        {/* Skills Count Badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-purple/10 border border-accent-purple/20">
          <Sparkles className="w-4 h-4 text-accent-purple" />
          <span className="text-accent-purple text-sm font-medium">
            {data.roadmap.length} skill{data.roadmap.length !== 1 ? "s" : ""} to develop
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative pl-8 space-y-6">
        {/* Timeline Line */}
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-purple via-accent-cyan to-transparent" />
        
        {data.roadmap.map((item, index) => (
          <ProjectCard
            key={item.skill || index}
            index={index}
            data={item}
            total={data.roadmap.length}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-white/10">
        <div className="flex items-center justify-center gap-6 text-sm text-dark-400 flex-wrap">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <span className="text-red-400">Must-have</span> = High priority
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-amber-400">Good-to-have</span> = Nice addition
          </span>
        </div>
      </div>
    </motion.div>
  );
}
