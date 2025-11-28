const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      deliveryLocation,
      cartSource,
      cartItems,
      totalAmount,
      restaurantName,
    } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = new Order({
      user: req.user.id,
      firstName,
      lastName,
      email,
      phone,
      deliveryLocation,
      cartSource,
      cartItems,
      totalAmount,
      restaurantName, // ✅ include in schema
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error("Order creation failed:", error); // ✅ Log exact error
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Failed to fetch orders." });
  }
};
