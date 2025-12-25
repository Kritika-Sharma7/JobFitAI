const express = require("express");
const router = express.Router();

const { dashboardData } = require("../controllers/dashboard.controller");

router.get("/dashboard/data", dashboardData);

module.exports = router;
