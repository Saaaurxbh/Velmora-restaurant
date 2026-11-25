const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware");
const order = require("../controllers/orderController");

const router = express.Router();

router.post("/", protect, order.createOrder);
router.get("/my", protect, order.getMyOrders);
router.get("/", protect, authorize("admin"), order.getAllOrders);
router.put("/:id/status", protect, authorize("admin"), order.updateOrderStatus);

module.exports = router;