/*
  =====================================================
  ROADMAP SERVICE
  =====================================================
  Generates personalized learning roadmaps based on
  skill gaps between resume and job description.
  =====================================================
*/

const Resume = require("../models/Resume.model");
const JobDescription = require("../models/JobDescription");
const JDAnalysis = require("../models/JDAnalysis.model");
const { compareSkills } = require("../utils/matching.util");
const { chat } = require("./openai.service");

/* =====================================================
   AI ROADMAP GENERATOR
   ===================================================== */
async function generateDetailedRoadmap({ missingSkills, role, experience }) {
  console.log("🤖 Generating detailed roadmap for:", { role, experience, missingSkills });

  const prompt = `
You are a senior career coach creating a personalized learning roadmap.

Target Role: ${role}
Candidate Experience: ${experience}
Skills to Learn: ${missingSkills.join(", ")}

For EACH skill, create a detailed learning plan with:
1. Priority (must_have or good_to_have)
2. Difficulty level (Beginner, Intermediate, Advanced)
3. 3-4 specific learning steps
4. A practical project idea with clear outcomes

Return JSON ONLY in this format:
[
  {
    "skill": "Skill Name",
    "priority": "must_have",
    "difficulty": "Intermediate",
    "learningPlan": [
      "Step 1: Learn fundamentals",
      "Step 2: Practice with exercises",
      "Step 3: Build small project",
      "Step 4: Apply in real scenario"
    ],
    "project": {
      "title": "Project Title",
      "description": "What to build and why",
      "outcome": "What this proves to employers"
    }
  }
]

Be specific to the ${role} role. Make projects realistic and resume-worthy.
`;

  try {
    const raw = await chat(prompt, 0.5);
    
    // Parse and validate response
    const cleaned = raw
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();
    
    const roadmap = JSON.parse(cleaned);
    
    // Validate structure
    if (!Array.isArray(roadmap)) {
      throw new Error("Invalid roadmap format");
    }
    
    return roadmap;
  } catch (err) {
    console.error("❌ Roadmap AI generation failed:", err.message);
    
    // Fallback: Generate basic roadmap
    return missingSkills.map(skill => ({
      skill,
      priority: "good_to_have",
      difficulty: scaleDifficulty(experience),
      learningPlan: [
        `Learn ${skill} fundamentals through documentation and tutorials`,
        `Practice ${skill} with hands-on exercises`,
        `Build a small project using ${skill}`,
        `Integrate ${skill} into a larger portfolio project`
      ],
      project: {
        title: `${skill} Portfolio Project`,
        description: `Build a practical project demonstrating ${skill} proficiency`,
        outcome: `Proves hands-on experience with ${skill} for ${role} positions`
      }
    }));
  }
}

/* =====================================================
   DIFFICULTY SCALING
   ===================================================== */
function scaleDifficulty(exp) {
  if (!exp) return "Intermediate";
  
  const normalized = exp.toLowerCase();
  
  if (normalized.includes("intern") || normalized.includes("fresher")) {
    return "Beginner";
  }
  if (normalized.includes("1-3") || normalized.includes("0-2")) {
    return "Intermediate";
  }
  if (normalized.includes("3+") || normalized.includes("5+") || normalized.includes("senior")) {
    return "Advanced";
  }
  
  return "Intermediate";
}

/* =====================================================
   MAIN SERVICE FUNCTION
   ===================================================== */
async function generateRoadmapService({ jdId, userId }) {
  console.log("🗺️ Generating roadmap for JD:", jdId, "User:", userId);

  let missingSkills = [];
  let role = "Target Role";
  let experience = "Fresher";

  // Step 1: Try to find the JobDescription first (this is what we receive)
  let jd = null;
  try {
    jd = await JobDescription.findById(jdId);
    if (jd) {
      role = jd.role || "Target Role";
      experience = jd.experience || "Fresher";
      console.log("📄 Found JobDescription:", { role, experience, skills: jd.skills?.length });
    }
  } catch (err) {
    console.log("JobDescription lookup failed:", err.message);
  }

  // Step 2: Get the user's latest resume
  let resume = null;
  try {
    resume = await Resume.findOne({ userId }).sort({ version: -1 });
    if (resume) {
      experience = resume.experienceLevel || experience;
      console.log("📄 Found Resume:", { version: resume.version, skills: resume.parsedData?.skills?.length });
    }
  } catch (err) {
    console.log("Resume lookup failed:", err.message);
  }

  // Step 3: Try to get JDAnalysis for pre-calculated missing skills
  let jdAnalysis = null;
  try {
    // Look for JDAnalysis that matches this user's recent analysis
    jdAnalysis = await JDAnalysis.findOne({ userId }).sort({ createdAt: -1 });
    
    if (jdAnalysis && jdAnalysis.skills?.missing) {
      missingSkills = jdAnalysis.skills.missing;
      role = jdAnalysis.role || role;
      experience = jdAnalysis.experienceLevel || experience;
      console.log("📊 Found JDAnalysis with missing skills:", missingSkills.length);
    }
  } catch (err) {
    console.log("JDAnalysis lookup failed:", err.message);
  }

  // Step 4: Fallback - compare resume skills with JD skills
  if (missingSkills.length === 0 && jd && resume) {
    try {
      const comparison = compareSkills(
        resume.parsedData?.skills || [],
        jd.skills || []
      );
      missingSkills = comparison.missing || [];
      console.log("🔄 Calculated missing skills from comparison:", missingSkills.length);
    } catch (err) {
      console.error("Skill comparison failed:", err.message);
    }
  }

  // Step 5: Last resort - use JD skills as missing if no resume
  if (missingSkills.length === 0 && jd && jd.skills) {
    missingSkills = jd.skills.slice(0, 5);
    console.log("⚠️ Using JD skills as missing skills (no resume found):", missingSkills.length);
  }

  // If still no missing skills, return empty roadmap
  if (!missingSkills || missingSkills.length === 0) {
    return {
      jdId,
      role,
      targetRole: role,
      totalMissingSkills: 0,
      roadmap: [],
      message: "No skill gaps detected - your resume covers the key requirements!"
    };
  }

  // Generate AI-powered roadmap
  const roadmap = await generateDetailedRoadmap({
    missingSkills: missingSkills.slice(0, 5), // Limit to top 5 skills
    role,
    experience
  });

  return {
    jdId,
    role,
    targetRole: role,
    totalMissingSkills: missingSkills.length,
    roadmap
  };
}

module.exports = generateRoadmapService;
