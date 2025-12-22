/* =======================
   Fit Score Calculation
   ======================= */

function calculateFitScore(parsed, experience) {
  let skillsScore = 0;
  let keywordsScore = 0;
  let experienceScore = 0;
  let bonus = 0;

  /* ---------- SKILLS SCORE (MAX 40) ---------- */
  const mustHaveCount = parsed.skills?.must_have?.length || 0;
  const goodToHaveCount = parsed.skills?.good_to_have?.length || 0;

  skillsScore += mustHaveCount * 8;      // strong weight
  skillsScore += goodToHaveCount * 3;    // lighter weight

  skillsScore = Math.min(skillsScore, 40);

  /* ---------- KEYWORDS SCORE (MAX 25) ---------- */
  const keywordCount = parsed.keywords?.length || 0;
  keywordsScore = Math.min(keywordCount * 5, 25);

  /* ---------- EXPERIENCE SCORE (MAX 20) ---------- */
  if (experience === "Intern") experienceScore = 8;
  if (experience === "Fresher") experienceScore = 14;
  if (experience === "1-3") experienceScore = 20;

  /* ---------- BONUS (MAX 7) ---------- */
  if (mustHaveCount >= 5) bonus += 4;
  if (parsed.responsibilities?.length > 3) bonus += 3;

  bonus = Math.min(bonus, 7);

  /* ---------- FINAL SCORE (HARD CAP @ 92) ---------- */
  const total = clamp(
    skillsScore + keywordsScore + experienceScore + bonus,
    0,
    92
  );

  return {
    fitScore: total,
    breakdown: {
      skills: skillsScore,
      keywords: keywordsScore,
      experience: experienceScore,
      bonus
    }
  };
}

/* ---------- Utility ---------- */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

module.exports = { calculateFitScore };
