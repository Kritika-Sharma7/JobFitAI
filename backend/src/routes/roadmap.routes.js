const express = require("express");
const router = express.Router();

const { generateRoadmap } = require("../controllers/roadmap.controller");
const authMiddleware = require("../middlewares/auth.middleware");//RS 31Dec

router.get("/roadmap/:jdId", authMiddleware, generateRoadmap);//RS 31Dec

module.exports = router;
