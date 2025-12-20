const analyzeJD = (req, res) => {
  res.json({
    skills: ["React", "Node.js"],
    projects: ["JobFit AI"],
    resumePoints: ["Built a MERN-based platform"]
  });
};

module.exports = { analyzeJD };
