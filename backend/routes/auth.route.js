const express = require("express");
const {
  registerUser,
  loginUser,
  updateUserProfile,
  getProfile,
  validateProfile,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateUserProfile);

module.exports = router;
