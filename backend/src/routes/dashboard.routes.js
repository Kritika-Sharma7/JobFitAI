const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const { dashboardData } = require("../controllers/dashboard.controller");

router.get("/dashboard/summary", authMiddleware, dashboardData);

module.exports = router;
