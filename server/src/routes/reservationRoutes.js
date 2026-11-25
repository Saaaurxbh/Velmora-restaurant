const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware");
const r = require("../controllers/reservationController");

const router = express.Router();

router.post("/", protect, r.createReservation);
router.get("/my", protect, r.getMyReservations);
router.put("/:id/cancel", protect, r.cancelMyReservation);
router.get("/", protect, authorize("admin"), r.getAllReservations);
router.put("/:id/status", protect, authorize("admin"), r.updateReservationStatus);

module.exports = router;