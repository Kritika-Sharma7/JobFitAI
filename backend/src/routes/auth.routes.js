// const express = require("express");
// const router = express.Router();
// const { login } = require("../controllers/auth.controller");

// router.post("/auth/login", login);

// module.exports = router;


//FOR TEMP SIGNUP ROUTE
const express = require("express");
const router = express.Router();
const { login, signup, getProfile, updateProfile, changePassword, deleteAccount } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.get("/auth/profile", authMiddleware, getProfile);
router.put("/auth/profile", authMiddleware, updateProfile);
router.post("/auth/change-password", authMiddleware, changePassword);
router.delete("/auth/account", authMiddleware, deleteAccount);

module.exports = router;
