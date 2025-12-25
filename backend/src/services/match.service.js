function matchResumeWithJD(resume, jd) {
  const matched = resume.skills.filter(s => jd.skills.must_have.includes(s));
  const missing = jd.skills.must_have.filter(s => !resume.skills.includes(s));

  return {
    matchScore: Math.min(90, matched.length * 15),
    skillsMatched: matched,
    skillsMissing: missing
  };
}

module.exports = { matchResumeWithJD };
