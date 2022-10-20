import express from "express";
const router = express.Router();
import { auth } from "../middleware/authMiddleware.js";

import { createOrder } from "../controllers/orderController.js";

router.route("/").post(auth, createOrder);

export default router;
