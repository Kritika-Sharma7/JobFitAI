const ACTION_VERBS = [
  "built", "developed", "implemented", "optimized",
  "designed", "led", "improved", "integrated",
  "scaled", "automated", "refactored"
];

function detectActionVerbs(text) {
  const lower = text.toLowerCase();
  return ACTION_VERBS.filter(v => lower.includes(v));
}

function gradeBullet(bullet, jdKeywords = []) {
  const verbs = detectActionVerbs(bullet);
  const keywordHits = jdKeywords.filter(k =>
    bullet.toLowerCase().includes(k.toLowerCase())
  );

  if (verbs.length >= 1 && keywordHits.length >= 1) {
    return { grade: "strong", reason: "Uses action verb and JD keyword" };
  }

  if (verbs.length >= 1) {
    return { grade: "medium", reason: "Action verb present, weak JD alignment" };
  }

  return { grade: "weak", reason: "No strong action verb or JD skill" };
}

module.exports = {
  detectActionVerbs,
  gradeBullet
};
