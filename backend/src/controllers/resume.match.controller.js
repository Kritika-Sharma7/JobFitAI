// const matchResumeWithJDService = require("../services/resume.match.service");

// const matchResumeWithJD = async (req, res) => {
//   try {
//     const { jdId } = req.params;
//     const userId = req.query.userId || "demo-user";

//     if (!jdId) {
//       return res.status(400).json({ error: "jdId is required" });
//     }

//     const result = await matchResumeWithJDService({ jdId, userId });

//     return res.json(result);
//   } catch (err) {
//     console.error("❌ Resume-JD match error:", err);
//     return res.status(500).json({ error: "Resume-JD match failed" });
//   }
// };

// module.exports = { matchResumeWithJD };


const matchResumeWithJDService = require("../services/resume.match.service");
const { generateAnalysisSummary } = require("../services/openai.service");
const JDAnalysis = require("../models/JDAnalysis.model");

const matchResumeWithJD = async (req, res) => {
  try {
    const { jdId } = req.params;//RS 31Dec

    const userId = req.userId;//RS 31Dec

    const result = await matchResumeWithJDService({ jdId, userId });

    return res.json(result);
  } catch (error) {
    console.error("❌ Resume-JD match error:", error.message);

    return res.status(500).json({
      error: "Resume-JD match failed",
      reason: error.message
    });
  }
};

// Generate AI Summary for an analysis
const getAnalysisSummary = async (req, res) => {
  try {
    const { jdId } = req.params;
    const userId = req.userId;

    // Get the analysis data
    let analysis = await JDAnalysis.findOne({ _id: jdId, userId });
    
    if (!analysis) {
      analysis = await JDAnalysis.findOne({ jdId, userId });
    }

    if (!analysis) {
      return res.status(404).json({ error: "Analysis not found" });
    }

    // Generate AI summary
    const summary = await generateAnalysisSummary({
      role: analysis.role,
      matchScore: analysis.matchScore || 0,
      skills: analysis.skills || {},
      jdText: analysis.jdText
    });

    return res.json({ 
      summary: summary || "Unable to generate summary at this time.",
      role: analysis.role,
      matchScore: analysis.matchScore
    });
  } catch (error) {
    console.error("❌ Summary generation error:", error.message);
    return res.status(500).json({ 
      error: "Summary generation failed",
      summary: "We couldn't generate a summary for this analysis. Please try again later."
    });
  }
};

module.exports = { matchResumeWithJD, getAnalysisSummary };
