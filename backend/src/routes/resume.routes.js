const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const { resumeAnalyzeSchema } = require("../validators/resume.validator");

const {
  analyzeResume,
  improveResume
} = require("../controllers/resume.controller");

router.post("/analyze", analyzeResume);
router.post("/improve", improveResume);
router.post(
  "/analyze",
  validate(resumeAnalyzeSchema),
  analyzeResume
);

module.exports = router;
