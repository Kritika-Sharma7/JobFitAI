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

module.exports = { matchResumeWithJD };
