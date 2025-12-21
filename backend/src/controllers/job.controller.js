const analyzeJDService = require("../services/ai.service");

const analyzeJD = (req, res) => {
  const { jobDescription, role, experience } = req.body;

  // 1️⃣ Empty JD → 400
  if (!jobDescription || jobDescription.trim().length === 0) {
    return res.status(400).json({
      error: "Job description is required"
    });
  }

  // 2️⃣ Very short JD → 422  
  if (jobDescription.trim().length < 30) {
    return res.status(422).json({
      error: "Job description too short for meaningful analysis"
    });
  }

  // 3️⃣ Normal flow
  const result = analyzeJDService(jobDescription, role, experience);

  // 🔒 Freeze API contract
  //NO CHANGES TO RESPONSE FORMAT
  res.json({
    skills: result.skills || [],
    missingSkills: result.missingSkills || [],
    projects: result.projects || [],
    resumePoints: result.resumePoints || [],
    matchScore: typeof result.matchScore === "number" ? result.matchScore : 0
  });
};

module.exports = { analyzeJD };
