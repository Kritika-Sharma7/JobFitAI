const JobDescription = require("../models/JobDescription");

const saveJD = async (req, res) => {
  try {
    const { jobDescription, role, experience } = req.body;
    const userId = req.user?.id || "demo-user";

    if (!jobDescription || jobDescription.trim().length < 30) {
      return res.status(400).json({
        error: "Job description is required"
      });
    }

    const jd = await JobDescription.create({
      userId,
      content: jobDescription,
      role,
      experience
    });

    return res.json({
      jdId: jd._id
    });
  } catch (err) {
    console.error("❌ Save JD error:", err);
    return res.status(500).json({
      error: "Failed to save job description"
    });
  }
};

module.exports = { saveJD };
