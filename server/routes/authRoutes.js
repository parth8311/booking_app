const express = require("express");
const router = express.Router();
const {
  register,
  login,
  verifyEmail,
} = require("../controllers/authController");
const validateRequest = require("../middleware/validateRequest");

router.post(
  "/register",
  validateRequest(["firstName", "lastName", "email", "password"]),
  register
);
router.post("/login", validateRequest(["email", "password"]), login);
router.get("/verify-email/:token", verifyEmail);

module.exports = router;
