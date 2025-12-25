const { extractJDSkills } = require("../utils/ats.util");
const { detectActionVerbs, gradeBullet } = require("../utils/ats.analysis.util");

function calculateATSScore({ resumeText, jobDescription, experience }) {
  const jdSkills = extractJDSkills(jobDescription);

  /* ---------- KEYWORD SCORE ---------- */
  const keywordHits = jdSkills.filter(skill =>
    resumeText.toLowerCase().includes(skill.toLowerCase())
  );
  const keywordScore = Math.min(keywordHits.length * 7, 35);

  /* ---------- ACTION VERB SCORE ---------- */
  const verbs = detectActionVerbs(resumeText);
  const actionVerbScore = Math.min(verbs.length * 5, 25);

  /* ---------- STRUCTURE SCORE ---------- */
  const bulletCount = resumeText.split("\n").length;
  const structureScore = bulletCount >= 5 ? 15 : 8;

  /* ---------- EXPERIENCE SCORE ---------- */
  let experienceScore = 0;
  if (experience === "1-3") experienceScore = 10;
  if (experience === "3+") experienceScore = 15;

  /* ---------- FINAL SCORE (CAP 92) ---------- */
  const total = Math.min(
    keywordScore + actionVerbScore + structureScore + experienceScore,
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

/**
 * Resume bullet improvement (stub for OpenAI later)
 */
function improveResumeBullet(bullet, role) {
  return {
    original: bullet,
    optimized: `Built production-grade ${role || "frontend"} features using scalable architecture, clean code practices, and performance optimizations`
  };
}


module.exports = {
  calculateATSScore,
  analyzeBullets,
  improveResumeBullet
};

