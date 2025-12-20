const express = require("express");
const router = express.Router();

const { analyzeJD } = require("../controllers/job.controller");

router.post("/analyze-jd", analyzeJD);

module.exports = router;
