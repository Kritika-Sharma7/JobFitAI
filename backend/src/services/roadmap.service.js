const Resume = require("../models/Resume.model");
const { compareSkills } = require("../utils/matching.util");

/**
 * Generate JD-aligned personalized roadmap
 */
async function generateRoadmapService({ jdId, userId }) {
  // 1️⃣ Fetch resume
  const resume = await Resume.findOne({ userId }).sort({ version: -1 });
  if (!resume) throw new Error("Resume not found");

  // 2️⃣ Fetch JD (mock now, DB later)
  const jd = mockJDById(jdId);

  // 3️⃣ Skill gap analysis
  const comparison = compareSkills(resume.parsedData.skills, jd.skills);

  // 4️⃣ Generate roadmap
  const roadmap = comparison.missing.map(skill => {
    const priority = jd.mustHave.includes(skill)
      ? "must_have"
      : "good_to_have";

    const difficulty = scaleDifficulty(skill, resume.experienceLevel);

    return {
      skill,
      priority,
      difficulty,
      learningPlan: generateLearningPlan(skill),
      project: generateProject(skill, difficulty)
    };
  });

  return {
    jdId,
    targetRole: jd.role,
    totalMissingSkills: roadmap.length,
    roadmap
  };
}

/* ---------------- HELPERS ---------------- */

function generateLearningPlan(skill) {
  return [
    `Learn ${skill} fundamentals`,
    `Build small hands-on exercises with ${skill}`,
    `Integrate ${skill} into a real project`
  ];
}

function generateProject(skill, difficulty) {
  return {
    title: `${skill} ${difficulty} Project`,
    description: `Build a ${difficulty}-level project using ${skill}`,
    outcome: `Demonstrates real-world usage of ${skill}`
  };
}

function scaleDifficulty(skill, experience) {
  if (experience === "Intern") return "Beginner";
  if (experience === "Fresher") return "Intermediate";
  return "Advanced";
}

/* ---------------- MOCK JD ---------------- */
function mockJDById(jdId) {
  return {
    id: jdId,
    role: "Frontend Developer",
    skills: ["React", "TypeScript", "Redux", "Docker", "AWS"],
    mustHave: ["React", "TypeScript", "Redux"]
  };
}

module.exports = generateRoadmapService;
