// const Resume = require("../models/Resume.model");
// const JDMatch = require("../models/JDMatch.model");

// async function getDashboardData({ userId }) {

//   /* ---------- PARALLEL QUERIES ---------- */
//   const [
//     resumes,
//     jdMatches
//   ] = await Promise.all([
//     Resume.find({ userId }).sort({ createdAt: -1 }),
//     JDMatch.find({ userId }).sort({ createdAt: -1 })
//   ]);

//   /* ---------- STATS ---------- */
//   const totalResumes = resumes.length;
//   const totalJDAnalyzed = jdMatches.length;

//   const scores = jdMatches.map(j => j.matchScore);
//   const averageMatchScore =
//     scores.length > 0
//       ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
//       : 0;

//   const bestMatchScore = scores.length > 0 ? Math.max(...scores) : 0;

//   /* ---------- RECENT SNAPSHOTS ---------- */
//   const recentResumes = resumes.slice(0, 3).map(r => ({
//     version: r.version,
//     createdAt: r.createdAt,
//     skillsCount: r.parsedData?.skills?.length || 0
//   }));

//   const recentJDMatches = jdMatches.slice(0, 5).map(j => ({
//     jdId: j.jdId,
//     matchScore: j.matchScore,
//     verdict: j.verdict,
//     createdAt: j.createdAt
//   }));

//   return {
//     stats: {
//       totalResumes,
//       totalJDAnalyzed,
//       averageMatchScore,
//       bestMatchScore
//     },
//     recentResumes,
//     recentJDMatches
//   };
// }

// module.exports = getDashboardData;


//==============Modified code 29 Dec Phase 5 ================
const Resume = require("../models/Resume.model");
const JDAnalysis = require("../models/JDAnalysis.model");

async function getDashboardData({ userId }) {
  /* ---------- SAFETY ---------- */
  if (!userId) {
    throw new Error("UserId is required for dashboard");
  }

  /* ---------- FETCH DATA ---------- */
  const [resumes, analyses] = await Promise.all([
    Resume.find({ userId }).sort({ version: -1 }),
    JDAnalysis.find({ userId }).sort({ createdAt: -1 })
  ]);

  /* ---------- AGGREGATIONS ---------- */
  const totalResumes = resumes.length;
  const totalJDs = analyses.length;

  const matchScores = analyses.map(a => a.matchScore || 0);

  const avgMatch =
    matchScores.length > 0
      ? Math.round(
          matchScores.reduce((sum, s) => sum + s, 0) / matchScores.length
        )
      : 0;

  const bestMatch =
    matchScores.length > 0 ? Math.max(...matchScores) : 0;

  /* ---------- SKILL AGGREGATION ---------- */
  const matchedSkillsCount = {};
  const missingSkillsCount = {};
  
  analyses.forEach(a => {
    // Count matched skills
    if (a.skills?.matched && Array.isArray(a.skills.matched)) {
      a.skills.matched.forEach(skill => {
        const normalized = skill.toLowerCase().trim();
        matchedSkillsCount[normalized] = (matchedSkillsCount[normalized] || 0) + 1;
      });
    }
    
    // Count missing skills
    if (a.skills?.missing && Array.isArray(a.skills.missing)) {
      a.skills.missing.forEach(skill => {
        const normalized = skill.toLowerCase().trim();
        missingSkillsCount[normalized] = (missingSkillsCount[normalized] || 0) + 1;
      });
    }
  });

  // Sort by frequency and get top skills
  const topSkills = Object.entries(matchedSkillsCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([skill]) => skill.charAt(0).toUpperCase() + skill.slice(1));

  const skillGaps = Object.entries(missingSkillsCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([skill]) => skill.charAt(0).toUpperCase() + skill.slice(1));

  /* ---------- RECENT JD SNAPSHOTS ---------- */
  const recentJDs = analyses.slice(0, 5).map(a => ({
    id: a._id,
    role: a.role,
    company: a.company || "Unknown Company",
    experienceLevel: a.experienceLevel,
    matchScore: a.matchScore,
    createdAt: a.createdAt
  }));

  /* ---------- RESUME VERSION LIST ---------- */
  const resumeVersions = resumes.map(r => ({
    version: r.version,
    createdAt: r.createdAt,
    scoresSnapshot: r.scoresSnapshot || {}
  }));

  /* ---------- FINAL FRONTEND-CONTRACT RESPONSE ---------- */
  return {
    totalResumes,
    totalJDs,
    avgMatch,
    bestMatch,
    recentJDs,
    resumeVersions,
    topSkills,
    skillGaps
  };
}

module.exports = getDashboardData;
