const analyzeJDService = require("../services/ai.service");

const analyzeJD = (req, res) => {
  const { jobDescription, role, experience } = req.body;

  if (!jobDescription || jobDescription.trim().length === 0) {
    return res.status(400).json({ message: "Job description is required" });
  }

  const result = analyzeJDService(jobDescription, role, experience);

  // 🔒 Freeze API contract here
  //NO CHANGES TO BE DONE IN THIS RESPONSE STRUCTURE
  res.json({
    skills: result.skills || [],
    missingSkills: result.missingSkills || [],
    projects: result.projects || [],
    resumePoints: result.resumePoints || [],
    matchScore: typeof result.matchScore === "number" ? result.matchScore : 0
  });
};

module.exports = { analyzeJD };
