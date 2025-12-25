const express = require("express");
const router = express.Router();

const { generateRoadmap } = require("../controllers/roadmap.controller");

router.get("/roadmap/:jdId", generateRoadmap);

module.exports = router;
