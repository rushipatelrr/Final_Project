const mongoose = require("mongoose");

const deliveryBoySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    sex: { type: String },
   
    mobile: { type: String },

    address: { type: String },
    createdAt: { type: Date, default: Date.now },
    role: { type: String, default: "delivery" },
    isApproved: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DeliveryBoy", deliveryBoySchema);
