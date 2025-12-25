const Resume = require("../models/Resume.model");
// const JD = require("../models/JD.model"); // optional later

const {
  compareSkills,
  calculateMatchScore,
  generateRecommendations
} = require("../utils/matching.util");

async function matchResumeWithJDService({ jdId, userId }) {

  /* ---------- FETCH DATA ---------- */

  // 🔹 Latest resume
  const resume = await Resume.findOne({ userId })
    .sort({ version: -1 });

  if (!resume) {
    throw new Error("Resume not found");
  }

  // 🔹 MOCK JD (replace with DB later)
  const jd = mockJDById(jdId);

  /* ---------- MATCHING ---------- */

  const comparison = compareSkills(
    resume.parsedData.skills,
    jd.skills
  );

  const matchScore = calculateMatchScore(comparison);

  const recommendations = generateRecommendations(comparison.missing);

  /* ---------- FINAL RESPONSE ---------- */
  return {
    matchScore,
    skillComparison: comparison,
    recommendations
  };
}

/* ---------- TEMP MOCK ---------- */
function mockJDById(jdId) {
  return {
    id: jdId,
    skills: [
      "React",
      "JavaScript",
      "TypeScript",
      "Redux",
      "Docker",
      "AWS"
    ]
  };
}

module.exports = matchResumeWithJDService;
