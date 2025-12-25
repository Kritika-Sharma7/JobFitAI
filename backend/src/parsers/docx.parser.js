const mammoth = require("mammoth");

async function extractTextFromDOCX(buffer) {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

module.exports = { extractTextFromDOCX };
