// const { extractSkillsFromText } = require("../utils/resume.util");
// const { extractJDSkills } = require("../utils/ats.util");
// const { calculateMatchScore } = require("../utils/matching.util");

// async function analyzeResumeService({ resume, profile, jobDescription }) {
//   const resumeText = resume.text || "";

//   const resumeSkills = extractSkillsFromText(resumeText).map(skill => ({
//     name: skill,
//     confidence: 0.7
//   }));

//   const jdSkills = extractJDSkills(jobDescription);

//   const matched = [];
//   const partial = [];
//   const missing = [];

//   jdSkills.forEach(skill => {
//     const found = resumeSkills.find(
//       rs => rs.name.toLowerCase() === skill.toLowerCase()
//     );

//     if (found && found.confidence >= 0.6) matched.push(skill);
//     else if (found) partial.push(skill);
//     else missing.push(skill);
//   });

//   const matchScore = calculateMatchScore({
//     matched,
//     partial,
//     missing
//   });

//   return {
//     parsedData: {
//       skills: resumeSkills
//     },
//     matchScore,
//     skillComparison: { matched, partial, missing }
//   };
// }

// module.exports = analyzeResumeService;


//=====================================================

const { extractSkillsFromText } = require("../utils/resume.util");
const { extractJDSkills } = require("../utils/ats.util");
const { calculateMatchScore } = require("../utils/matching.util");
const {
  rewriteResumeBulletsWithOpenAI
} = require("./openai.service");

/* ================= RESUME ANALYSIS SERVICE ================= */
async function analyzeResumeService({ resume, profile, jobDescription }) {
  const resumeText = resume.text || "";

  /* ---------- SKILL EXTRACTION ---------- */
  const resumeSkills = extractSkillsFromText(resumeText).map(skill => ({
    name: skill,
    confidence: 0.7
  }));

  const jdSkills = extractJDSkills(jobDescription);

  /* ---------- SKILL MATCHING ---------- */
  const matched = [];
  const partial = [];
  const missing = [];

  jdSkills.forEach(skill => {
    const found = resumeSkills.find(
      rs => rs.name.toLowerCase() === skill.toLowerCase()
    );

    if (found && found.confidence >= 0.6) matched.push(skill);
    else if (found) partial.push(skill);
    else missing.push(skill);
  });

  const matchScore = calculateMatchScore({
    matched,
    partial,
    missing
  });

  /* ---------- EXTRACT BULLETS FROM RESUME ---------- */
  const extractedBullets = resumeText
    .split("\n")
    .map(line => line.trim())
    .filter(line =>
      line.length > 6 &&
      !line.toLowerCase().includes("education") &&
      !line.toLowerCase().includes("skills")
    )
    .slice(0, 6); // safety cap

  /* ---------- AI BULLET REWRITE (JD-OPTIMIZED) ---------- */
  const rewrittenBullets =
    extractedBullets.length > 0
      ? await rewriteResumeBulletsWithOpenAI({
          bullets: extractedBullets,
          jobDescription,
          role: profile.targetRole,
          experience: profile.experience
        })
      : [];

  /* ---------- RESPONSE (FRONTEND SAFE) ---------- */
  return {
    parsedData: {
      skills: resumeSkills
    },

    matchScore,

    skillComparison: {
      matched,
      partial,
      missing
    },

    // 🔥 REAL AI OUTPUT
    resumeBullets: rewrittenBullets
  };
}

module.exports = analyzeResumeService;
