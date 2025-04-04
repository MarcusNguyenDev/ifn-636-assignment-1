const Order = require("../models/Order");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "first_name last_name email")
      .lean();
    // Reverse the orders so the latest orders appear first
    res.status(200).json(orders.reverse());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("users", "first_name last_name email")
      .lean();
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const { user, menu, total_price } = req.body;
    if (!user || !menu || !menu.length || total_price == null) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newOrder = new Order({ user, menu, total_price });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    let { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }
    status = status.toUpperCase();
    const allowedStatuses = ["PENDING", "COOKING", "FINALISED"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: `Status must be one of: ${allowedStatuses.join(", ")}`,
      });
    }
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
