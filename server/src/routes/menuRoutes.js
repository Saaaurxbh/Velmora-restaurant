const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware");
const cat = require("../controllers/categoryController");
const food = require("../controllers/foodController");

const router = express.Router();
const admin = [protect, authorize("admin")];

router.get("/categories", cat.getCategories);
router.post("/categories", ...admin, cat.createCategory);
router.put("/categories/:id", ...admin, cat.updateCategory);
router.delete("/categories/:id", ...admin, cat.deleteCategory);

router.get("/foods", food.getFoods);
router.get("/foods/:id", food.getFood);
router.post("/foods", ...admin, food.createFood);
router.put("/foods/:id", ...admin, food.updateFood);
router.delete("/foods/:id", ...admin, food.deleteFood);

module.exports = router;