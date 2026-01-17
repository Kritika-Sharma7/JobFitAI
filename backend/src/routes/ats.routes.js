const express = require("express");
const router = express.Router();

const { scoreATS } = require("../controllers/ats.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Auth middleware to get userId for saving ATS score
router.post("/score", authMiddleware, scoreATS);

module.exports = router;
