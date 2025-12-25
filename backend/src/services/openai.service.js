const OpenAI = require("openai");

// 🔐 OpenAI Client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/* =====================================================
   JD ANALYSIS
   ===================================================== */

async function analyzeJDWithOpenAI(jd, role, experience) {
  console.log("🤖 OpenAI CALLED (JD)");

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
    console.error("❌ OpenAI JD API ERROR:", apiError.message);
    throw new Error("OpenAI JD request failed");
  }

  const rawContent = response?.choices?.[0]?.message?.content;

  if (!rawContent) {
    throw new Error("Empty OpenAI JD response");
  }

  try {
    return JSON.parse(rawContent);
  } catch {
    throw new Error("Invalid JSON from OpenAI (JD)");
  }
}

/* =====================================================
   🧠 AI-POWERED RESUME PARSING
   ===================================================== */

async function analyzeResumeWithOpenAI(resumeText) {
  console.log("🤖 OpenAI CALLED (RESUME)");

  const prompt = `
You are an ATS resume parser.

Extract the following strictly as JSON.
NO explanations. NO markdown.

Return ONLY this format:
{
  "skills": [
    { "name": "React", "confidence": 0.0 }
  ],
  "keywords": [],
  "experienceLevel": "",
  "roles": []
}

Resume:
"""${resumeText}"""
`;

  let response;
  try {
    response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [{ role: "user", content: prompt }]
    });
  } catch (apiError) {
    console.error("❌ OpenAI RESUME API ERROR:", apiError.message);
    throw new Error("OpenAI Resume request failed");
  }

  const rawContent = response?.choices?.[0]?.message?.content;

  if (!rawContent) {
    throw new Error("Empty OpenAI Resume response");
  }

  try {
    return JSON.parse(rawContent);
  } catch {
    throw new Error("Invalid JSON from OpenAI (Resume)");
  }
}

/* =====================================================
   EXPORTS
   ===================================================== */

module.exports = {
  analyzeJDWithOpenAI,
  analyzeResumeWithOpenAI
};
