const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        food: { type: mongoose.Schema.Types.ObjectId, ref: "Food", required: true },
        name: String,
        price: Number,
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalPrice: { type: Number, required: true },
    address: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "preparing", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);