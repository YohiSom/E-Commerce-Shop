import mongoose from "mongoose";
const { Schema } = mongoose;

const invoiceSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  order: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Order" },
  invoiceNr: { type: Number, required: true },
  pdfInvoice: { type: String },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;
