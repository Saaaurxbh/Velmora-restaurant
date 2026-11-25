const Reservation = require("../models/Reservation");

exports.createReservation = async (req, res) => {
  try {
    const { date, time, guests, note } = req.body;
    if (!date || !time || !guests) {
      return res.status(400).json({ message: "Date, time and guests are required" });
    }
    const reservation = await Reservation.create({
      user: req.user._id,
      date,
      time,
      guests,
      note,
    });
    res.status(201).json(reservation);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.getMyReservations = async (req, res) => {
  try {
    res.json(await Reservation.find({ user: req.user._id }).sort("-date"));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    res.json(await Reservation.find().populate("user", "name email").sort("-date"));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.updateReservationStatus = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!reservation) return res.status(404).json({ message: "Reservation not found" });
    res.json(reservation);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.cancelMyReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findOne({ _id: req.params.id, user: req.user._id });
    if (!reservation) return res.status(404).json({ message: "Reservation not found" });
    reservation.status = "cancelled";
    await reservation.save();
    res.json(reservation);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};