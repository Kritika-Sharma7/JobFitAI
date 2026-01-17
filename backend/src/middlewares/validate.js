const Joi = require("joi");

/**
 * Parse FormData-style nested keys into proper objects
 * e.g., { "profile[experience]": "5+" } -> { profile: { experience: "5+" } }
 */
function parseNestedFormData(body) {
  const parsed = {};
  
  for (const key in body) {
    const match = key.match(/^(\w+)\[(\w+)\]$/);
    if (match) {
      const [, parent, child] = match;
      if (!parsed[parent]) parsed[parent] = {};
      parsed[parent][child] = body[key];
    } else {
      parsed[key] = body[key];
    }
  }
  
  return parsed;
}

function validate(schema) {
  return (req, res, next) => {
    // Parse nested FormData fields before validation
    const bodyToParse = parseNestedFormData(req.body);
    
    const { error, value } = schema.validate(bodyToParse, {
      abortEarly: false
    });

    if (error) {
      console.log("❌ Validation error:", error.details);
      return res.status(400).json({
        error: "Validation failed",
        details: error.details.map(d => d.message)
      });
    }

    // Replace body with parsed version for controller
    req.body = value;
    next();
  };
}

module.exports = validate;
