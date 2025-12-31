const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

const { matchResumeWithJD } = require("../controllers/resume.match.controller");

router.get("/match/:jdId", authMiddleware, matchResumeWithJD);//31Dec

module.exports = router;

