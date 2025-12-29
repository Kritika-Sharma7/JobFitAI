// const express = require("express");
// const router = express.Router();
// const { login } = require("../controllers/auth.controller");

// router.post("/auth/login", login);

// module.exports = router;


//FOR TEMP SIGNUP ROUTE
const express = require("express");
const router = express.Router();
const { login, signup } = require("../controllers/auth.controller");

router.post("/auth/signup", signup);
router.post("/auth/login", login);

module.exports = router;
