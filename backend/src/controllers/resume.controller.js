const analyzeResumeService = require("../services/resume.service");
const { improveResumeBullet } = require("../services/ats.service");


/**
 * POST /resume/analyze
 */
const analyzeResume = async (req, res) => {
  try {
    const { resume, profile, jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({ error: "jobDescription is required" });
    }

    if (!profile?.experience || !profile?.targetRole) {
      return res.status(400).json({
        error: "profile.experience and profile.targetRole are required"
      });
    }

    if (!resume?.text && !resume?.fileUrl) {
      return res.status(400).json({
        error: "Either resume.text or resume.fileUrl is required"
      });
    }

    const result = await analyzeResumeService({
      resume,
      profile,
      jobDescription
    });

    return res.json(result); // 🔥 EXACT frontend contract
  } catch (err) {
    console.error("❌ Resume analyze error:", err);
    return res.status(500).json({ error: "Resume analysis failed" });
  }
};

/**
 * POST /resume/improve
 * Body:
 * {
 *   bullet: string,
 *   role: string
 * }
 */
const improveResume = async (req, res) => {
  try {
    const { bullet, role } = req.body;

    if (!bullet || bullet.length < 10) {
      return res.status(400).json({
        error: "Invalid resume bullet"
      });
    }

    const result = improveResumeBullet(bullet, role);

    return res.json(result);
  } catch (error) {
    console.error("❌ Resume improve error:", error);
    return res.status(500).json({
      error: "Resume improvement failed"
    });
  }
};

module.exports = {
  analyzeResume,
  improveResume
};
