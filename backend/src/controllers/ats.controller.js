const { calculateATSScore, analyzeBullets } = require("../services/ats.service");

const scoreATS = async (req, res) => {
  try {
    const { resumeText, jobDescription, experience } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        error: "resumeText and jobDescription are required"
      });
    }

    const scoreData = calculateATSScore({
      resumeText,
      jobDescription,
      experience
    });

    const bullets = resumeText.split("\n").filter(Boolean);
    const bulletAnalysis = analyzeBullets(bullets, jobDescription);

    return res.json({
      atsScore: scoreData.atsScore,
      breakdown: scoreData.breakdown,
      bulletAnalysis,
      explanation:
        scoreData.atsScore >= 70
          ? "Good ATS alignment with room for stronger action verbs."
          : "Resume needs stronger keywords and impact-focused bullets."
    });
  } catch (err) {
    console.error("❌ ATS scoring error:", err);
    return res.status(500).json({ error: "ATS scoring failed" });
  }
};

module.exports = { scoreATS };
