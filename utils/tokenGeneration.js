import jwt from "jsonwebtoken";

const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECERT, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
};


export default generateAccessToken;