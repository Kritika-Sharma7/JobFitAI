const express = require("express");
const router = express.Router();

const { scoreATS } = require("../controllers/ats.controller");

router.post("/score", scoreATS);

module.exports = router;
