const express = require("express");
const {
  getMenu,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
} = require("../controllers/menuController");

const { protect } = require("../middleware/auth.middleware");

const router = express.Router();
router.get("/", getMenu);
router.get("/:id", getMenuById);
router.post("/", protect, createMenu);
router.put("/:id", protect, updateMenu);
router.delete("/:id", protect, deleteMenu);

module.exports = router;
