import express from "express";
const router = express.Router();
import { createInvoice } from "../controllers/invoiceController.js";

router.route("/").post(createInvoice);

export default router;
