const express = require("express");
const router = express.Router();
const pendingCtrl = require("../controllers/pendingDeliveryBoyController");

router.get("/", pendingCtrl.getAllPending);
router.put("/approve/:id", pendingCtrl.approve);
router.delete("/reject/:id", pendingCtrl.reject);

module.exports = router;
