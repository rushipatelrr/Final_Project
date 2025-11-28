const DeliveryBoy = require("../models/DeliveryBoy");

// Get all approved delivery boys
exports.getAllDeliveryBoys = async (req, res) => {
  try {
    const all = await DeliveryBoy.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete a delivery boy (remove from system)
exports.deleteDeliveryBoy = async (req, res) => {
  try {
    await DeliveryBoy.findByIdAndDelete(req.params.id);
    res.json({ msg: "Delivery boy deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
