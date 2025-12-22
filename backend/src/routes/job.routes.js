const express = require("express");
const router = express.Router();

const { analyzeJD } = require("../controllers/job.controller");
// console.log("📌 job.routes.js loaded");
router.post("/analyze-jd", analyzeJD);

module.exports = router;
