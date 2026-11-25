require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); 

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "VELMORA API is running" });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/menuRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/reservations", require("./routes/reservationRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});