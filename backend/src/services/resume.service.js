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

function normalizeExperienceLevel(exp) {
  if (!exp) return "Fresher";

  const normalized = exp
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace("–", "-");

  const map = {
    fresher: "Fresher",
    intern: "Intern",
    "0-2years": "1-3",
    "1-3": "1-3",
    "2-5years": "3+",
    "3+": "3+"
  };

  return map[normalized] || "Fresher";
}

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
  // Patterns to exclude (headers, skill lists, metadata)
  const excludePatterns = [
    /^(skills|education|experience|projects|certifications|summary|objective|contact|references|awards|languages|interests|hobbies)\s*:?$/i,
    /^(skills|technical skills|core competencies|technologies|tools|frameworks)\s*:?/i,
    /^(experience level|target role|location|email|phone|linkedin|github|portfolio)\s*:?/i,
    /^[a-z\s,]+$/i, // Just a list of words with commas (skill lists)
    /^[•\-\*]?\s*(react|javascript|python|html|css|node|git)[\s,]+/i, // Starts with tech skill list
    /^(\d{1,2}\/\d{1,2}\/\d{2,4}|\d{4}\s*[-–]\s*(present|\d{4}))$/i, // Date ranges
    /^\d+\s*(years?|months?)\s*(of)?\s*(experience)?$/i, // "3 years experience"
    /^(fresher|junior|senior|mid|lead|intern|entry.?level)$/i, // Single role words
    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i, // Email
    /^\+?[\d\s()-]{7,}$/, // Phone number
    /^https?:\/\//, // URLs
  ];

  // A good bullet point typically:
  // - Starts with an action verb or bullet character
  // - Has 8+ characters
  // - Contains a mix of words (not just skills)
  // - Describes an achievement or responsibility
  const isValidBullet = (line) => {
    if (line.length < 15) return false; // Too short
    if (excludePatterns.some(pattern => pattern.test(line))) return false;
    
    // Must have at least 3 words
    const words = line.split(/\s+/).filter(w => w.length > 1);
    if (words.length < 4) return false;
    
    // Should NOT be mostly comma-separated items (skill lists)
    const commaCount = (line.match(/,/g) || []).length;
    if (commaCount > 3 && words.length < commaCount * 2) return false;
    
    // Should contain some verbs or action words (heuristic)
    const hasActionStructure = /^[•\-\*]?\s*[A-Z]?[a-z]+(ed|ing|s)?\s+/i.test(line) ||
                              /\b(built|developed|created|designed|implemented|managed|led|achieved|improved|reduced|increased|collaborated|delivered|launched|optimized)\b/i.test(line);
    
    return hasActionStructure || line.length > 40; // Long lines are likely bullets
  };

  const extractedBullets = resumeText
    .split("\n")
    .map(line => line.trim().replace(/^[•\-\*]\s*/, '• ')) // Normalize bullet points
    .filter(isValidBullet)
    .slice(0, 8);

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
    experienceLevel: normalizeExperienceLevel(profile.experience),
    roles: [profile.targetRole],
    scoresSnapshot: {
      atsScore:null,//RS 31Dec
      matchScore,
      fitScore:null//RS 31Dec
    }
  });

  /* ---------- CREATE JD ANALYSIS SNAPSHOT ---------- */
  const analysisDoc = await JDAnalysis.create({
    userId,
    jdText: jobDescription,
    resumeText,
    resumeVersion: nextVersion,
    role: profile.targetRole,
    company: profile.company || "Unknown Company",
    experienceLevel: resumeDoc.experienceLevel,
    atsScore,
    matchScore,
    fitScore,
    skills: {
      matched,
      partial,
      missing
    },
    roadmapSnapshot: [] // can be filled later...IMPORTANT
  });

  /* ==========================================================
     ✅ FRONTEND RESPONSE (UNCHANGED SHAPE)
     ========================================================== */
  return {
    resumeId: resumeDoc._id,//RS 31Dec
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
