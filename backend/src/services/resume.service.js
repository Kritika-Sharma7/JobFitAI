const Resume = require("../models/Resume.model");
const JDMatch = require("../models/JDMatch.model");
const { extractSkillsFromText } = require("../utils/resume.util");
const { extractJDSkills } = require("../utils/ats.util");

async function analyzeResumeService({ resume, profile, jobDescription, jdId = "latest_jd" }) {
  const resumeText = resume.text || "";

  /* ---------- SKILL EXTRACTION ---------- */
  const resumeSkills = extractSkillsFromText(resumeText).map(skill => ({
    name: skill,
    confidence: 0.7
  }));

  const jdSkills = extractJDSkills(jobDescription);

  /* ---------- MATCHING ---------- */
  const matched = [];
  const partial = [];
  const missing = [];

  jdSkills.forEach(skill => {
    const found = resumeSkills.find(
      rs => rs.name.toLowerCase() === skill.toLowerCase()
    );

    if (found && found.confidence >= 0.6) {
      matched.push(skill);
    } else if (found) {
      partial.push(skill);
    } else {
      missing.push(skill);
    }
  });

  const matchScore = calculateMatchScore({
    matched,
    partial,
    experience: profile.experience
  });

  const summary = generateSummary(matchScore, missing);

  /* ---------- RESUME VERSIONING ---------- */
  const lastResume = await Resume.findOne({ userId: "demo-user" })
    .sort({ version: -1 });

  const nextVersion = lastResume ? lastResume.version + 1 : 1;

  await Resume.create({
    userId: "demo-user",
    version: nextVersion,
    text: resumeText,
    parsedData: {
      skills: resumeSkills,
      experienceLevel: profile.experience,
      roles: [profile.targetRole]
    }
  });

  /* ---------- JD MATCH HISTORY ---------- */
  await JDMatch.create({
    userId: "demo-user",
    jdId,
    matchScore,
    verdict: summary.verdict
  });

  /* ---------- RESPONSE (FRONTEND SAFE) ---------- */
  return {
    matchScore,
    skillComparison: {
      matched,
      partial,
      missing
    },
    summary
  };
}

/* ---------- HELPERS ---------- */

function calculateMatchScore({ matched, partial, experience }) {
  let score = 0;

  score += matched.length * 12;
  score += partial.length * 6;

  if (experience === "1-3") score += 12;
  if (experience === "3+") score += 18;

  return Math.min(Math.max(score, 0), 92);
}

function generateSummary(score, missing) {
  let verdict = "Low Match";

  if (score >= 75) verdict = "Strong Match";
  else if (score >= 45) verdict = "Partial Match";

  return {
    verdict,
    shortInsight:
      missing.length > 0
        ? `Missing ${missing.slice(0, 2).join(", ")} skills.`
        : "Strong alignment with job requirements."
  };
}

module.exports = analyzeResumeService;
