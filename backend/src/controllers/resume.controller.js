// const Resume = require("../models/Resume.model");
// const analyzeResumeService = require("../services/resume.service");
// const { improveResumeBullet } = require("../services/ats.service");

// function normalizeExperienceLevel(exp) {
//   if (!exp) return exp;

//   const normalized = exp.toLowerCase().replace(/\s+/g, "").replace("–", "-");

//   const map = {
//     "fresher": "Fresher",

//     "0-2years": "1-3",
//     "2-5years": "3+",
//     "5+years": "3+",

//     // safety / fallback
//     "intern": "Intern",
//     "1-3": "1-3",
//     "3+": "3+"
//   };

//   return map[normalized] || "Fresher";
// }


// const analyzeResume = async (req, res) => {
//   try {
//     console.log("🔥 RESUME ANALYZE CONTROLLER HIT 🔥");

//     const { resume, profile, jobDescription } = req.body;
//     const userId = "demo-user";

//     if (!jobDescription || !profile?.experience || !profile?.targetRole) {
//       return res.status(400).json({ error: "Invalid payload" });
//     }

//     const analysis = await analyzeResumeService({
//       resume,
//       profile,
//       jobDescription
//     });

//     const lastResume = await Resume.findOne({ userId }).sort({ version: -1 });
//     const nextVersion = lastResume ? lastResume.version + 1 : 1;

//     const savedResume = await Resume.create({
//       userId,
//       version: nextVersion,
//       text: resume.text || "",
//       parsedData: {
//         skills: analysis.parsedData.skills
//       },
//       experienceLevel: normalizeExperienceLevel(profile.experience),//RS CHANGED
//       roles: [profile.targetRole]
//     });

//     return res.json({
//       resumeId: savedResume._id,
//       matchScore: analysis.matchScore,
//       skillComparison: analysis.skillComparison
//     });

//   } catch (err) {
//     console.error("❌ Resume analyze error:", err);
//     return res.status(500).json({ error: "Resume analysis failed" });
//   }
// };

// const improveResume = async (req, res) => {
//   const { bullet, role } = req.body;

//   if (!bullet) {
//     return res.status(400).json({ error: "Bullet required" });
//   }

//   return res.json(improveResumeBullet(bullet, role));
// };



// module.exports = { analyzeResume, improveResume };



const Resume = require("../models/Resume.model");
const analyzeResumeService = require("../services/resume.service");
const { chat } = require("../services/openai.service");

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

    // safety / backend values
    "intern": "Intern",
    "1-3": "1-3",
    "3+": "3+"
  };

  return map[normalized] || "Fresher";
}


/* =====================================================
   RESUME ANALYZE
   ===================================================== */

// const analyzeResume = async (req, res) => {
//   try {
//     console.log("🔥 RESUME ANALYZE CONTROLLER HIT 🔥");


//     const { resume, profile, jobDescription } = req.body;

//     const userId = req.userId;

//     if (!resume?.text || !jobDescription || !profile?.experience || !profile?.targetRole) {
//       return res.status(400).json({ error: "Invalid payload" });
//     }

//     const analysis = await analyzeResumeService({
//       resume,
//       profile,
//       jobDescription,
//       userId 
//     });

//     const lastResume = await Resume.findOne({ userId }).sort({ version: -1 });
//     const nextVersion = lastResume ? lastResume.version + 1 : 1;

//     const savedResume = await Resume.create({
//       userId,
//       version: nextVersion,
//       text: resume.text,
//       parsedData: {
//         skills: analysis.parsedData.skills
//       },
//       experienceLevel: normalizeExperienceLevel(profile.experience),
//       roles: [profile.targetRole]
//     });

//     return res.json({
//       resumeId: savedResume._id,
//       matchScore: analysis.matchScore,
//       skillComparison: analysis.skillComparison
//     });

//   } catch (err) {
//     console.error("❌ Resume analyze error:", err);
//     return res.status(500).json({ error: "Resume analysis failed" });
//   }
// };

//PHASE5 , delete if below works fine
const analyzeResume = async (req, res) => {
  try {
    console.log("🔥 RESUME ANALYZE CONTROLLER HIT 🔥");

    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { resume, profile, jobDescription } = req.body;

    if (
      !resume?.text ||
      !jobDescription ||
      !profile?.experience ||
      !profile?.targetRole
    ) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    // ✅ SINGLE SOURCE OF TRUTH
    const result = await analyzeResumeService({
      resume,
      profile,
      jobDescription,
      userId
    });

    /*
      ✅ DO NOT:
      - Save Resume here
      - Modify response
      - Pick fields
      - Rename keys
    */

    return res.json(result);

  } catch (err) {
    console.error("❌ Resume analyze error:", err);
    return res.status(500).json({ error: "Resume analysis failed" });
  }
};

/* =====================================================
   🧠 SMART BULLET IMPROVEMENT (CHATGPT-LIKE)
   ===================================================== */

const improveResume = async (req, res) => {
  try {
    const { bullet, role, jobDescription } = req.body;

    if (!bullet || !role || !jobDescription) {
      return res.status(400).json({ error: "bullet, role, and jobDescription are required" });
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
