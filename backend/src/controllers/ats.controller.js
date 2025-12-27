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

    const bullets = resumeText
      .split("\n")
      .map(b => b.trim())
      .filter(Boolean);

    const bulletAnalysis = analyzeBullets(bullets, jobDescription);

    // 🔍 Build explanation based on bullet strength
    const strongCount = bulletAnalysis.filter(b => b.grade === "strong").length;
    const mediumCount = bulletAnalysis.filter(b => b.grade === "medium").length;

    let explanation = "Resume needs stronger action verbs and clearer JD alignment.";

    if (scoreData.atsScore >= 80) {
      explanation =
        "Strong ATS alignment with clear action verbs and job-relevant skills.";
    } else if (scoreData.atsScore >= 65) {
      explanation =
        "Good ATS alignment with minor gaps in keyword usage or impact.";
    } else if (strongCount > 0 || mediumCount > 1) {
      explanation =
        "Some strong bullets detected, but overall ATS optimization can be improved.";
    }

    return res.json({
      atsScore: scoreData.atsScore,
      breakdown: scoreData.breakdown,
      bulletAnalysis,
      explanation
    });
  } catch (err) {
    console.error("❌ ATS scoring error:", err);
    return res.status(500).json({ error: "ATS scoring failed" });
  }
};

module.exports = { scoreATS };
