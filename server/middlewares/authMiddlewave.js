import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protectRoute = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ status: false, message: "Token missing." });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken.userId) {
      return res.status(401).json({ status: false, message: "Invalid token." });
    }

    const resp = await User.findById(decodedToken.userId).select("isAdmin email");

    if (!resp) {
      return res.status(404).json({ status: false, message: "User not found." });
    }

    req.user = {
      email: resp.email,
      isAdmin: resp.isAdmin,
      userId: decodedToken.userId,
    };

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      status: false,
      message: error.message || "Not authorized. Try login again.",
    });
  }
};

const isAdminRoute = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(401).json({
      status: false,
      message: "Not authorized as admin. Try login as admin.",
    });
  }
  next();
};

export { isAdminRoute, protectRoute };
