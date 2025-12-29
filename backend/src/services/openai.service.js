// const OpenAI = require("openai");

// // 🔐 OpenAI Client
// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// });

// /* =====================================================
//    JD ANALYSIS
//    ===================================================== */

// async function analyzeJDWithOpenAI(jd, role, experience) {
//   console.log("🤖 OpenAI CALLED (JD)");

//   const prompt = `
// You are a career analysis engine.

// Analyze the following job description and return structured JSON ONLY.
// DO NOT include explanations or markdown.

// Job Description:
// ${jd}

// User Selected Role: ${role}
// User Experience Level: ${experience}

// Return JSON in EXACTLY this format:
// {
//   "roleDetected": "",
//   "experienceDetected": "",
//   "skills": {
//     "must_have": [],
//     "good_to_have": [],
//     "missing": []
//   },
//   "responsibilities": [],
//   "keywords": []
// }
// `;

//   let response;
//   try {
//     response = await client.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.2
//     });
//   } catch (apiError) {
//     console.error("❌ OpenAI JD API ERROR:", apiError.message);
//     throw new Error("OpenAI JD request failed");
//   }

//   const rawContent = response?.choices?.[0]?.message?.content;

//   if (!rawContent) {
//     throw new Error("Empty OpenAI JD response");
//   }

//   try {
//     return JSON.parse(rawContent);
//   } catch {
//     throw new Error("Invalid JSON from OpenAI (JD)");
//   }
// }

// /* =====================================================
//    🧠 AI-POWERED RESUME PARSING
//    ===================================================== */

// async function analyzeResumeWithOpenAI(resumeText) {
//   console.log("🤖 OpenAI CALLED (RESUME)");

//   const prompt = `
// You are an ATS resume parser.

// Extract the following strictly as JSON.
// NO explanations. NO markdown.

// Return ONLY this format:
// {
//   "skills": [
//     { "name": "React", "confidence": 0.0 }
//   ],
//   "keywords": [],
//   "experienceLevel": "",
//   "roles": []
// }

// Resume:
// """${resumeText}"""
// `;

//   let response;
//   try {
//     response = await client.chat.completions.create({
//       model: "gpt-4o-mini",
//       temperature: 0.2,
//       messages: [{ role: "user", content: prompt }]
//     });
//   } catch (apiError) {
//     console.error("❌ OpenAI RESUME API ERROR:", apiError.message);
//     throw new Error("OpenAI Resume request failed");
//   }

//   const rawContent = response?.choices?.[0]?.message?.content;

//   if (!rawContent) {
//     throw new Error("Empty OpenAI Resume response");
//   }

//   try {
//     return JSON.parse(rawContent);
//   } catch {
//     throw new Error("Invalid JSON from OpenAI (Resume)");
//   }
// }

// /* =====================================================
//    EXPORTS
//    ===================================================== */

// module.exports = {
//   analyzeJDWithOpenAI,
//   analyzeResumeWithOpenAI
// };


//============================================

const OpenAI = require("openai");

/* =====================================================
   🔐 OPENAI CLIENT
   ===================================================== */

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/* =====================================================
   🧠 SAFE JSON PARSER (CRITICAL – DO NOT REMOVE)
   ===================================================== */
/**
 * Handles:
 * - ```json wrappers
 * - accidental markdown
 * - whitespace noise
 * - future OpenAI formatting changes
 */
function safeJsonParse(raw, label = "OpenAI") {
  if (!raw) {
    throw new Error(`Empty ${label} response`);
  }

  const cleaned = raw
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error(`❌ ${label} RAW OUTPUT:\n`, raw);
    throw new Error(`Invalid JSON from ${label}`);
  }
}

/* =====================================================
   🔁 CORE CHAT FUNCTION (SINGLE SOURCE OF TRUTH)
   ===================================================== */
/**
 * Centralized chat so:
 * - model changes happen in one place
 * - retries/logging can be added later
 * - prompt behavior stays consistent
 */
async function chat(prompt, temperature = 0.7, systemContext = null) {
  let response;

  try {
    response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature,
      messages: [
        {
          role: "system",
          content:
            systemContext ||
            "You are a senior software hiring expert, ATS specialist, resume coach, and technical mentor. Be realistic, specific, and practical."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });
  } catch (err) {
    console.error("❌ OpenAI CHAT ERROR:", err.message);
    throw new Error("OpenAI chat request failed");
  }

  const content = response?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Empty OpenAI chat response");
  }

  return content;
}

/* =====================================================
   📄 JD ANALYSIS (STRUCTURED & SAFE)
   ===================================================== */

async function analyzeJDWithOpenAI(jd, role, experience) {
  console.log("🤖 OpenAI CALLED (JD)");

  const prompt = `
You are a career analysis engine.

Analyze the following job description and return structured JSON ONLY.
DO NOT include explanations, markdown, or extra text.

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

  const raw = await chat(prompt, 0.2);
  return safeJsonParse(raw, "OpenAI JD");
}

/* =====================================================
   📄 RESUME PARSING (OPTIONAL / FUTURE USE)
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

  const raw = await chat(prompt, 0.2);
  return safeJsonParse(raw, "OpenAI Resume");
}

/* =====================================================
   ✍️ JD-OPTIMIZED RESUME BULLET REWRITE
   ===================================================== */

async function rewriteResumeBulletsWithOpenAI({
  bullets,
  jobDescription,
  role,
  experience
}) {
  console.log("🤖 OpenAI CALLED (BULLET REWRITE)");

  const prompt = `
You are rewriting resume bullets for ATS systems and senior hiring managers.

Target Role: ${role}
Candidate Experience Level: ${experience}

Job Description:
${jobDescription}

Resume Bullets:
${bullets.map((b, i) => `${i + 1}. ${b}`).join("\n")}

Rules:
- Rewrite EACH bullet independently
- Use strong action verbs
- Quantify impact where realistic
- Align clearly with JD keywords
- Avoid generic phrasing
- Do NOT repeat sentence structure
- Output JSON ONLY

JSON format:
[
  {
    "original": "",
    "optimized": ""
  }
]
`;

  const raw = await chat(prompt, 0.4);
  return safeJsonParse(raw, "OpenAI Bullet Rewrite");
}

/* =====================================================
   🚀 JD-MATCHED, CHATGPT-GRADE PROJECT IDEAS
   ===================================================== */

async function generateJDMatchedProjectsWithOpenAI({
  jdSkills,
  missingSkills,
  role,
  experience
}) {
  console.log("🤖 OpenAI CALLED (PROJECT IDEAS)");

  const prompt = `
You are a senior ${role} mentor helping a candidate improve their resume.

Candidate Experience Level: ${experience}

Required JD Skills:
${jdSkills.join(", ")}

Missing / Weak Skills:
${missingSkills.join(", ")}

Generate 3 REALISTIC, resume-worthy project ideas.

Each project must include:
- Clear project title
- Real-world problem statement
- Exact features to build
- Tech stack
- Why recruiters care about this project

Output JSON ONLY in this format:
[
  {
    "title": "",
    "problem": "",
    "features": [],
    "techStack": [],
    "whyItMatters": ""
  }
]
`;

  const raw = await chat(prompt, 0.6);
  return safeJsonParse(raw, "OpenAI Projects");
}

/* =====================================================
   EXPORTS (STABLE CONTRACT)
   ===================================================== */

module.exports = {
  chat,
  analyzeJDWithOpenAI,
  analyzeResumeWithOpenAI,
  rewriteResumeBulletsWithOpenAI,
  generateJDMatchedProjectsWithOpenAI
};


