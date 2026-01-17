const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

const { matchResumeWithJD, getAnalysisSummary } = require("../controllers/resume.match.controller");

router.get("/match/:jdId", authMiddleware, matchResumeWithJD);//31Dec
router.get("/match/:jdId/summary", authMiddleware, getAnalysisSummary);

module.exports = router;

