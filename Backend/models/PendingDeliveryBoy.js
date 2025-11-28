const mongoose = require("mongoose");

const pendingDeliveryBoySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    sex: { type: String },
    vehicle: { type: String },
    mobile: { type: String },
    image: { type: String },
    address: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PendingDeliveryBoy", pendingDeliveryBoySchema);
