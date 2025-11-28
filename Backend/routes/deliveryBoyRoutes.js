const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/deliveryBoyController");

router.get("/all", ctrl.getAllDeliveryBoys);
router.delete("/:id", ctrl.deleteDeliveryBoy);

module.exports = router;
