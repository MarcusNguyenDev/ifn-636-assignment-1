const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  item_name: { type: String, required: true },
  price: { type: String, required: true },
});

module.exports = mongoose.model("Menu", menuSchema);
