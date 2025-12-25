function compareSkills(resumeSkills = [], jdSkills = []) {
  const matched = [];
  const partial = [];
  const missing = [];

  jdSkills.forEach(skill => {
    const found = resumeSkills.find(rs =>
      rs.name.toLowerCase() === skill.toLowerCase()
    );

    if (found && found.confidence >= 0.6) {
      matched.push(skill);
    } else if (found) {
      partial.push(skill);
    } else {
      missing.push(skill);
    }
  });

  return { matched, partial, missing };
}

function calculateMatchScore({ matched, partial, missing }) {
  let score = 0;

  score += matched.length * 12;
  score += partial.length * 6;

  // Penalty for missing
  score -= missing.length * 4;

  return clamp(score, 0, 92);
}

function generateRecommendations(missingSkills) {
  return missingSkills.slice(0, 3).map(skill => ({
    skill,
    action: `Learn ${skill} to improve your match score`
  }));
}

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

module.exports = {
  compareSkills,
  calculateMatchScore,
  generateRecommendations
};
