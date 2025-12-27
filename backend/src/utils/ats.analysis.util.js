const ACTION_VERBS = [
  "built", "developed", "implemented", "optimized",
  "designed", "led", "improved", "integrated",
  "scaled", "automated", "refactored", "performed", "analyzed",
  "created", "managed", "executed", "collaborated",
  "streamlined", "deployed", "tested", "documented",
  "orchestrated", "spearheaded", "facilitated", "mentored",
  "innovated", "transformed", "engineered", "upgraded",
  "customized", "troubleshot", "monitored", "configured"
];

function detectActionVerbs(text) {
  const lower = text.toLowerCase();
  return ACTION_VERBS.filter(v => lower.includes(v));
}

/**
 * Grade a single bullet
 * Strong  = action verb + JD keyword
 * Medium  = action verb only
 * Weak    = neither
 */
function gradeBullet(bullet, jdKeywords = []) {
  const verbs = detectActionVerbs(bullet);
  const keywordHits = jdKeywords.filter(k =>
    bullet.toLowerCase().includes(k.toLowerCase())
  );

  if (verbs.length > 0 && keywordHits.length > 0) {
    return {
      grade: "strong",
      reason: "Uses action verb and JD keyword"
    };
  }

  if (verbs.length > 0) {
    return {
      grade: "medium",
      reason: "Action verb present, but weak JD alignment"
    };
  }

  return {
    grade: "weak",
    reason: "Lacks strong action verb or JD keyword"
  };
}

module.exports = {
  detectActionVerbs,
  gradeBullet
};
