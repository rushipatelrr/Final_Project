const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Mongo error", err));

const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/order", orderRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

const deliveryBoyRoutes = require("./routes/deliveryBoyRoutes");
app.use("/api/deliveryboys", deliveryBoyRoutes);

const pendingDeliveryBoyRoutes = require("./routes/pendingDeliveryBoyRoutes");
app.use("/api/pending-deliveryboys", pendingDeliveryBoyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
