const Order = require("../models/Order");
const Food = require("../models/Food");

exports.createOrder = async (req, res) => {
  try {
    const { items, address } = req.body;
    if (!items || !items.length || !address) {
      return res.status(400).json({ message: "Items and address are required" });
    }
    let totalPrice = 0;
    const orderItems = [];
    for (const item of items) {
      const food = await Food.findById(item.food);
      if (!food || !food.isAvailable) {
        return res.status(400).json({ message: "Item not available" });
      }
      const quantity = Number(item.quantity) || 1;
      totalPrice += food.price * quantity;
      orderItems.push({ food: food._id, name: food.name, price: food.price, quantity });
    }
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalPrice,
      address,
    });
    res.status(201).json(order);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    res.json(await Order.find({ user: req.user._id }).sort("-createdAt"));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    res.json(await Order.find().populate("user", "name email").sort("-createdAt"));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};