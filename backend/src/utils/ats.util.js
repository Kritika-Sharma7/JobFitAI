const JD_SKILLS = [
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

function extractJDSkills(jd) {
  return JD_SKILLS.filter(skill =>
    jd.toLowerCase().includes(skill.toLowerCase())
  );
}

module.exports = {
  extractJDSkills
};
