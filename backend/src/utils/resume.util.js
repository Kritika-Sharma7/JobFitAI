function extractSkills(text) {
  const SKILLS = ["React", "JavaScript", "TypeScript", "Redux"];
  return SKILLS.filter(s => text.toLowerCase().includes(s.toLowerCase()));
}

function extractKeywords(text) {
  return ["frontend", "components", "api"];
}

function extractActionVerbs(text) {
  return ["built", "optimized", "implemented"];
}

function normalizeResumeText(text) {
  return text
    .replace(/\s+/g, " ")
    .replace(/[^\x00-\x7F]/g, "")
    .trim();
}

function extractSkillsFromText(text) {
  const SKILLS = [
    "React",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "HTML",
    "CSS",
    "Redux",
    "Docker",
    "AWS"
  ];

  return SKILLS.filter(skill =>
    text.toLowerCase().includes(skill.toLowerCase())
  );
}

module.exports = { extractSkills, extractKeywords, extractActionVerbs,
  normalizeResumeText,extractSkillsFromText};
