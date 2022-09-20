import express from "express";
const router = express.Router();
import {
  userAuth,
  userRegister,
  profile,
  updateProfile,
} from "../controllers/userController.js";
import { auth } from "../middleware/authMiddleware.js";

router.route("/register").post(userRegister);
router.route("/login").post(userAuth);
router.route("/profile").get(auth, profile);
router.route("/updateProfile").patch(auth, updateProfile);

export default router;
