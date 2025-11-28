const PendingDeliveryBoy = require("../models/PendingDeliveryBoy");
const DeliveryBoy = require("../models/DeliveryBoy");
const bcrypt = require("bcryptjs");
const sendMail = require("../utils/sendMail");

// Get all pending delivery boys
exports.getAllPending = async (req, res) => {
  try {
    const pending = await PendingDeliveryBoy.find();
    res.json(pending);
  } catch (err) {
    res.status(500).json({ msg: err.message || "Server error" });
  }
};

// Approve (move to DeliveryBoy + delete from pending)
// Approve (move to DeliveryBoy + delete from pending)
exports.approve = async (req, res) => {
  try {
    const pending = await PendingDeliveryBoy.findById(req.params.id);
    if (!pending) return res.status(404).json({ msg: "Not found" });

    const hashedPassword = await bcrypt.hash(pending.password, 10);

    const deliveryBoy = new DeliveryBoy({
      name: pending.name,
      email: pending.email,
      password: hashedPassword,
      sex: pending.sex,
      vehicle: pending.vehicle,
      mobile: pending.mobile,
      image: pending.image,
      address: pending.address,
      role: "delivery",
      isApproved: true,
    });

    await deliveryBoy.save();
    await PendingDeliveryBoy.findByIdAndDelete(req.params.id);

    // ✅ Styled Approval Mail
    await sendMail(
      pending.email,
      "🎉 Approval - Campus Cravings",
      `Hello ${pending.name}, your application is approved.`,
      `
        <div style="font-family: Arial, sans-serif; padding:20px; border:1px solid #eee; border-radius:8px;">
          <h2 style="color:#2e7d32;">Congratulations, ${pending.name}!</h2>
          <p>Your application as a <b>Delivery Partner</b> at <b>Campus Cravings</b> has been <span style="color:green;">approved</span>.</p>
          <p>You can now <a href="https://yourapp.com/login" style="color:#1976d2;">log in</a> and start delivering orders 🚴‍♂️</p>
          <br/>
          <p>Welcome aboard,<br/><b>Campus Cravings Team</b></p>
        </div>
      `
    );

    res.json({ msg: "Approved and moved to DeliveryBoy", deliveryBoy });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Reject (delete from pending)
exports.reject = async (req, res) => {
  try {
    const pending = await PendingDeliveryBoy.findById(req.params.id);
    if (!pending) return res.status(404).json({ msg: "Not found" });

    await PendingDeliveryBoy.findByIdAndDelete(req.params.id);

    // ❌ Styled Rejection Mail
    await sendMail(
      pending.email,
      "❌ Rejection - Campus Cravings",
      `Hello ${pending.name}, your application is rejected.`,
      `
        <div style="font-family: Arial, sans-serif; padding:20px; border:1px solid #eee; border-radius:8px;">
          <h2 style="color:#c62828;">Hello ${pending.name},</h2>
          <p>Thank you for applying as a <b>Delivery Partner</b> with <b>Campus Cravings</b>.</p>
          <p>Unfortunately, your application has been <span style="color:red;">rejected</span> at this time.</p>
          <p>We truly appreciate your interest and wish you success in the future.</p>
          <br/>
          <p>Sincerely,<br/><b>Campus Cravings Team</b></p>
        </div>
      `
    );

    res.json({ msg: "Rejected and deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
