const mongoose = require("mongoose");

const JDAnalysisSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },

    jdText: { type: String, required: true },
    resumeText: { type: String, required: true },

    resumeVersion: { type: Number, required: true },

    role: String,
    company: String,
    experienceLevel: String,

    atsScore: Number,
    matchScore: Number,
    fitScore: Number,

    skills: Object, // matched / missing / partial
    roadmapSnapshot: Array, // generated projects / steps
  },
  { timestamps: true }
);

module.exports = mongoose.model("JDAnalysis", JDAnalysisSchema);
