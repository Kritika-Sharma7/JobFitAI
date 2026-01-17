// const Resume = require("../models/Resume.model");
// const analyzeResumeService = require("../services/resume.service");
// const { chat } = require("../services/openai.service");

// /* =====================================================
//    HELPERS
//    ===================================================== */
// function normalizeExperienceLevel(exp) {
//   if (!exp) return "Fresher";

//   const normalized = exp
//     .toLowerCase()
//     .replace(/\s+/g, "")
//     .replace("–", "-");

//   const map = {
//     // UI values
//     "fresher": "Fresher",
//     "0-2years": "1-3",
//     "2-5years": "3+",
//     "5+years": "3+",

//     // safety / backend values
//     "intern": "Intern",
//     "1-3": "1-3",
//     "3+": "3+"
//   };

//   return map[normalized] || "Fresher";
// }


// /* =====================================================
//    RESUME ANALYZE
//    ===================================================== */
// const analyzeResume = async (req, res) => {
//   try {
//     console.log("🔥 RESUME ANALYZE CONTROLLER HIT 🔥");

//     const userId = req.userId;
//     if (!userId) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     const { resume, profile, jobDescription } = req.body;

//     if (
//       !resume?.text ||
//       !jobDescription ||
//       !profile?.experience ||
//       !profile?.targetRole
//     ) {
//       return res.status(400).json({ error: "Invalid payload" });
//     }

//     // ✅ SINGLE SOURCE OF TRUTH
//     const result = await analyzeResumeService({
//       resume,
//       profile,
//       jobDescription,
//       userId
//     });

//     /*
//       ✅ DO NOT:
//       - Save Resume here
//       - Modify response
//       - Pick fields
//       - Rename keys
//     */

//     return res.json(result);

//   } catch (err) {
//     console.error("❌ Resume analyze error:", err);
//     return res.status(500).json({ error: "Resume analysis failed" });
//   }
// };

// /* =====================================================
//    🧠 SMART BULLET IMPROVEMENT (CHATGPT-LIKE)
//    ===================================================== */

// const improveResume = async (req, res) => {
//   try {
//     const { bullet, role, jobDescription } = req.body;

//     if (!bullet || !role || !jobDescription) {
//       return res.status(400).json({ error: "bullet, role, and jobDescription are required" });
//     }

//     const prompt = `
// Improve this resume bullet for a ${role} role.

// Job Description:
// ${jobDescription}

// Original Bullet:
// "${bullet}"

// Instructions:
// - Use strong action verbs
// - Add realistic impact
// - Align with JD keywords
// - Keep it concise and ATS-friendly
// - Do NOT add fluff

// Return ONLY the improved bullet text.
// `;

//     const optimized = await chat(prompt, 0.5);

//     return res.json({
//       original: bullet,
//       optimized
//     });

//   } catch (err) {
//     console.error("❌ Resume bullet improve error:", err);
//     return res.status(500).json({ error: "Bullet improvement failed" });
//   }
// };

// /* =====================================================
//    EXPORTS
//    ===================================================== */

// module.exports = {
//   analyzeResume,
//   improveResume
// };



//RS 11 JAN - TRYING TO ADD PDF ANALYZE FEATURE

const Resume = require("../models/Resume.model");
const analyzeResumeService = require("../services/resume.service");
const { chat } = require("../services/openai.service");

const { extractTextFromPDF } = require("../parsers/pdf.parser");
const { normalizeResumeText } = require("../utils/resume.util");

/* =====================================================
   HELPERS
   ===================================================== */
function normalizeExperienceLevel(exp) {
  if (!exp) return "Fresher";

  const normalized = exp
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace("–", "-");

  const map = {
    // UI values
    "fresher": "Fresher",
    "0-2years": "1-3",
    "2-5years": "3+",
    "5+years": "3+",

    // backend-safe values
    "intern": "Intern",
    "1-3": "1-3",
    "3+": "3+"
  };

  return map[normalized] || "Fresher";
}

/* =====================================================
   RESUME ANALYZE (TEXT + PDF — SAME OUTPUT)
   ===================================================== */
const analyzeResume = async (req, res) => {
  try {
    console.log("🔥 RESUME ANALYZE CONTROLLER HIT 🔥");

    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { resume, profile, jobDescription } = req.body;

    if (!jobDescription || !profile?.experience || !profile?.targetRole) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    let resumeText = resume?.text || "";

    /* =====================================================
       📄 PDF UPLOAD SUPPORT
       ===================================================== */
    if (!resumeText && req.file) {
      resumeText = await extractTextFromPDF(req.file.buffer);
      console.log("📄 EXTRACTED PDF RESUME TEXT ↓↓↓");
      console.log(resumeText.slice(0, 1500)); // log first 1500 chars
      console.log("📄 END OF PDF TEXT ↑↑↑");
    }

    if (!resumeText || resumeText.trim().length < 30) {
      return res.status(400).json({
        error: "Resume content is required (paste text or upload PDF)"
      });
    }

    // Normalize text (remove noise, weird chars)
    resumeText = normalizeResumeText(resumeText);

    /* =====================================================
       ✅ SINGLE SOURCE OF TRUTH (SERVICE)
       ===================================================== */
    const result = await analyzeResumeService({
      resume: { text: resumeText },
      profile,
      jobDescription,
      userId
    });

    /*
      🚫 DO NOT:
      - Modify response
      - Rename keys
      - Change structure
    */

    return res.json(result);

  } catch (err) {
    console.error("❌ Resume analyze error:", err);
    return res.status(500).json({ error: "Resume analysis failed" });
  }
};

/* =====================================================
   🧠 SMART BULLET IMPROVEMENT (UNCHANGED)
   ===================================================== */
const improveResume = async (req, res) => {
  try {
    const { bullet, role, jobDescription } = req.body;

    if (!bullet || !role || !jobDescription) {
      return res.status(400).json({
        error: "bullet, role, and jobDescription are required"
      });
    }

    const prompt = `
Improve this resume bullet for a ${role} role.

Job Description:
${jobDescription}

Original Bullet:
"${bullet}"

Instructions:
- Use strong action verbs
- Add realistic impact
- Align with JD keywords
- Keep it concise and ATS-friendly
- Do NOT add fluff

Return ONLY the improved bullet text.
`;

    const optimized = await chat(prompt, 0.5);

    return res.json({
      original: bullet,
      optimized
    });

  } catch (err) {
    console.error("❌ Resume bullet improve error:", err);
    return res.status(500).json({ error: "Bullet improvement failed" });
  }
};

/* =====================================================
   EXPORTS
   ===================================================== */
module.exports = {
  analyzeResume,
  improveResume
};
