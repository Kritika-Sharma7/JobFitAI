// console.log("🔥🔥🔥 THIS APP.JS IS RUNNING 🔥🔥🔥", __filename);

// console.log("🔥🔥🔥 CORRECT app.js FILE LOADED 🔥🔥🔥");


const express = require("express");
const cors = require("cors");

console.log("🔥 app.js loaded");

const app = express();

/* ================== MIDDLEWARE ================== */
app.use(cors());
app.use(express.json());

/* ================== ROUTES ================== */
const jobRoutes = require("./routes/job.routes");
const testRoutes = require("./routes/test.routes");

app.use("/api", jobRoutes);
app.use("/api", testRoutes);

/* ================== HEALTH CHECK ================== */
app.get("/ping", (req, res) => {
  console.log("🏓 Ping route hit");
  res.json({ message: "Backend is alive" });
});

module.exports = app;
