const mongoose = require("mongoose");

const JobDescriptionSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },

  content: { type: String, required: true }, // raw JD text

  role: String,
  experience: String,

  /* 🔥 REQUIRED FOR MATCH + ROADMAP */
  skills: {
    type: [String],
    default: []
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(
  "JobDescription",
  JobDescriptionSchema
);
