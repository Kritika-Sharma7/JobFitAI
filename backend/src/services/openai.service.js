const OpenAI = require("openai");

// 🔐 OpenAI Client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 🔥 MAIN ANALYSIS FUNCTION
async function analyzeJDWithOpenAI(jd, role, experience) {
  console.log("🤖 OpenAI CALLED");
  // console.log("📄 JD length:", jd.length);
  // console.log("🎯 Role (user input):", role);
  // console.log("📊 Experience (user input):", experience);

  const prompt = `
You are a career analysis engine.

Analyze the following job description and return structured JSON ONLY.
DO NOT include explanations or markdown.

Job Description:
${jd}

User Selected Role: ${role}
User Experience Level: ${experience}

Return JSON in EXACTLY this format:
{
  "roleDetected": "",
  "experienceDetected": "",
  "skills": {
    "must_have": [],
    "good_to_have": [],
    "missing": []
  },
  "responsibilities": [],
  "keywords": []
}
`;

  let response;

  try {
    response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2
    });
  } catch (apiError) {
    console.error("❌ OpenAI API ERROR:", apiError.message);
    throw new Error("OpenAI API request failed");
  }

  const rawContent = response?.choices?.[0]?.message?.content;

  // console.log("📨 OpenAI RAW RESPONSE:");
  // console.log(rawContent);

  if (!rawContent) {
    throw new Error("Empty response from OpenAI");
  }

  // 🔐 Safe JSON parsing
  let parsed;
  try {
    parsed = JSON.parse(rawContent);
  } catch (err) {
    console.error("❌ JSON PARSE FAILED");
    throw new Error("Invalid OpenAI JSON response");
  }

  // console.log("✅ Parsed OpenAI Output:", JSON.stringify(parsed, null, 2));

  return parsed;
}

module.exports = { analyzeJDWithOpenAI };


