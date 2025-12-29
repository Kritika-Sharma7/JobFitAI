const express = require("express");
const router = express.Router();

const {
  resetAnalysis,
  getLatestAnalysis
} = require("../controllers/analysis.controller");

const authMiddleware = require("../middlewares/auth.middleware");

/* 🔄 Latest analysis rehydration */
router.get("/analysis/latest", authMiddleware, getLatestAnalysis);

/* ♻️ Explicit reset only */
router.post("/analysis/reset", authMiddleware, resetAnalysis);

module.exports = router;
