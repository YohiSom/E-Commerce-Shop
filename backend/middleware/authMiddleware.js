import jwt from "jsonwebtoken";
import User from "../model/user.js";
import asyncHandler from "express-async-handler";

const auth = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401);
    throw new Error("Invalid authorization");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId: payload.userId };

    // the .user is just a name - you can name it req.foo if u wish

    next();
  } catch (error) {
    res.status(401);
    throw new Error("Invalid authorization");
  }
});

export { auth };
