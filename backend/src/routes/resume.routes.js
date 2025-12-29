// const express = require("express");
// const router = express.Router();
// const validate = require("../middlewares/validate");
// const { resumeAnalyzeSchema } = require("../validators/resume.validator");

// const {
//   analyzeResume,
//   improveResume
// } = require("../controllers/resume.controller");

// router.post("/improve", improveResume);
// router.post(
//   "/analyze",
//   validate(resumeAnalyzeSchema),
//   analyzeResume
// );

// module.exports = router;

//Modified on 29 Dec Phase 5

const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validate");
const { resumeAnalyzeSchema } = require("../validators/resume.validator");
const authMiddleware = require("../middlewares/auth.middleware");

const {
  analyzeResume,
  improveResume
} = require("../controllers/resume.controller");

router.post("/improve", improveResume);

router.post(
  "/analyze",
  authMiddleware,                 
  validate(resumeAnalyzeSchema),
  analyzeResume
);

module.exports = router;
