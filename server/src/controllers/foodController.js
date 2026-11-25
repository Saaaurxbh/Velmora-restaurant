const Food = require("../models/Food");

exports.getFoods = async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    res.json(await Food.find(filter).populate("category", "name").sort("name"));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate("category", "name");
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.json(food);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.createFood = async (req, res) => {
  try {
    const food = await Food.create(req.body);
    res.status(201).json(food);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.updateFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.json(food);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.json({ message: "Food deleted" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};