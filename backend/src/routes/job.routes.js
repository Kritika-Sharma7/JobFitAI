const express = require("express");
const router = express.Router();

const { analyzeJD } = require("../controllers/job.controller");
const { saveJD } = require("../controllers/job.save.controller");

router.post("/analyze-jd", analyzeJD);
router.post("/save-jd", saveJD);

module.exports = router;
