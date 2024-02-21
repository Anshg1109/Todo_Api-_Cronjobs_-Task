import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const isUser = async (req, res, next) => {
  const token =
    req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized user" });

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECERT);
    const user = await User.findById(decodedToken?.id).select(
      "-password "
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    if (error?.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized user" });
    }
    return res.status(401).json({ message: "Invalid token" || error?.message });
  }
};

export { isUser };