const { calculateATSScore, analyzeBullets } = require("../services/ats.service");
const Resume = require("../models/Resume.model");

const scoreATS = async (req, res) => {
  try {
    const { resumeText, jobDescription, experience } = req.body;
    const userId = req.userId; // From auth middleware

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

    // Smart bullet extraction - filter out headers and skill lists
    const excludePatterns = [
      /^(skills|education|experience|projects|certifications|summary|objective|contact|references)\s*:?$/i,
      /^(skills|technical skills|core competencies|technologies|tools)\s*:?/i,
      /^(experience level|target role|location|email|phone|linkedin|github)\s*:?/i,
      /^[a-z\s,]+$/i, // Just comma-separated words
      /^(\d{1,2}\/\d{1,2}\/\d{2,4}|\d{4}\s*[-–]\s*(present|\d{4}))$/i,
      /^(fresher|junior|senior|mid|lead|intern)$/i,
      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
      /^\+?[\d\s()-]{7,}$/,
      /^https?:\/\//,
    ];

    const isValidBullet = (line) => {
      if (line.length < 15) return false;
      if (excludePatterns.some(p => p.test(line))) return false;
      const words = line.split(/\s+/).filter(w => w.length > 1);
      if (words.length < 4) return false;
      const commaCount = (line.match(/,/g) || []).length;
      if (commaCount > 3 && words.length < commaCount * 2) return false;
      return true;
    };

    const bullets = resumeText
      .split("\n")
      .map(b => b.trim())
      .filter(isValidBullet);

    const bulletAnalysis = analyzeBullets(bullets, jobDescription);

    // 💾 Save ATS score to the user's latest resume
    if (userId) {
      try {
        const latestResume = await Resume.findOne({ userId }).sort({ version: -1 });
        if (latestResume) {
          latestResume.scoresSnapshot = {
            ...latestResume.scoresSnapshot,
            atsScore: scoreData.atsScore
          };
          await latestResume.save();
          console.log("✅ ATS score saved to resume:", scoreData.atsScore);
        }
      } catch (saveErr) {
        console.error("⚠️ Failed to save ATS score:", saveErr.message);
        // Don't fail the request, just log
      }
    }

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
