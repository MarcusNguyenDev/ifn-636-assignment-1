const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  menu: [
    {
      item_name: { type: String, required: true },
      price: { type: String, required: true },
    },
  ],
  total_price: { type: Number, required: true },
  status: { type: String, required: true, default: "Pending" },
});

module.exports = mongoose.model("Order", orderSchema);
