const phase3Result = {
  role: {
    title: "Frontend Engineer",
    experience: "Mid-Level",
    stack: ["React", "JavaScript", "TypeScript", "Tailwind CSS"]
  },

  fitScore: 78,

  scoreBreakdown: {
    skills: 42,
    experience: 18,
    keywords: 18
  },

  skills: [
    { name: "React", category: "must_have" },
    { name: "JavaScript", category: "must_have" },
    { name: "TypeScript", category: "missing_high" },
    { name: "Tailwind CSS", category: "good_to_have" }
  ],

  projects: [
    {
      title: "Frontend Analytics Dashboard",
      skillsProved: ["React", "REST APIs"],
      jdMapping: [
        "Build reusable components",
        "Integrate REST APIs"
      ]
    }
  ],

  resumeBullets: [
    {
      original: "Built a React app",
      optimized:
        "Built a React-based dashboard using reusable components and REST API integration aligned with frontend role requirements"
    }
  ]
};

export default phase3Result;
