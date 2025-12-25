const generateRoadmapService = require("../services/roadmap.service");

const generateRoadmap = async (req, res) => {
  try {
    const { jdId } = req.params;
    const userId = req.query.userId || "demo-user";

    if (!jdId) {
      return res.status(400).json({ error: "jdId is required" });
    }

    const roadmap = await generateRoadmapService({ jdId, userId });

    return res.json(roadmap);
  } catch (err) {
    console.error("❌ Roadmap generation error:", err);
    return res.status(500).json({ error: "Roadmap generation failed" });
  }
};

module.exports = { generateRoadmap };
