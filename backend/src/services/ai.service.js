// const { analyzeJDWithOpenAI } = require("./openai.service");
// const { calculateFitScore } = require("../utils/scoring.util");

// /* ================= CORE SERVICE ================= */
// async function analyzeJDService(jd, role, experience) {
//   const parsed = await analyzeJDWithOpenAI(jd, role, experience);

//   const scoreData = calculateFitScore(parsed, experience);

//   return {
//     role: {
//       title: parsed.roleDetected,
//       level: mapExperienceLevel(parsed.experienceDetected),
//       techStack: [
//         ...parsed.skills.must_have,
//         ...parsed.skills.good_to_have
//       ]
//     },

//     fitScore: scoreData.fitScore,
//     scoreBreakdown: scoreData.breakdown,

//     skills: normalizeSkills(parsed.skills)
//     //removed for openai
//     projects: generateFrontendProjects(parsed.skills.must_have),

//     resumeBullets: generateResumeBullets(parsed.skills.must_have)
//   };
// }

// /* ================= HELPERS ================= */

// function mapExperienceLevel(exp) {
//   if (exp === "Intern") return "Intern";
//   if (exp === "Fresher") return "Entry-Level";
//   if (exp === "1-3") return "Mid-Level";
//   return "Unknown";
// }

// function normalizeSkills(skills) {
//   const formatted = [];

//   skills.must_have.forEach(skill => {
//     formatted.push({ name: skill, category: "must_have" });
//   });

//   skills.good_to_have.forEach(skill => {
//     formatted.push({ name: skill, category: "good_to_have" });
//   });

//   skills.missing.forEach(skill => {
//     formatted.push({ name: skill, category: "missing_high" });
//   });

//   return formatted;
// }


// function generateFrontendProjects(skills) {
//   return skills.slice(0, 2).map(skill => ({
//     title: `${skill} Frontend Project`,
//     skillsProved: [skill, "REST APIs"],
//     jdMapping: [
//       "Build reusable components",
//       "Integrate REST APIs"
//     ]
//   }));
// }

// function generateResumeBullets(skills) {
//   return skills.map(skill => ({
//     original: `Worked with ${skill}`,
//     optimized: `Built production-grade features using ${skill} aligned with frontend role requirements`
//   }));
// }



// module.exports = analyzeJDService;


//=====================================================

const {
  analyzeJDWithOpenAI,
  rewriteResumeBulletsWithOpenAI,
  generateJDMatchedProjectsWithOpenAI
} = require("./openai.service");

const { calculateFitScore } = require("../utils/scoring.util");

/* =====================================================
   CORE AI-POWERED JD ANALYSIS SERVICE
   ===================================================== */

async function analyzeJDService(jd, role, experience) {
  /* ---------- STEP 1: JD PARSING (OpenAI) ---------- */
  const parsed = await analyzeJDWithOpenAI(jd, role, experience);

  /* ---------- STEP 2: SCORE CALCULATION (Deterministic) ---------- */
  const scoreData = calculateFitScore(parsed, experience);

  /* ---------- STEP 3: AI RESUME BULLET REWRITE ---------- */
  const baseBullets = parsed.skills.must_have.map(
    skill => `Worked with ${skill}`
  );

  const aiBullets = await rewriteResumeBulletsWithOpenAI({
    bullets: baseBullets,
    jobDescription: jd,
    role,
    experience
  });

  /* ---------- STEP 4: AI JD-MATCHED PROJECT IDEAS ---------- */
  const aiProjects = await generateJDMatchedProjectsWithOpenAI({
    jdSkills: [
      ...parsed.skills.must_have,
      ...parsed.skills.good_to_have
    ],
    missingSkills: parsed.skills.missing,
    role,
    experience
  });

  /* ---------- FINAL RESPONSE (FRONTEND SAFE) ---------- */
  return {
    role: {
      title: parsed.roleDetected,
      level: normalizeExperienceLevel(parsed.experienceDetected),
      techStack: [
        ...parsed.skills.must_have,
        ...parsed.skills.good_to_have
      ]
    },

    fitScore: scoreData.fitScore,
    scoreBreakdown: scoreData.breakdown,

    skills: normalizeSkills(parsed.skills),

    // 🔥 AI Outputs (dynamic, non-hardcoded)
    resumeBullets: aiBullets,
    projects: aiProjects
  };
}

/* =====================================================
   HELPERS (FUTURE-PROOF)
   ===================================================== */

function normalizeExperienceLevel(exp) {
  if (!exp) return "Unknown";

  const normalized = exp.toLowerCase();

  if (normalized.includes("intern")) return "Intern";
  if (
    normalized.includes("fresher") ||
    normalized.includes("entry")
  )
    return "Entry-Level";
  if (
    normalized.includes("0-2") ||
    normalized.includes("1-3")
  )
    return "Mid-Level";
  if (
    normalized.includes("5") ||
    normalized.includes("senior")
  )
    return "Senior";

  return "Unknown";
}

function normalizeSkills(skills) {
  const formatted = [];

  skills.must_have.forEach(skill => {
    formatted.push({ name: skill, category: "must_have" });
  });

  skills.good_to_have.forEach(skill => {
    formatted.push({ name: skill, category: "good_to_have" });
  });

  skills.missing.forEach(skill => {
    formatted.push({ name: skill, category: "missing_high" });
  });

  return formatted;
}

module.exports = analyzeJDService;



