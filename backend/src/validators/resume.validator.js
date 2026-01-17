const Joi = require("joi");

const resumeAnalyzeSchema = Joi.object({
  jobDescription: Joi.string().min(30).required(),

  profile: Joi.object({
    experience: Joi.string().required(),
    targetRole: Joi.string().required(),
    company: Joi.string().allow("").optional(),
    techStack: Joi.string().allow("").optional()
  }).required(),

  // Resume is optional when file is uploaded via multipart
  resume: Joi.object({
    text: Joi.string().allow("").optional(),
    fileUrl: Joi.string().optional()
  }).optional()
}).unknown(true); // Allow extra fields from FormData

module.exports = { resumeAnalyzeSchema };
