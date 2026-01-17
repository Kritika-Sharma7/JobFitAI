// const Resume = require("../models/Resume.model");
// const JD = require("../models/JD.model");

// const {
//   compareSkills,
//   calculateMatchScore,
//   generateRecommendations
// } = require("../utils/matching.util");

// async function matchResumeWithJDService({ jdId, userId }) {

//   /* ---------- FETCH RESUME ---------- */
//   const resume = await Resume.findOne({ userId })
//     .sort({ createdAt: -1 });

//   if (!resume) {
//     throw new Error("Resume not found");
//   }

//   /* ---------- FETCH JD ---------- */
//   const jd = await JD.findById(jdId);

//   if (!jd) {
//     throw new Error("Job Description not found");
//   }

//   /* ---------- MATCHING ---------- */
//   const comparison = compareSkills(
//     resume.parsedData.skills, // [{ name, confidence }]
//     jd.skills                 // ["React", "JS", ...]
//   );

//   const matchScore = calculateMatchScore(comparison);
//   const recommendations = generateRecommendations(comparison.missing);

//   /* ---------- FINAL RESPONSE ---------- */
//   return {
//     matchScore,
//     skillComparison: comparison,
//     recommendations
//   };
// }

// module.exports = matchResumeWithJDService;


const Resume = require("../models/Resume.model");
const JobDescription = require("../models/JobDescription");
const JDAnalysis = require("../models/JDAnalysis.model");
const {
  compareSkills,
  calculateMatchScore,
  generateRecommendations
} = require("../utils/matching.util");

async function matchResumeWithJDService({ jdId, userId }) {
  console.log("🔄 Matching resume for user:", userId, "with JD:", jdId);

  // First, try to get pre-calculated match from JDAnalysis by its _id
  try {
    const jdAnalysis = await JDAnalysis.findOne({ _id: jdId, userId });
    
    if (jdAnalysis && jdAnalysis.skills) {
      console.log("📊 Found existing JDAnalysis with match data for ID:", jdId);
      return {
        matchScore: jdAnalysis.matchScore || 0,
        skillComparison: {
          matched: jdAnalysis.skills.matched || [],
          partial: jdAnalysis.skills.partial || [],
          missing: jdAnalysis.skills.missing || []
        },
        recommendations: generateRecommendations(jdAnalysis.skills.missing || []),
        role: jdAnalysis.role,
        jdText: jdAnalysis.jdText,
        resumeText: jdAnalysis.resumeText
      };
    }
  } catch (err) {
    console.log("JDAnalysis lookup by _id failed, trying other methods");
  }

  // Try finding by jdId field if it exists
  try {
    const jdAnalysis = await JDAnalysis.findOne({ jdId, userId });
    
    if (jdAnalysis && jdAnalysis.skills) {
      console.log("📊 Found existing JDAnalysis with match data");
      return {
        matchScore: jdAnalysis.matchScore || 0,
        skillComparison: {
          matched: jdAnalysis.skills.matched || [],
          partial: jdAnalysis.skills.partial || [],
          missing: jdAnalysis.skills.missing || []
        },
        recommendations: generateRecommendations(jdAnalysis.skills.missing || []),
        role: jdAnalysis.role,
        jdText: jdAnalysis.jdText,
        resumeText: jdAnalysis.resumeText
      };
    }
  } catch (err) {
    console.log("JDAnalysis lookup failed, falling back to live comparison");
  }

  // Fallback: do live comparison
  const resume = await Resume.findOne({ userId }).sort({ version: -1 });
  if (!resume) {
    console.log("⚠️ No resume found for user:", userId);
    // Return empty match instead of throwing
    return {
      matchScore: 0,
      skillComparison: {
        matched: [],
        partial: [],
        missing: []
      },
      recommendations: [],
      message: "No resume found. Please upload your resume first."
    };
  }

  const jd = await JobDescription.findById(jdId);
  if (!jd) {
    console.log("⚠️ No JD found with ID:", jdId);
    return {
      matchScore: 0,
      skillComparison: {
        matched: [],
        partial: [],
        missing: []
      },
      recommendations: [],
      message: "Job description not found."
    };
  }

  console.log("📄 Found Resume (v" + resume.version + ") and JD, computing match...");

  const comparison = compareSkills(
    resume.parsedData?.skills || [],
    jd.skills || []
  );

  const matchScore = calculateMatchScore(comparison);
  const recommendations = generateRecommendations(comparison.missing || []);

  return {
    matchScore,
    skillComparison: comparison,
    recommendations
  };
}

module.exports = matchResumeWithJDService;




