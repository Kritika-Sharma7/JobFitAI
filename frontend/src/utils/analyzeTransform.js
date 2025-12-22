// src/utils/analyzeTransform.js

/**
 * Phase 4+
 * Backend already returns structured AI output.
 * This function only normalizes + protects against missing fields.
 */
export const transformAnalysisData = (raw) => {
  if (!raw || typeof raw !== "object") {
    return getDefaultStructure();
  }

  return {
    role: raw.role ?? getDefaultStructure().role,
    fitScore: raw.fitScore ?? getDefaultStructure().fitScore,
    scoreBreakdown: raw.scoreBreakdown ?? getDefaultStructure().scoreBreakdown,
    skills: raw.skills ?? [],
    projects: raw.projects ?? [],
    resumeBullets: raw.resumeBullets ?? [],
  };
};

/* -------------------- fallback -------------------- */

const getDefaultStructure = () => ({
  role: {
    title: "Software Engineer",
    level: "Mid-Level",
    techStack: ["React", "Node.js"],
  },
  fitScore: 0,
  scoreBreakdown: {
    skills: 0,
    keywords: 0,
    experience: 0,
    bonus: 0,
  },
  skills: [],
  projects: [],
  resumeBullets: [],
});
