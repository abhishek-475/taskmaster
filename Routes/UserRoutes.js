const express = require("express");
const userController = require("../Controllers/UserController");
const jwt = require("../Middlewares/jwtmidleware");

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", jwt, userController.getProfile);

module.exports = router;
