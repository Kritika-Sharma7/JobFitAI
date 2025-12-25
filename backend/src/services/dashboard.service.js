const Resume = require("../models/Resume.model");
const JDMatch = require("../models/JDMatch.model");

async function getDashboardData({ userId }) {

  /* ---------- PARALLEL QUERIES ---------- */
  const [
    resumes,
    jdMatches
  ] = await Promise.all([
    Resume.find({ userId }).sort({ createdAt: -1 }),
    JDMatch.find({ userId }).sort({ createdAt: -1 })
  ]);

  /* ---------- STATS ---------- */
  const totalResumes = resumes.length;
  const totalJDAnalyzed = jdMatches.length;

  const scores = jdMatches.map(j => j.matchScore);
  const averageMatchScore =
    scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;

  const bestMatchScore = scores.length > 0 ? Math.max(...scores) : 0;

  /* ---------- RECENT SNAPSHOTS ---------- */
  const recentResumes = resumes.slice(0, 3).map(r => ({
    version: r.version,
    createdAt: r.createdAt,
    skillsCount: r.parsedData?.skills?.length || 0
  }));

  const recentJDMatches = jdMatches.slice(0, 5).map(j => ({
    jdId: j.jdId,
    matchScore: j.matchScore,
    verdict: j.verdict,
    createdAt: j.createdAt
  }));

  return {
    stats: {
      totalResumes,
      totalJDAnalyzed,
      averageMatchScore,
      bestMatchScore
    },
    recentResumes,
    recentJDMatches
  };
}

module.exports = getDashboardData;
