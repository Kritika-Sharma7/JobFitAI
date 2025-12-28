// const analyzeResumeService = require("../services/resume.service");
// const { improveResumeBullet } = require("../services/ats.service");


// /**
//  * POST /resume/analyze
//  */
// const analyzeResume = async (req, res) => {
//   try {
//     const { resume, profile, jobDescription } = req.body;

//     if (!jobDescription) {
//       return res.status(400).json({ error: "jobDescription is required" });
//     }

//     if (!profile?.experience || !profile?.targetRole) {
//       return res.status(400).json({
//         error: "profile.experience and profile.targetRole are required"
//       });
//     }

//     if (!resume?.text && !resume?.fileUrl) {
//       return res.status(400).json({
//         error: "Either resume.text or resume.fileUrl is required"
//       });
//     }

//     const result = await analyzeResumeService({
//       resume,
//       profile,
//       jobDescription
//     });

//     return res.json(result); // 🔥 EXACT frontend contract
//   } catch (err) {
//     console.error("❌ Resume analyze error:", err);
//     return res.status(500).json({ error: "Resume analysis failed" });
//   }
// };

// /**
//  * POST /resume/improve
//  * Body:
//  * {
//  *   bullet: string,
//  *   role: string
//  * }
//  */
// const improveResume = async (req, res) => {
//   try {
//     const { bullet, role } = req.body;

//     if (!bullet || bullet.length < 10) {
//       return res.status(400).json({
//         error: "Invalid resume bullet"
//       });
//     }

//     const result = improveResumeBullet(bullet, role);

//     return res.json(result);
//   } catch (error) {
//     console.error("❌ Resume improve error:", error);
//     return res.status(500).json({
//       error: "Resume improvement failed"
//     });
//   }
// };

// module.exports = {
//   analyzeResume,
//   improveResume
// };


const Resume = require("../models/Resume.model");
const analyzeResumeService = require("../services/resume.service");
const { improveResumeBullet } = require("../services/ats.service");

function normalizeExperienceLevel(exp) {
  if (!exp) return exp;

  const normalized = exp.toLowerCase().replace(/\s+/g, "").replace("–", "-");

  const map = {
    "fresher": "Fresher",

    "0-2years": "1-3",
    "2-5years": "3+",
    "5+years": "3+",

    // safety / fallback
    "intern": "Intern",
    "1-3": "1-3",
    "3+": "3+"
  };

  return map[normalized] || "Fresher";
}


const analyzeResume = async (req, res) => {
  try {
    console.log("🔥 RESUME ANALYZE CONTROLLER HIT 🔥");

    const { resume, profile, jobDescription } = req.body;
    const userId = "demo-user";

    if (!jobDescription || !profile?.experience || !profile?.targetRole) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    const analysis = await analyzeResumeService({
      resume,
      profile,
      jobDescription
    });

    const lastResume = await Resume.findOne({ userId }).sort({ version: -1 });
    const nextVersion = lastResume ? lastResume.version + 1 : 1;

    const savedResume = await Resume.create({
      userId,
      version: nextVersion,
      text: resume.text || "",
      parsedData: {
        skills: analysis.parsedData.skills
      },
      experienceLevel: normalizeExperienceLevel(profile.experience),//RS CHANGED
      roles: [profile.targetRole]
    });

    return res.json({
      resumeId: savedResume._id,
      matchScore: analysis.matchScore,
      skillComparison: analysis.skillComparison
    });

  } catch (err) {
    console.error("❌ Resume analyze error:", err);
    return res.status(500).json({ error: "Resume analysis failed" });
  }
};

const improveResume = async (req, res) => {
  const { bullet, role } = req.body;

  if (!bullet) {
    return res.status(400).json({ error: "Bullet required" });
  }

  return res.json(improveResumeBullet(bullet, role));
};

module.exports = { analyzeResume, improveResume };



