const express = require("express");
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
} = require("../controllers/orderController");
const { protect } = require("../middleware/auth.middleware");
const router = express.Router();
// Protect all routes
router.use(protect);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.post("/", createOrder);
router.put("/:id", updateOrder);

module.exports = router;
