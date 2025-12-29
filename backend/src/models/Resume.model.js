// const mongoose = require("mongoose");

// const SkillSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   confidence: { type: Number, min: 0, max: 1, default: 0.5 }
// });

// const ResumeSchema = new mongoose.Schema(
//   {
//     userId: { type: String, required: true, index: true },

//     version: { type: Number, required: true },

//     text: { type: String, required: true },

//     fileUrl: { type: String },

//     parsedData: {
//       skills: { type: [SkillSchema], default: [] }
//     },

//     experienceLevel: {
//       type: String,
//       enum: ["Intern", "Fresher", "1-3", "3+"],
//       required: true
//     },

//     roles: {
//       type: [String],
//       default: [],
//       required: true
//     }
//   },
//   { timestamps: true }
// );

// ResumeSchema.index({ userId: 1, version: -1 });

// module.exports = mongoose.model("Resume", ResumeSchema);

//==============Modified code 29 Dec Phase 5 ================

const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  confidence: { type: Number, min: 0, max: 1, default: 0.5 }
});

const ResumeSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },

    version: { type: Number, required: true },

    text: { type: String, required: true },

    fileUrl: { type: String },

    parsedData: {
      skills: { type: [SkillSchema], default: [] }
    },

    experienceLevel: {
      type: String,
      enum: ["Intern", "Fresher", "1-3", "3+"],
      required: true
    },

    roles: {
      type: [String],
      default: [],
      required: true
    },

    /* ✅ ADDED FOR PHASE 5 DASHBOARD AGGREGATION */
    scoresSnapshot: {
      atsScore: { type: Number },
      matchScore: { type: Number },
      fitScore: { type: Number }
    }
  },
  { timestamps: true }
);

ResumeSchema.index({ userId: 1, version: -1 });

module.exports = mongoose.model("Resume", ResumeSchema);
