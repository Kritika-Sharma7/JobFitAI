const express = require("express");
const router = express.Router();

const { matchResumeWithJD } = require("../controllers/resume.match.controller");

router.get("/match/:jdId", matchResumeWithJD);

module.exports = router;
