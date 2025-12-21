// src/utils/analyzeTransform.js

/**
 * Transforms raw backend response into
 * a UI-friendly, consistent structure
 */
export const transformAnalysisData = (raw) => {
  if (!raw || typeof raw !== "object") {
    return getDefaultStructure();
  }

  const text = extractText(raw);

  return {
    role: extractRole(text),
    fitScore: calculateFitScore(text),
    skills: extractSkills(text),
    projects: generateProjects(text),
    resumeBullets: generateResumeBullets(text),
  };
};

/* -------------------- helpers -------------------- */

const extractText = (raw) => {
  if (typeof raw.text === "string") return raw.text.toLowerCase();
  if (typeof raw.analysis === "string") return raw.analysis.toLowerCase();
  return JSON.stringify(raw).toLowerCase();
};

/* -------------------- role -------------------- */

const extractRole = (text) => {
  let level = "Mid-Level";

  if (text.includes("senior") || text.includes("lead")) level = "Senior";
  if (text.includes("junior") || text.includes("entry")) level = "Junior";

  const techStack = pickFrom(text, [
    "react",
    "node",
    "javascript",
    "typescript",
    "python",
    "java",
    "mongodb",
    "postgres",
    "aws",
    "docker",
  ]).slice(0, 5);

  return {
    title: "Software Engineer",
    level,
    techStack: techStack.length ? capitalize(techStack) : ["React", "Node.js"],
  };
};

/* -------------------- fit score -------------------- */

const calculateFitScore = (text) => {
  let score = 72;

  if (text.length > 800) score += 4;
  if (text.includes("react")) score += 3;
  if (text.includes("node")) score += 3;
  if (text.includes("api")) score += 2;

  return Math.min(85, Math.max(70, score));
};

/* -------------------- skills -------------------- */

const extractSkills = (text) => {
  const detected = pickFrom(text, [
    "react",
    "javascript",
    "typescript",
    "node",
    "express",
    "mongodb",
    "postgres",
    "aws",
    "docker",
    "git",
  ]);

  if (!detected.length) {
    return {
      required: ["React", "JavaScript"],
      goodToHave: ["Node.js"],
      missing: ["Docker"],
    };
  }

  const split1 = Math.ceil(detected.length * 0.6);
  const split2 = Math.ceil(detected.length * 0.85);

  return {
    required: capitalize(detected.slice(0, split1)),
    goodToHave: capitalize(detected.slice(split1, split2)),
    missing: capitalize(detected.slice(split2)),
  };
};

/* -------------------- projects -------------------- */

const generateProjects = (text) => {
  const projects = [];

  if (text.includes("frontend") || text.includes("react")) {
    projects.push({
      title: "Frontend Dashboard",
      explanation:
        "A modern React dashboard demonstrating component design, state management, and API integration.",
      techStack: ["React", "Tailwind", "REST APIs"],
    });
  }

  if (text.includes("backend") || text.includes("api")) {
    projects.push({
      title: "Backend API Service",
      explanation:
        "A scalable REST API with authentication, validation, and database integration.",
      techStack: ["Node.js", "Express", "MongoDB"],
    });
  }

  if (projects.length < 2) {
    projects.push({
      title: "Full-Stack Web App",
      explanation:
        "End-to-end application showcasing frontend, backend, and deployment skills.",
      techStack: ["React", "Node.js", "MongoDB"],
    });
  }

  return projects.slice(0, 3);
};

/* -------------------- resume bullets -------------------- */

const generateResumeBullets = (text) => {
  const bullets = [];

  if (text.includes("react")) {
    bullets.push(
      "Built responsive React applications with reusable components and optimized rendering performance."
    );
  }

  if (text.includes("api") || text.includes("backend")) {
    bullets.push(
      "Designed and implemented RESTful APIs with efficient data handling and error management."
    );
  }

  if (text.includes("database")) {
    bullets.push(
      "Designed database schemas and optimized queries to improve application performance."
    );
  }

  if (bullets.length < 3) {
    bullets.push(
      "Collaborated in Agile teams, participated in code reviews, and delivered features on schedule.",
      "Improved application performance and maintainability through clean architecture and best practices."
    );
  }

  return bullets.slice(0, 5);
};

/* -------------------- utils -------------------- */

const pickFrom = (text, list) =>
  list.filter((item) => text.includes(item));

const capitalize = (arr) =>
  arr.map((v) => v.charAt(0).toUpperCase() + v.slice(1));

const getDefaultStructure = () => ({
  role: {
    title: "Software Engineer",
    level: "Mid-Level",
    techStack: ["React", "Node.js"],
  },
  fitScore: 75,
  skills: {
    required: ["React", "JavaScript"],
    goodToHave: ["Node.js"],
    missing: ["Docker"],
  },
  projects: [
    {
      title: "Full-Stack Web App",
      explanation: "Modern web app demonstrating full-stack development.",
      techStack: ["React", "Node.js"],
    },
  ],
  resumeBullets: [
    "Developed modern web applications using React and JavaScript.",
    "Built REST APIs and integrated frontend with backend services.",
    "Collaborated with team members using Git and Agile workflows.",
  ],
});
