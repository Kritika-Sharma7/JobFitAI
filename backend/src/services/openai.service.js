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
   🎯 DOMAIN DETECTION UTILITY
   ===================================================== */
const DOMAIN_KEYWORDS = {
  technology: [
    "software", "developer", "engineer", "frontend", "backend", "fullstack",
    "devops", "data scientist", "machine learning", "ai", "cloud", "api",
    "programming", "coding", "web", "mobile", "ios", "android", "database"
  ],
  marketing: [
    "marketing", "seo", "sem", "content", "brand", "digital marketing",
    "social media", "campaign", "analytics", "growth", "acquisition",
    "copywriting", "advertising", "ppc", "email marketing"
  ],
  sales: [
    "sales", "account executive", "business development", "crm", "pipeline",
    "revenue", "quota", "b2b", "b2c", "lead generation", "closing"
  ],
  finance: [
    "finance", "accounting", "financial analyst", "investment", "banking",
    "audit", "tax", "budget", "forecasting", "compliance", "treasury",
    "controller", "cpa", "cfa"
  ],
  hr: [
    "human resources", "hr", "recruiter", "talent acquisition", "hris",
    "compensation", "benefits", "employee relations", "onboarding",
    "performance management", "people operations"
  ],
  design: [
    "designer", "ui", "ux", "product design", "graphic design", "visual",
    "figma", "sketch", "creative", "art director", "brand design"
  ],
  operations: [
    "operations", "supply chain", "logistics", "procurement", "vendor",
    "process improvement", "lean", "six sigma", "project manager"
  ],
  healthcare: [
    "healthcare", "medical", "clinical", "nursing", "patient", "physician",
    "pharmaceutical", "health", "hospital", "care"
  ],
  legal: [
    "legal", "attorney", "lawyer", "paralegal", "compliance", "contract",
    "litigation", "corporate counsel", "regulatory"
  ],
  education: [
    "teacher", "professor", "education", "curriculum", "instructor",
    "academic", "training", "learning", "tutoring"
  ]
};

function detectDomain(text) {
  if (!text) return "general";
  
  const lowerText = text.toLowerCase();
  const scores = {};
  
  for (const [domain, keywords] of Object.entries(DOMAIN_KEYWORDS)) {
    scores[domain] = keywords.filter(kw => lowerText.includes(kw)).length;
  }
  
  const maxDomain = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])[0];
  
  return maxDomain[1] > 0 ? maxDomain[0] : "general";
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
            `You are a senior career expert, hiring specialist, and professional mentor 
with deep expertise across ALL industries and domains including technology, marketing, 
sales, finance, healthcare, design, operations, HR, legal, and more. 

You provide realistic, specific, and practical advice tailored to each unique role 
and industry. You understand ATS systems, resume optimization, skill assessment, 
and career development across all professional fields.

Be domain-aware: adapt your language, terminology, and recommendations based on 
the specific industry and role being discussed.`
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
   📄 JD ANALYSIS (STRUCTURED & DOMAIN-AGNOSTIC)
   ===================================================== */

async function analyzeJDWithOpenAI(jd, role, experience) {
  console.log("🤖 OpenAI CALLED (JD)");
  
  // Detect domain for context-aware analysis
  const domain = detectDomain(jd + " " + role);
  console.log("🎯 Detected domain:", domain);

  const prompt = `
You are a career analysis engine specializing in ${domain === 'general' ? 'all industries' : domain + ' roles'}.

Analyze the following job description and return structured JSON ONLY.
DO NOT include explanations, markdown, or extra text.

IMPORTANT: This is a ${domain.toUpperCase()} role. Extract skills and requirements 
relevant to this specific industry. Do NOT assume technical/software skills unless 
explicitly mentioned.

Job Description:
${jd}

User Selected Role: ${role}
User Experience Level: ${experience}

Return JSON in EXACTLY this format:
{
  "roleDetected": "The actual job title from the JD",
  "experienceDetected": "Entry/Mid/Senior based on requirements",
  "domain": "${domain}",
  "skills": {
    "must_have": ["List of REQUIRED skills/qualifications from the JD"],
    "good_to_have": ["List of PREFERRED/BONUS skills from the JD"],
    "missing": []
  },
  "responsibilities": ["Key job responsibilities"],
  "keywords": ["Important keywords for ATS optimization"]
}

For ${domain} roles, focus on industry-specific:
- Certifications (if any)
- Tools and software
- Soft skills and competencies
- Domain knowledge
- Required qualifications
`;

  const raw = await chat(prompt, 0.2);
  const result = safeJsonParse(raw, "OpenAI JD");
  
  // Ensure domain is included
  result.domain = result.domain || domain;
  
  return result;
}

/* =====================================================
   📄 RESUME PARSING (DOMAIN-AGNOSTIC)
   ===================================================== */

async function analyzeResumeWithOpenAI(resumeText, targetRole = "") {
  console.log("🤖 OpenAI CALLED (RESUME)");
  
  const domain = detectDomain(resumeText + " " + targetRole);

  const prompt = `
You are an expert resume parser for ${domain === 'general' ? 'all industries' : domain + ' professionals'}.

Extract information from this resume as JSON.
NO explanations. NO markdown.

IMPORTANT: Identify skills relevant to ${domain} industry, including:
- Technical tools and software
- Certifications and qualifications
- Soft skills and competencies
- Industry-specific knowledge

Return ONLY this format:
{
  "skills": [
    { "name": "Skill Name", "confidence": 0.0 to 1.0, "category": "technical|soft|certification|tool" }
  ],
  "keywords": ["ATS-relevant keywords from resume"],
  "experienceLevel": "Entry/Mid/Senior/Executive",
  "roles": ["Job titles held"],
  "domain": "${domain}",
  "yearsOfExperience": number or null
}

Resume:
"""${resumeText}"""
`;

  const raw = await chat(prompt, 0.2);
  return safeJsonParse(raw, "OpenAI Resume");
}

/* =====================================================
   ✍️ JD-OPTIMIZED RESUME BULLET REWRITE (DOMAIN-AWARE)
   ===================================================== */

async function rewriteResumeBulletsWithOpenAI({
  bullets,
  jobDescription,
  role,
  experience
}) {
  console.log("🤖 OpenAI CALLED (BULLET REWRITE)");
  
  const domain = detectDomain(jobDescription + " " + role);

  const prompt = `
You are rewriting resume bullets for ATS systems and hiring managers in the ${domain} industry.

Target Role: ${role}
Candidate Experience Level: ${experience}
Industry: ${domain}

Job Description:
${jobDescription}

Resume Bullets:
${bullets.map((b, i) => `${i + 1}. ${b}`).join("\n")}

Rules:
- Rewrite EACH bullet independently
- Use strong action verbs appropriate for ${domain} roles
- Quantify impact where realistic (metrics, percentages, outcomes)
- Align clearly with JD keywords
- Use industry-appropriate terminology for ${domain}
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
   🚀 JD-MATCHED PROJECT IDEAS (DOMAIN-AGNOSTIC)
   ===================================================== */

async function generateJDMatchedProjectsWithOpenAI({
  jdSkills,
  missingSkills,
  role,
  experience
}) {
  console.log("🤖 OpenAI CALLED (PROJECT IDEAS)");
  
  const domain = detectDomain(role + " " + jdSkills.join(" "));

  const prompt = `
You are a senior ${domain} career mentor helping a candidate improve their resume for a ${role} position.

Candidate Experience Level: ${experience}
Industry/Domain: ${domain}

Required JD Skills:
${jdSkills.join(", ")}

Missing / Weak Skills:
${missingSkills.join(", ")}

Generate 3 REALISTIC, resume-worthy project or achievement ideas appropriate for ${domain}.

IMPORTANT: 
- For NON-TECHNICAL roles (marketing, sales, finance, HR, etc.), suggest:
  • Case studies, campaigns, or initiatives they could lead
  • Process improvements they could implement
  • Certifications or courses to complete
  • Volunteer projects or side consulting work
  • Portfolio pieces appropriate to the field

- For TECHNICAL roles, suggest:
  • Coding projects or open-source contributions
  • Technical demonstrations or prototypes
  • System improvements or automation

Each project must include:
- Clear project/initiative title
- Real-world problem or scenario
- Specific actions/deliverables
- Skills/tools demonstrated
- Why this appeals to ${domain} hiring managers

Output JSON ONLY in this format:
[
  {
    "title": "Project/Initiative Title",
    "problem": "The business problem or opportunity addressed",
    "features": ["Key deliverable 1", "Key deliverable 2", "Key deliverable 3"],
    "techStack": ["Skills/Tools used - can be non-technical"],
    "whyItMatters": "Why recruiters in ${domain} care about this"
  }
]
`;

  const raw = await chat(prompt, 0.6);
  return safeJsonParse(raw, "OpenAI Projects");
}

/* =====================================================
   AI ANALYSIS SUMMARY GENERATION
   ===================================================== */

async function generateAnalysisSummary({ role, matchScore, skills, jdText }) {
  console.log("🤖 OpenAI CALLED (ANALYSIS SUMMARY)");

  const matchedSkills = skills?.matched?.join(", ") || "None";
  const missingSkills = skills?.missing?.join(", ") || "None";
  const partialSkills = skills?.partial?.join(", ") || "None";

  const prompt = `
You are a friendly career coach AI providing personalized feedback to a job seeker.

Analyze this job match and write a helpful, encouraging summary (2-3 paragraphs).

Job Role: ${role || "Software Position"}
Match Score: ${matchScore}%
Matched Skills: ${matchedSkills}
Partial Match Skills: ${partialSkills}
Missing Skills: ${missingSkills}

Job Description Preview:
${jdText ? jdText.substring(0, 500) + "..." : "Not available"}

Write a conversational, ChatGPT-style summary that:
1. Starts with an overall assessment based on the match score
2. Highlights what's working well (matched skills)
3. Suggests specific improvements for missing skills
4. Ends with encouraging, actionable next steps

Keep the tone warm, professional, and motivating. Use "you" and "your" to make it personal.
Do NOT use bullet points. Write in flowing paragraphs.
Limit to 150-200 words.
`;

  try {
    const summary = await chat(prompt, 0.7);
    return summary.trim();
  } catch (err) {
    console.error("❌ Summary generation failed:", err.message);
    return null;
  }
}

/* =====================================================
   EXPORTS (STABLE CONTRACT)
   ===================================================== */

module.exports = {
  chat,
  detectDomain,
  analyzeJDWithOpenAI,
  analyzeResumeWithOpenAI,
  rewriteResumeBulletsWithOpenAI,
  generateJDMatchedProjectsWithOpenAI,
  generateAnalysisSummary
};
