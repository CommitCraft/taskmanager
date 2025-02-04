import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (token === undefined || token === null) {
      return res
        .status(401)
        .json({ status: false, message: "Not authorized. Try login again." });
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decodedToken.userId).select(
        "isAdmin email"
      );

      if (user === null) {
        return res
          .status(401)
          .json({ status: false, message: "Not authorized. Try login again." });
      }

      if (!user) {
        return res
          .status(401)
          .json({ status: false, message: "Not authorized. Try login again." });
      }

      req.user = {
        email: user.email,
        isAdmin: user.isAdmin,
        userId: decodedToken.userId,
      };

      next();
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .json({ status: false, message: "Not authorized. Try login again." });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ status: false, message: "Not authorized. Try login again." });
  }
};

const isAdminRoute = (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin !== undefined) {
      if (req.user.isAdmin) {
        return next();
      } else {
        return res.status(403).json({
          status: false,
          message: "Not authorized as admin. Try login as admin.",
        });
      }
    } else {
      return res.status(401).json({
        status: false,
        message: "User information not available. Try login again.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

export { isAdminRoute, protectRoute };
