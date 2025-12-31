// // console.log("🔥🔥🔥 THIS APP.JS IS RUNNING 🔥🔥🔥", __filename);

// // console.log("🔥🔥🔥 CORRECT app.js FILE LOADED 🔥🔥🔥");


// const express = require("express");
// const cors = require("cors");

// console.log("🔥 app.js loaded");
// const logger = require("./utils/logger");
// logger.log("🔥 app.js loaded");


// const app = express();

// /* ================== MIDDLEWARE ================== */
// app.use(cors());
// app.use(express.json());

// /* ================== ROUTES ================== */
// const jobRoutes = require("./routes/job.routes");
// const testRoutes = require("./routes/test.routes");
// const resumeRoutes = require("./routes/resume.routes");
// const resumeMatchRoutes = require("./routes/resume.match.routes");
// const atsRoutes = require("./routes/ats.routes");
// const roadmapRoutes = require("./routes/roadmap.routes");
// const dashboardRoutes = require("./routes/dashboard.routes");
// const errorHandler = require("./middlewares/error.middleware");
// const apiLimiter = require("./middlewares/rateLimiter");

// app.use("/api", jobRoutes);
// app.use("/api", testRoutes);
// app.use("/api/resume", resumeRoutes);
// app.use("/resume", resumeMatchRoutes);
// app.use("/api/ats", atsRoutes);
// app.use("/api", roadmapRoutes);
// app.use("/api", dashboardRoutes);
// app.use(errorHandler);
// app.use("/api", apiLimiter);

// /* ================== HEALTH CHECK ================== */
// app.get("/ping", (req, res) => {
//   console.log("🏓 Ping route hit");
//   res.json({ message: "Backend is alive" });
// });

// module.exports = app;


const express = require("express");
const cors = require("cors");

console.log("🔥 app.js loaded");

const app = express();

app.use(cors());
app.use(express.json());

const apiLimiter = require("./middlewares/rateLimiter");
const analysisRoutes = require("./routes/analysis.routes");
const authRoutes = require("./routes/auth.routes");


app.use("/api", apiLimiter);

app.use("/api", require("./routes/job.routes"));
app.use("/api", require("./routes/test.routes"));
app.use("/api/resume", require("./routes/resume.routes"));
app.use("/api/resume", require("./routes/resume.match.routes"));//RS 31Dec
app.use("/api/ats", require("./routes/ats.routes"));
app.use("/api", require("./routes/roadmap.routes"));
app.use("/api", require("./routes/dashboard.routes"));
app.use("/api", analysisRoutes);
app.use("/api", authRoutes);


const errorHandler = require("./middlewares/error.middleware");
app.use(errorHandler);

app.get("/ping", (req, res) => {
  res.json({ message: "Backend alive" });
});

module.exports = app;
