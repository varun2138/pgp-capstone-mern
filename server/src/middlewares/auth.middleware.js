import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config({});
const protectAuth = async (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.cookies?.accessToken;
    console.log("auth token", token);

    if (!token) {
      return res.status(401).json({ message: "unauthorized request" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);

    req.user = decodedToken;
    console.log("user in middleware", req.user);
    next();
  } catch (error) {
    return res.status(401).json({ message: "invalid token" });
  }
};

export default protectAuth;
