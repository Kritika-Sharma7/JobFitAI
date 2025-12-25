/* =======================
   REALISTIC FIT SCORE ENGINE
   ======================= */

function calculateFitScore(parsed, experience) {
  let skillsScore = 0;
  let keywordsScore = 0;
  let experienceScore = 0;
  let bonusScore = 0;

  /* ---------- SKILLS SCORE (MAX 40) ---------- */
  const mustHaveCount = parsed.skills?.must_have?.length || 0;
  const goodToHaveCount = parsed.skills?.good_to_have?.length || 0;

  skillsScore += mustHaveCount * 8;     // strong signal
  skillsScore += goodToHaveCount * 3;   // supporting signal

  skillsScore = clamp(skillsScore, 0, 40);

  /* ---------- KEYWORDS SCORE (MAX 25) ---------- */
  const keywordCount = parsed.keywords?.length || 0;
  keywordsScore = clamp(keywordCount * 5, 0, 25);

  /* ---------- EXPERIENCE SCORE (MAX 20) ---------- */
  switch (experience) {
    case "Intern":
      experienceScore = 8;
      break;
    case "Fresher":
      experienceScore = 14;
      break;
    case "1-3":
      experienceScore = 20;
      break;
    default:
      experienceScore = 10; // unknown or mismatched
  }

  /* ---------- BONUS SCORE (MAX 7) ---------- */
  if (mustHaveCount >= 5) bonusScore += 4;
  if ((parsed.responsibilities?.length || 0) >= 3) bonusScore += 3;

  bonusScore = clamp(bonusScore, 0, 7);

  /* ---------- FINAL SCORE (HARD CAP @ 92) ---------- */
  const rawTotal =
    skillsScore +
    keywordsScore +
    experienceScore +
    bonusScore;

  const finalScore = clamp(rawTotal, 0, 92); // NEVER 100

  return {
    fitScore: finalScore,
    breakdown: {
      skills: skillsScore,
      keywords: keywordsScore,
      experience: experienceScore,
      bonus: bonusScore
    }
  };
}

/* ---------- UTIL ---------- */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

module.exports = { calculateFitScore };
