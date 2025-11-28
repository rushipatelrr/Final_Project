const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String }, 
    image: { type: String }, 
    rating: { type: Number, default: 4.3 },
    reviews: { type: Number, default: 0 },
    price: { type: Number, default: 400 }, 
    offer: { type: String },
    veg: { type: Boolean, default: true },
    tags: [String],
    deliveryTime: { type: String, default: "30 mins" },
    distance: { type: String, default: "2.5 km" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
