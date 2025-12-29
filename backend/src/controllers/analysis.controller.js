const JDAnalysis = require("../models/JDAnalysis.model");

/* =====================================================
   ♻️ RESET ANALYSIS (EXPLICIT ONLY)
   ===================================================== */
exports.resetAnalysis = async (req, res) => {
  try {
    const userId = req.userId;

    await JDAnalysis.deleteMany({ userId });

    return res.json({ success: true });
  } catch (err) {
    console.error("❌ Reset analysis error:", err);
    return res.status(500).json({ error: "Reset failed" });
  }
};

/* =====================================================
   🔄 GET LATEST ANALYSIS (REHYDRATION)
   ===================================================== */
exports.getLatestAnalysis = async (req, res) => {
  try {
    const userId = req.userId;

    const latestAnalysis = await JDAnalysis
      .findOne({ userId })
      .sort({ createdAt: -1 });

    // Contract rule: return null if nothing exists
    if (!latestAnalysis) {
      return res.json(null);
    }

    return res.json(latestAnalysis);
  } catch (err) {
    console.error("❌ Fetch latest analysis error:", err);
    return res.status(500).json({ error: "Failed to fetch latest analysis" });
  }
};
