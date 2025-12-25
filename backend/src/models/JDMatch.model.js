const mongoose = require("mongoose");

const JDMatchSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  jdId: { type: String, required: true },
  matchScore: Number,
  verdict: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("JDMatch", JDMatchSchema);
