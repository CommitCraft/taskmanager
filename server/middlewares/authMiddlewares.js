import jwt from "jsonwebtoken";

const isAdminRoute = (req, res, next) => {
  try {
    if (!req.user || req.user.isAdmin === undefined) {
      return res.status(401).json({
        status: false,
        message: "User information not available. Try login again.",
      });
    }

    if (!req.user.isAdmin) {
      return res.status(403).json({
        status: false,
        message: "Not authorized as admin. Try login as admin.",
      });
    }

    next();
  } catch (error) {
    console.error(`isAdminRoute Middleware Error: ${error.message}`);
    return res.status(500).json({
      status: false,
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

export { isAdminRoute };
