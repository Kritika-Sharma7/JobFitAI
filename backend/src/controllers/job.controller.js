const analyzeJDService = require("../services/ai.service");

const analyzeJD = async (req, res) => {
  // console.log("🚀 analyzeJD controller HIT");

  const { jobDescription, role, experience } = req.body;

  console.log("📥 Analyze JD request", {
    role,
    experience,
    jdLength: jobDescription?.length
  });

  if (!jobDescription || jobDescription.trim().length === 0) {
    return res.status(400).json({
      error: "Job description is required"
    });
  }

  if (jobDescription.length < 30) {
    return res.status(422).json({
      error: "Job description too short for meaningful analysis"
    });
  }

  const result = await analyzeJDService(jobDescription, role, experience);

  console.log("📤 Final Analyze JD response", {
  roleTitle: result.role?.title,
  level: result.role?.level,
  fitScore: result.fitScore,
  techStackCount: result.role?.techStack?.length,
  skillsCount: result.skills?.length,
  projectsCount: result.projects?.length,
  resumeBulletsCount: result.resumeBullets?.length
});



  // console.log("🔥 FINAL BACKEND RESULT:", JSON.stringify(result, null, 2));

  //DONT CHANGE THIS RESPONSE FORMAT EVER
  // return res.json({
  //   roleDetected: result.roleDetected || "",
  //   experienceDetected: result.experienceDetected || "",
  //   skills: {
  //     must_have: result.skills?.must_have || [],
  //     good_to_have: result.skills?.good_to_have || [],
  //     missing: result.skills?.missing || []
  //   },
  //   projects: result.projects || [],
  //   resumePoints: result.resumePoints || [],
  //   fitScore: result.fitScore || 0,
  //   scoreBreakdown: result.scoreBreakdown || {
  //     skills: 0,
  //     experience: 0,
  //     keywords: 0
  //   }
  // });
  return res.json(result);


};

module.exports = { analyzeJD };
