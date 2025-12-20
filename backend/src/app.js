const express = require("express");
const cors = require("cors");

const jobRoutes = require("./routes/job.routes");

const app = express();

app.use(cors());
app.use(express.json());

// 👇 THIS LINE IS CRITICAL
app.use("/api", jobRoutes);

module.exports = app;

app.post("/test", (req, res) => {
  res.json({ message: "Test route working" });
});
