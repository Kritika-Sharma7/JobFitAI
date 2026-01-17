const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validate");
const { resumeAnalyzeSchema } = require("../validators/resume.validator");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");//RS 11 Jan

const {
  analyzeResume,
  improveResume
} = require("../controllers/resume.controller");

router.post("/improve", improveResume);

router.post(
  "/analyze",
  authMiddleware,
  upload.single("resumeFile"),//RS 11 Jan                 
  validate(resumeAnalyzeSchema),
  analyzeResume
);

module.exports = router;
