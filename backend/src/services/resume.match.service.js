// const Resume = require("../models/Resume.model");
// const JD = require("../models/JD.model");

// const {
//   compareSkills,
//   calculateMatchScore,
//   generateRecommendations
// } = require("../utils/matching.util");

// async function matchResumeWithJDService({ jdId, userId }) {

//   /* ---------- FETCH RESUME ---------- */
//   const resume = await Resume.findOne({ userId })
//     .sort({ createdAt: -1 });

//   if (!resume) {
//     throw new Error("Resume not found");
//   }

//   /* ---------- FETCH JD ---------- */
//   const jd = await JD.findById(jdId);

//   if (!jd) {
//     throw new Error("Job Description not found");
//   }

//   /* ---------- MATCHING ---------- */
//   const comparison = compareSkills(
//     resume.parsedData.skills, // [{ name, confidence }]
//     jd.skills                 // ["React", "JS", ...]
//   );

//   const matchScore = calculateMatchScore(comparison);
//   const recommendations = generateRecommendations(comparison.missing);

//   /* ---------- FINAL RESPONSE ---------- */
//   return {
//     matchScore,
//     skillComparison: comparison,
//     recommendations
//   };
// }

// module.exports = matchResumeWithJDService;


const Resume = require("../models/Resume.model");
const JobDescription = require("../models/JobDescription");

const {
  compareSkills,
  calculateMatchScore,
  generateRecommendations
} = require("../utils/matching.util");

async function matchResumeWithJDService({ jdId, userId }) {
  /* ---------- FETCH RESUME ---------- */
  const resume = await Resume.findOne({ userId }).sort({ version: -1 });

  if (!resume) {
    throw new Error("Resume not found");
  }

  if (!resume.parsedData || !resume.parsedData.skills) {
    throw new Error("Resume skills not parsed");
  }

  /* ---------- FETCH JD ---------- */
  const jd = await JobDescription.findById(jdId);

  if (!jd) {
    throw new Error("Job Description not found");
  }

  if (!jd.skills || jd.skills.length === 0) {
    throw new Error("JD skills not extracted");
  }

  /* ---------- MATCHING ---------- */
  const comparison = compareSkills(
    resume.parsedData.skills, // [{ name, confidence }]
    jd.skills                 // ["React", "JavaScript", ...]
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

module.exports = matchResumeWithJDService;



