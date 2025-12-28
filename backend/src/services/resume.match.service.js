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
  const resume = await Resume.findOne({ userId }).sort({ version: -1 });
  if (!resume) throw new Error("Resume not found");

  const jd = await JobDescription.findById(jdId);
  if (!jd) throw new Error("JD not found");

  const comparison = compareSkills(
    resume.parsedData.skills,
    jd.skills
  );

  const matchScore = calculateMatchScore(comparison);
  const recommendations = generateRecommendations(comparison.missing);

  return {
    matchScore,
    skillComparison: comparison,
    recommendations
  };
}

module.exports = matchResumeWithJDService;




