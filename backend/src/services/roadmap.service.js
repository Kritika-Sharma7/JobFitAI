// const Resume = require("../models/Resume.model");
// const JobDescription = require("../models/JobDescription");
// const { compareSkills } = require("../utils/matching.util");

// async function generateRoadmapService({ jdId, userId }) {
//   const resume = await Resume.findOne({ userId }).sort({ version: -1 });
//   if (!resume) throw new Error("Resume not found");

//   const jd = await JobDescription.findById(jdId);
//   if (!jd) throw new Error("JD not found");

//   const comparison = compareSkills(resume.parsedData.skills, jd.skills);

//   const roadmap = comparison.missing.map(skill => ({
//     skill,
//     priority: jd.skills.includes(skill) ? "must_have" : "good_to_have",
//     difficulty: scaleDifficulty(resume.experienceLevel),
//     learningPlan: [
//       `Learn ${skill} basics`,
//       `Practice ${skill}`,
//       `Build project using ${skill}`
//     ]
//   }));

//   return {
//     jdId,
//     role: jd.role,
//     roadmap
//   };
// }

// function scaleDifficulty(exp) {
//   if (exp === "Intern") return "Beginner";
//   if (exp === "Fresher") return "Intermediate";
//   return "Advanced";
// }

// module.exports = generateRoadmapService;


const Resume = require("../models/Resume.model");
const JobDescription = require("../models/JobDescription");
const { compareSkills } = require("../utils/matching.util");
const {
  generateJDMatchedProjectsWithOpenAI
} = require("./openai.service");

async function generateRoadmapService({ jdId, userId }) {
  const resume = await Resume.findOne({ userId }).sort({ version: -1 });
  if (!resume) throw new Error("Resume not found");

  const jd = await JobDescription.findById(jdId);
  if (!jd) throw new Error("JD not found");

  const comparison = compareSkills(resume.parsedData.skills, jd.skills);

  const aiProjects = await generateJDMatchedProjectsWithOpenAI({
    jdSkills: jd.skills,
    missingSkills: comparison.missing,
    role: jd.role,
    experience: resume.experienceLevel
  });

  return {
    jdId,
    role: jd.role,
    projects: aiProjects
  };
}

module.exports = generateRoadmapService;
