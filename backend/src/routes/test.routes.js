const express = require("express");
const router = express.Router();

router.post("/test", (req, res) => {
  res.json({ message: "Test route working" });
});

module.exports = router;
