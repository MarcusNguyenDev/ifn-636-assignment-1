const Menu = require("../models/Menu.js");

const getMenu = async (req, res) => {
  try {
    const menu = await Menu.find();
    res.status(200).json(menu.reverse());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMenu = async (req, res) => {
  try {
    const { item_name, price } = req.body;
    const newMenu = new Menu({ item_name, price });
    await newMenu.save();
    res.status(201).json(newMenu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMenu = async (req, res) => {
  try {
    const { item_name, price } = req.body;
    const menu = await Menu.findByIdAndUpdate(
      req.params.id,
      { item_name, price },
      { new: true },
    );
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.status(200).json({ message: "Menu deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateMenu, createMenu, getMenu, getMenuById, deleteMenu };
