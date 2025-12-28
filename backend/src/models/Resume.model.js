// const mongoose = require("mongoose");

// const SkillSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   confidence: { type: Number, min: 0, max: 1 }
// });

// const ResumeSchema = new mongoose.Schema({
//   userId: { type: String, required: true, index: true },

//   version: { type: Number, required: true },

//   text: { type: String, required: true },

//   parsedData: {
//     skills: { type: [SkillSchema], default: [] },
//     experienceLevel: {
//       type: String,
//       enum: ["Intern", "Fresher", "1-3", "3+"]
//     },
//     roles: { type: [String], default: [] }
//   },

//   createdAt: { type: Date, default: Date.now }
// });

// ResumeSchema.index({ userId: 1, version: -1 });

// module.exports = mongoose.model("Resume", ResumeSchema);


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
    }
  },
  { timestamps: true }
);

ResumeSchema.index({ userId: 1, version: -1 });

module.exports = mongoose.model("Resume", ResumeSchema);

