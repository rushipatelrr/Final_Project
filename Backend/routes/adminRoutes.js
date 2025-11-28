const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

// Get all pending delivery boys
router.get(
  "/delivery-boys",
  authMiddleware,
  adminController.getPendingDeliveryBoys
);
// Accept delivery boy
router.post(
  "/delivery-boys/:id/accept",
  authMiddleware,
  adminController.acceptDeliveryBoy
);
// Reject delivery boy
router.post(
  "/delivery-boys/:id/reject",
  authMiddleware,
  adminController.rejectDeliveryBoy
);

module.exports = router;
