const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//TEMP SIGNUP ROUTE
exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      passwordHash
    });

    return res.json({
      success: true,
      userId: user._id
    });
  } catch (err) {
    console.error("❌ Signup error:", err);
    return res.status(500).json({ error: "Signup failed" });
  }
};



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      userId: user._id
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    return res.status(500).json({ error: "Login failed" });
  }
};
