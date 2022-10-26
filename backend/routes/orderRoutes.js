import express from "express";
const router = express.Router();
import { auth } from "../middleware/authMiddleware.js";
import {
  createOrder,
  getOrderById,
  getUserOrder,
} from "../controllers/orderController.js";

router.route("/").post(auth, createOrder);
router.route("/myorders").get(auth, getUserOrder);
router.route("/:id").get(auth, getOrderById);

export default router;
