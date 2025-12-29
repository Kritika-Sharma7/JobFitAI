// const { extractJDSkills } = require("../utils/ats.util");
// const { detectActionVerbs, gradeBullet } = require("../utils/ats.analysis.util");

// /* ---------- EXPERIENCE NORMALIZER ---------- */
// function normalizeExperience(exp) {
//   if (!exp) return "";

//   return exp
//     .toLowerCase()
//     .replace(/–/g, "-") 
//     .replace(/\s+/g, " ")
//     .trim();
// }

// function calculateATSScore({ resumeText, jobDescription, experience }) {
//   const jdSkills = extractJDSkills(jobDescription);

//   /* ---------- KEYWORD SCORE ---------- */
//   const keywordHits = jdSkills.filter(skill =>
//     resumeText.toLowerCase().includes(skill.toLowerCase())
//   );
//   const keywordScore = Math.min(keywordHits.length * 7, 35);

//   /* ---------- ACTION VERB SCORE (PER BULLET) ---------- */
//   const bullets = resumeText
//     .split("\n")
//     .map(b => b.trim())
//     .filter(Boolean);

//   const bulletsWithActionVerb = bullets.filter(
//     bullet => detectActionVerbs(bullet).length > 0
//   ).length;

//   const actionVerbScore = Math.min(bulletsWithActionVerb * 4, 25);

//   /* ---------- STRUCTURE SCORE ---------- */
//   const structureScore = bullets.length >= 5 ? 15 : 8;

//   /* ---------- EXPERIENCE SCORE ---------- */
//   const normalizedExp = normalizeExperience(experience);
//   let experienceScore = 0;

//   switch (normalizedExp) {
//     case "fresher":
//       experienceScore = 6;
//       break;

//     case "0-2 years":
//       experienceScore = 8;
//       break;

//     case "2-5 years":
//       experienceScore = 12;
//       break;

//     case "5+ years":
//       experienceScore = 15;
//       break;

//     default:
//       experienceScore = 0;
//   }

//   /* ---------- FINAL SCORE (CAP @ 92) ---------- */
//   const total = Math.min(
//     keywordScore +
//       actionVerbScore +
//       structureScore +
//       experienceScore,
//     92
//   );

//   return {
//     atsScore: total,
//     breakdown: {
//       keywords: keywordScore,
//       actionVerbs: actionVerbScore,
//       structure: structureScore,
//       experience: experienceScore
//     }
//   };
// }

// function analyzeBullets(bullets, jobDescription) {
//   const jdSkills = extractJDSkills(jobDescription);

//   return bullets.map(bullet => {
//     const analysis = gradeBullet(bullet, jdSkills);
//     return {
//       text: bullet,
//       grade: analysis.grade,
//       reason: analysis.reason
//     };
//   });
// }

// /* ---------- BULLET IMPROVEMENT (STUB) ---------- */
// function improveResumeBullet(bullet, role) {
//   return {
//     original: bullet,
//     optimized: `Built production-grade ${
//       role || "frontend"
//     } features using scalable architecture, clean code practices, and performance optimizations`
//   };
// }


// module.exports = {
//   calculateATSScore,
//   analyzeBullets,
//   improveResumeBullet
// };


const { extractJDSkills } = require("../utils/ats.util");
const {
  detectActionVerbs,
  gradeBullet
} = require("../utils/ats.analysis.util");

/* ---------- EXPERIENCE NORMALIZER ---------- */
function normalizeExperience(exp) {
  if (!exp) return "";

  return exp
    .toLowerCase()
    .replace(/–/g, "-")     // handle en-dash
    .replace(/\s+/g, " ")  // normalize spaces
    .trim();
}

/* ---------- ATS SCORE CALCULATOR ---------- */
function calculateATSScore({ resumeText, jobDescription, experience }) {
  const jdSkills = extractJDSkills(jobDescription);

  /* ---------- KEYWORD SCORE ---------- */
  const keywordHits = jdSkills.filter(skill =>
    resumeText.toLowerCase().includes(skill.toLowerCase())
  );
  const keywordScore = Math.min(keywordHits.length * 7, 35);

  /* ---------- ACTION VERB SCORE ---------- */
  const bullets = resumeText
    .split("\n")
    .map(b => b.trim())
    .filter(Boolean);

  const bulletsWithActionVerb = bullets.filter(
    bullet => detectActionVerbs(bullet).length > 0
  ).length;

  const actionVerbScore = Math.min(bulletsWithActionVerb * 4, 25);

  /* ---------- STRUCTURE SCORE ---------- */
  const structureScore = bullets.length >= 5 ? 15 : 8;

  /* ---------- EXPERIENCE SCORE (FIXED) ---------- */
  const normalizedExp = normalizeExperience(experience);
  let experienceScore = 0;

  if (normalizedExp === "fresher") {
    experienceScore = 6;
  } else if (normalizedExp.startsWith("0-2")) {
    experienceScore = 8;
  } else if (normalizedExp.startsWith("2-5")) {
    experienceScore = 12;
  } else if (normalizedExp.startsWith("5+")) {
    experienceScore = 15;
  }

  /* ---------- FINAL SCORE (CAP @ 92) ---------- */
  const total = Math.min(
    keywordScore +
      actionVerbScore +
      structureScore +
      experienceScore,
    92
  );

  return {
    atsScore: total,
    breakdown: {
      keywords: keywordScore,
      actionVerbs: actionVerbScore,
      structure: structureScore,
      experience: experienceScore
    }
  };
}

/* ---------- BULLET ANALYSIS ---------- */
function analyzeBullets(bullets, jobDescription) {
  const jdSkills = extractJDSkills(jobDescription);

  return bullets.map(bullet => {
    const analysis = gradeBullet(bullet, jdSkills);
    return {
      text: bullet,
      grade: analysis.grade,
      reason: analysis.reason
    };
  });
}

/* ---------- BULLET IMPROVEMENT {REMOVED THE BELOW CODE FOR OPENAI}---------- */
// function improveResumeBullet(bullet, role) {
//   return {
//     original: bullet,
//     optimized: `Built production-grade ${
//       role || "frontend"
//     } features using scalable architecture, clean code practices, and performance optimizations`
//   };
// }

module.exports = {
  calculateATSScore,
  analyzeBullets,
};
