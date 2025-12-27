// const analyzeJDService = require("../services/ai.service");
// const JobDescription = require("../models/JobDescription");

// const analyzeJD = async (req, res) => {
//   // console.log("🚀 analyzeJD controller HIT");

//   const { jobDescription, role, experience } = req.body;

//   console.log("📥 Analyze JD request", {
//     role,
//     experience,
//     jdLength: jobDescription?.length
//   });

//   if (!jobDescription || jobDescription.trim().length === 0) {
//     return res.status(400).json({
//       error: "Job description is required"
//     });
//   }

//   if (jobDescription.length < 30) {
//     return res.status(422).json({
//       error: "Job description too short for meaningful analysis"
//     });
//   }


//   //Never change this response format ever
//   const result = await analyzeJDService(jobDescription, role, experience);

//   console.log("📤 Final Analyze JD response", {
//   roleTitle: result.role?.title,
//   level: result.role?.level,
//   fitScore: result.fitScore,
//   techStackCount: result.role?.techStack?.length,
//   skillsCount: result.skills?.length,
//   projectsCount: result.projects?.length,
//   resumeBulletsCount: result.resumeBullets?.length
// });

//   // console.log("🔥 FINAL BACKEND RESULT:", JSON.stringify(result, null, 2));

//   return res.json(result);


// };

// module.exports = { analyzeJD };

const analyzeJDService = require("../services/ai.service");
const JobDescription = require("../models/JobDescription");

const analyzeJD = async (req, res) => {
  const { jobDescription, role, experience } = req.body;

  if (!jobDescription || jobDescription.trim().length === 0) {
    return res.status(400).json({ error: "Job description is required" });
  }

  if (jobDescription.length < 30) {
    return res.status(422).json({
      error: "Job description too short for meaningful analysis"
    });
  }

  // 🔹 AI ANALYSIS
  const result = await analyzeJDService(jobDescription, role, experience);

  // 🔥 SAVE JD WITH SKILLS
  const jd = await JobDescription.create({
    userId: "demo-user",//change later with auth middleware
    content: jobDescription,
    role,
    experience,
    // skills: result.skills.map(s => s.name) 
    skills: result.skills.map(s =>typeof s === "string" ? s : s.name)// ⭐ THIS FIXES EVERYTHING
  });

  return res.json({
    jdId: jd._id,
    ...result
  });
};

module.exports = { analyzeJD };



