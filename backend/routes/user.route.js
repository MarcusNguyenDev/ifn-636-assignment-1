const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
} = require("../controllers/userController");

const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", protect, getUsers);
router.get("/:id", protect, getUserById);
router.post("/", protect, createUser);
router.delete("/:id", protect, deleteUser);

module.exports = router;
