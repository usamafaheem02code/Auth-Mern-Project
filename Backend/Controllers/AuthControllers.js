import { userModel } from "../Model/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const allUser = async (req, res) => {
  try {
    const allData = await userModel.find();
    res.status(200).json({ success: true, users: allData });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        success: false,
        message: "User already exists, please login",
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new userModel({ name, email, password: hashedPass });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Signup successful",
      user: { name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Signup failed",
      error: err.message,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Email is not registered",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,       // **Important: token key here**
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: err.message,
    });
  }
};

const product = async (req, res) => {
  res.status(200).json([
    { name: "mobile", price: "30000" },
    { name: "car", price: "4000000" },
  ]);
};

export { allUser, signUp, signIn, product };
