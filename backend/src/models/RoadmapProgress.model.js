const mongoose = require("mongoose");

const RoadmapProgressSchema = new mongoose.Schema({
  userId: String,
  stepId: String,
  status: {
    type: String,
    enum: ["pending", "in_progress", "completed"],
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("RoadmapProgress", RoadmapProgressSchema);
