// const getDashboardData = require("../services/dashboard.service");

// const dashboardData = async (req, res) => {
//   try {
//     const userId = req.query.userId || "demo-user";

//     const data = await getDashboardData({ userId });
//     return res.json(data);

//   } catch (err) {
//     console.error("❌ Dashboard error:", err);
//     return res.status(500).json({ error: "Dashboard data failed" });
//   }
// };

// module.exports = { dashboardData };


//==============Modified code 29 Dec Phase 5 ================
const getDashboardData = require("../services/dashboard.service");

const dashboardData = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const data = await getDashboardData({ userId });

    return res.json(data);
  } catch (err) {
    console.error("❌ Dashboard error:", err);
    return res.status(500).json({ error: "Dashboard data failed" });
  }
};

module.exports = { dashboardData };
