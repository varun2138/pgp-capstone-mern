import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
const register = asyncHandler(async (req, res) => {
  const { name, email, password, mobile } = req.body;
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const user = await User.create({
    name,
    email,
    password,
    mobile,
  });
  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    console.log("error while creating user");
    return res.json(500).json({ message: "server error" });
  }
  return res
    .status(201)
    .json({ createdUser, message: "user created successfully" });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("enter credentials");
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json("User does not exist");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    return res.status(401).json("password incorrect");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ token });
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "logged out successfully" });
});
export { register, login, logout };
