const express = require("express");
const router = express.Router();
const { placeOrder, getUserOrders } = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/checkout", authMiddleware, placeOrder);
router.get("/my-orders", authMiddleware, getUserOrders);

module.exports = router;
