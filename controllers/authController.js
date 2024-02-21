import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateAccessToken from "../utils/tokenGeneration.js";
import { COOKIE_OPTIONS } from "../constants/apiConstants.js";

const registerUser = asyncHandler(async (req, res) => {
  const { phone, priority } = req.body;
  if (!phone || !priority ) {
    res.status(400).json({
      message: "All fields are mandatory!",
    });
  }
  try{
    const userAvailable = await User.findOne({ phone });
    if (userAvailable) {
      res.status(400).json({ message: "User already registered!" });
    } else {
      const user = await User.create({
        phone,
        priority
      });
      const accessToken = generateAccessToken(user._id);
      return res
        .status(201)
        .cookie("accessToken", accessToken, COOKIE_OPTIONS)
        .json({
          message: "User registered successfully",
          data: { _id: user.id, phone: user.phone },
          accessToken
        });
    }
  }catch(error){
    return res.status(400).json({message: "Something went wrongs"})
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  try{
    const users = await User.find({});
    return res.status(200).json({message: "Successfully fetched all the users.", data: users});
  }catch(error){
    return res.status(500).json({message: error.message});
  }
});

const userLogout = asyncHandler(async (_, res) => {
  return res
    .status(200)
    .clearCookie("accessToken", COOKIE_OPTIONS)
    .json({ message: "Logout Successful" });
});

export { registerUser, getAllUsers, userLogout };
