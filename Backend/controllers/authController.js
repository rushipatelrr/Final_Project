const User = require("../models/User");
const PendingDeliveryBoy = require("../models/PendingDeliveryBoy");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    role,
    sex,
    vehicle,
    mobile,
    image,
    address,
  } = req.body;
  if (password !== confirmPassword)
    return res.status(400).json({ msg: "Passwords do not match" });

  try {
    const exists = await User.findOne({ email });
    const pendingExists = await PendingDeliveryBoy.findOne({ email });
    if (exists || pendingExists)
      return res.status(400).json({ msg: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    let userRole = role || "user";
    if (userRole === "delivery") {
      const pending = await PendingDeliveryBoy.create({
        name,
        email,
        password: hashedPassword,
        sex,
        vehicle,
        mobile,
        image,
        address,
      });
      return res.status(201).json({
        msg: "Registration submitted. You can log in once admin approves your application.",
        pending: {
          name: pending.name,
          email: pending.email,
        },
      });
    }
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole,
      isApproved: true,
    });
    res.status(201).json({
      msg: "Registered successfully",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        isApproved: user.isApproved,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    if (user.role === "delivery" && !user.isApproved) {
      return res
        .status(403)
        .json({ msg: "Your account is pending approval by admin." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.status(200).json({
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        isApproved: user.isApproved,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
