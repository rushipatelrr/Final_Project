const User = require("../models/User");
const nodemailer = require("nodemailer");

// Get all delivery boys pending approval
exports.getPendingDeliveryBoys = async (req, res) => {
  try {
    const deliveryBoys = await User.find({
      role: "delivery",
      isApproved: false,
    });
    res.json({ deliveryBoys });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Accept delivery boy
exports.acceptDeliveryBoy = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { isApproved: true },
      { new: true }
    );
    if (!user) return res.status(404).json({ msg: "User not found" });
    // Send email notification
    await sendApprovalEmail(user.email, user.name);
    res.json({ msg: "Delivery boy approved", user });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Reject delivery boy (delete user)
exports.rejectDeliveryBoy = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json({ msg: "Delivery boy rejected and deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Helper: Send approval email
async function sendApprovalEmail(email, name) {
  // Configure your transporter (update with your SMTP details)
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Delivery Boy Approved",
    text: `Hello ${name},\n\nYour account has been approved. You can now log in as a delivery boy.\n\nThank you!`,
  };

  await transporter.sendMail(mailOptions);
}
