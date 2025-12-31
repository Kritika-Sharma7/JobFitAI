const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const { analyzeJD } = require("../controllers/job.controller");
const { saveJD } = require("../controllers/job.save.controller");

router.post("/analyze-jd", authMiddleware, analyzeJD);
router.post("/save-jd", authMiddleware, saveJD);

module.exports = router;


//RS 31Dec