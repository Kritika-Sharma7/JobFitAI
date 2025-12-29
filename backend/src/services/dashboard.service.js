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

  /* ---------- RECENT JD SNAPSHOTS ---------- */
  const recentJDs = analyses.slice(0, 5).map(a => ({
    id: a._id,
    role: a.role,
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
    resumeVersions
  };
}

module.exports = getDashboardData;
