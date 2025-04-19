const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const sendVerificationEmail = require("../utils/sendVerificationEmail");

exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verificationToken,
    });

    await newUser.save();

    await sendVerificationEmail(email, firstName, verificationToken);
    console.log("🚀 ~ exports.register= ~ newUser:", newUser);

    res.status(201).json({ msg: "Registered. Verify your email." });
  } catch (err) {
    res.status(500).json({ msg: "Registering..." });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ verificationToken: token });
  if (!user) return res.status(400).json({ msg: "Invalid token" });

  user.isVerified = true;
  user.verificationToken = null;
  await user.save();

  res.json({ msg: "Email verified successfully" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    if (!user.isVerified)
      return res.status(403).json({ msg: "Email not verified" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: "Login..." });
  }
};
