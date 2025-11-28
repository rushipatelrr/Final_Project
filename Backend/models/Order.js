const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  deliveryLocation: String,
  cartSource: String,
  cartItems: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  restaurantName: String, 
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
