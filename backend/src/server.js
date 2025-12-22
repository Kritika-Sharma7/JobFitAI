require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;
// console.log("🚀 SERVER FILE:", __filename);

console.log("🚀 server.js loaded");

const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// 🔒 PREVENT NODE 24 FROM EXITING
setInterval(() => {}, 1 << 30);

// 🔍 LOG ANY CRASH
process.on("uncaughtException", (err) => {
  console.error("❌ UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("❌ UNHANDLED PROMISE REJECTION:", err);
});
