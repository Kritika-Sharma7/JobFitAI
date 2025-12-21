const SKILLS_DB = [
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "JavaScript",
  "HTML",
  "CSS",
  "Git"
];

// TODO: Replace rule-based JD analysis with OpenAI embeddings

function analyzeJDService(jobDescription, role, experience) {
  const jdLower = jobDescription.toLowerCase();

  // Detect skills
  const detectedSkillsRaw = SKILLS_DB.filter(skill =>
    jdLower.includes(skill.toLowerCase())
  );

  // (C) Remove duplicate skills
  const detectedSkills = [...new Set(detectedSkillsRaw)];

  const missingSkills = SKILLS_DB.filter(
    skill => !detectedSkills.includes(skill)
  );

  const projects = detectedSkills.length
    ? [`${role || "Developer"} Project using ${detectedSkills.join(", ")}`]
    : ["Build a basic MERN application"];

  const resumePoints = detectedSkills.map(
    skill => `Hands-on experience with ${skill}`
  );

  // (B) Very short JD → low match score
  let matchScore = Math.min(detectedSkills.length * 15, 100);

  if (jobDescription.length < 30) {
    matchScore = 10;
  }

  return {
    skills: detectedSkills,
    missingSkills,
    projects,
    resumePoints,
    matchScore
  };
}

module.exports = analyzeJDService;