const Joi = require("joi");

const resumeAnalyzeSchema = Joi.object({
  jobDescription: Joi.string().min(30).required(),

  profile: Joi.object({
    experience: Joi.string().required(),
    targetRole: Joi.string().required(),
    techStack: Joi.string().optional()
  }).required(),

  resume: Joi.object({
    text: Joi.string().optional(),
    fileUrl: Joi.string().optional()
  }).or("text", "fileUrl")
});

module.exports = { resumeAnalyzeSchema };
