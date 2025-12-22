// const { analyzeJDWithOpenAI } = require("./openai.service");
// const { calculateFitScore } = require("../utils/scoring.util");

// async function analyzeJDService(jd, role, experience) {
//   const parsed = await analyzeJDWithOpenAI(jd, role, experience);

//   const scoreData = calculateFitScore(parsed, experience);

//   return {
//     roleDetected: parsed.roleDetected,
//     experienceDetected: parsed.experienceDetected,
//     skills: parsed.skills,
//     projects: generateProjects(parsed.skills.must_have),
//     resumePoints: generateResumePoints(parsed.skills.must_have),
//     fitScore: scoreData.fitScore,
//     scoreBreakdown: scoreData.breakdown
//   };
// }

// function generateProjects(skills) {
//   return skills.slice(0, 2).map(skill => ({
//     title: `${skill} Based Project`,
//     why: [
//       `Matches JD requirement for ${skill}`,
//       "Demonstrates real-world application"
//     ]
//   }));
// }

// function generateResumePoints(skills) {
//   return skills.map(skill => 
//     `Hands-on experience using ${skill} in production-level projects`
//   );
// }

// module.exports = analyzeJDService;




//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------

const { analyzeJDWithOpenAI } = require("./openai.service");
const { calculateFitScore } = require("../utils/scoring.util");

/* ================= CORE SERVICE ================= */
async function analyzeJDService(jd, role, experience) {
  const parsed = await analyzeJDWithOpenAI(jd, role, experience);

  const scoreData = calculateFitScore(parsed, experience);

  return {
    role: {
      title: parsed.roleDetected,
      level: mapExperienceLevel(parsed.experienceDetected),
      techStack: [
        ...parsed.skills.must_have,
        ...parsed.skills.good_to_have
      ]
    },

    fitScore: scoreData.fitScore,
    scoreBreakdown: scoreData.breakdown,

    skills: normalizeSkills(parsed.skills),

    projects: generateFrontendProjects(parsed.skills.must_have),

    resumeBullets: generateResumeBullets(parsed.skills.must_have)
  };
}

/* ================= HELPERS ================= */

function mapExperienceLevel(exp) {
  if (exp === "Intern") return "Intern";
  if (exp === "Fresher") return "Entry-Level";
  if (exp === "1-3") return "Mid-Level";
  return "Unknown";
}

function normalizeSkills(skills) {
  const formatted = [];

  skills.must_have.forEach(skill => {
    formatted.push({ name: skill, category: "must_have" });
  });

  skills.good_to_have.forEach(skill => {
    formatted.push({ name: skill, category: "good_to_have" });
  });

  skills.missing.forEach(skill => {
    formatted.push({ name: skill, category: "missing_high" });
  });

  return formatted;
}

function generateFrontendProjects(skills) {
  return skills.slice(0, 2).map(skill => ({
    title: `${skill} Frontend Project`,
    skillsProved: [skill, "REST APIs"],
    jdMapping: [
      "Build reusable components",
      "Integrate REST APIs"
    ]
  }));
}

function generateResumeBullets(skills) {
  return skills.map(skill => ({
    original: `Worked with ${skill}`,
    optimized: `Built production-grade features using ${skill} aligned with frontend role requirements`
  }));
}

module.exports = analyzeJDService;

