// const { extractSkillsFromText } = require("../utils/resume.util");
// const { extractJDSkills } = require("../utils/ats.util");
// const { calculateMatchScore } = require("../utils/matching.util");
// const {
//   rewriteResumeBulletsWithOpenAI
// } = require("./openai.service");

// /* ================= RESUME ANALYSIS SERVICE ================= */
// async function analyzeResumeService({ resume, profile, jobDescription }) {
//   const resumeText = resume.text || "";

//   /* ---------- SKILL EXTRACTION ---------- */
//   const resumeSkills = extractSkillsFromText(resumeText).map(skill => ({
//     name: skill,
//     confidence: 0.7
//   }));

//   const jdSkills = extractJDSkills(jobDescription);

//   /* ---------- SKILL MATCHING ---------- */
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

//   /* ---------- EXTRACT BULLETS FROM RESUME ---------- */
//   const extractedBullets = resumeText
//     .split("\n")
//     .map(line => line.trim())
//     .filter(line =>
//       line.length > 6 &&
//       !line.toLowerCase().includes("education") &&
//       !line.toLowerCase().includes("skills")
//     )
//     .slice(0, 6); // safety cap

//   /* ---------- AI BULLET REWRITE (JD-OPTIMIZED) ---------- */
//   const rewrittenBullets =
//     extractedBullets.length > 0
//       ? await rewriteResumeBulletsWithOpenAI({
//           bullets: extractedBullets,
//           jobDescription,
//           role: profile.targetRole,
//           experience: profile.experience
//         })
//       : [];

//   /* ---------- RESPONSE (FRONTEND SAFE) ---------- */
//   return {
//     parsedData: {
//       skills: resumeSkills
//     },

//     matchScore,

//     skillComparison: {
//       matched,
//       partial,
//       missing
//     },

//     // 🔥 REAL AI OUTPUT
//     resumeBullets: rewrittenBullets
//   };
// }

// module.exports = analyzeResumeService;


//==============Modified code 29 Dec Phase 5 ================
const { extractSkillsFromText } = require("../utils/resume.util");
const { extractJDSkills } = require("../utils/ats.util");
const { calculateMatchScore } = require("../utils/matching.util");
const {
  rewriteResumeBulletsWithOpenAI
} = require("./openai.service");

const Resume = require("../models/Resume.model");
const JDAnalysis = require("../models/JDAnalysis.model");

/* ================= RESUME ANALYSIS SERVICE ================= */
async function analyzeResumeService({ resume, profile, jobDescription, userId }) {
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

  /* ---------- EXTRACT BULLETS ---------- */
  const extractedBullets = resumeText
    .split("\n")
    .map(line => line.trim())
    .filter(
      line =>
        line.length > 6 &&
        !line.toLowerCase().includes("education") &&
        !line.toLowerCase().includes("skills")
    )
    .slice(0, 6);

  /* ---------- AI BULLET REWRITE ---------- */
  const rewrittenBullets =
    extractedBullets.length > 0
      ? await rewriteResumeBulletsWithOpenAI({
          bullets: extractedBullets,
          jobDescription,
          role: profile.targetRole,
          experience: profile.experience
        })
      : [];

  /* ==========================================================
     🔒 PHASE 5 — PERSISTENCE (ADDITIVE, SAFE)
     ========================================================== */

  /* ---------- CREATE RESUME VERSION ---------- */
  const lastResume = await Resume.findOne({ userId }).sort({ version: -1 });
  const nextVersion = lastResume ? lastResume.version + 1 : 1;

  const atsScore = matchScore; // placeholder if you add ATS later
  const fitScore = matchScore; // placeholder for now

  const resumeDoc = await Resume.create({
    userId,
    version: nextVersion,
    text: resumeText,
    parsedData: {
      skills: resumeSkills
    },
    experienceLevel: profile.experience,
    roles: [profile.targetRole],
    scoresSnapshot: {
      atsScore,
      matchScore,
      fitScore
    }
  });

  /* ---------- CREATE JD ANALYSIS SNAPSHOT ---------- */
  const analysisDoc = await JDAnalysis.create({
    userId,
    jdText: jobDescription,
    resumeText,
    resumeVersion: nextVersion,
    role: profile.targetRole,
    experienceLevel: resumeDoc.experienceLevel,
    atsScore,
    matchScore,
    fitScore,
    skills: {
      matched,
      partial,
      missing
    },
    roadmapSnapshot: [] // can be filled later
  });

  /* ==========================================================
     ✅ FRONTEND RESPONSE (UNCHANGED SHAPE)
     ========================================================== */
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

    resumeBullets: rewrittenBullets,

    analysisId: analysisDoc._id,
    resumeVersion: nextVersion
  };
}

module.exports = analyzeResumeService;
