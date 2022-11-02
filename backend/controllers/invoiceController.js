import fs from "fs";
import PDFDocument from "pdfkit";
import path from "path";
import asyncHandler from "express-async-handler";
import Order from "../model/order.js";
import { uploads } from "./cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import Invoice from "../model/invoice.js";
import User from "../model/user.js";

const createInvoice = asyncHandler(async (req, res) => {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  const { id, name, userId } = req.body;
  //   const filename = req.body.filename;

  const invoice = await Invoice.find({});

  if (invoice.length == 0) {
    await Invoice.create({
      user: userId,
      order: id,
      invoiceNr: 0,
    });
  } else {
    const invoiceNr = invoice[invoice.length - 1].invoiceNr + 1;

    await Invoice.create({
      user: userId,
      order: id,
      invoiceNr: invoiceNr,
    });
  }

  let numberInvoicePdf = 0;

  if (invoice.length == 0) {
    numberInvoicePdf = 0;
  } else {
    numberInvoicePdf = invoice[invoice.length - 1].invoiceNr + 1;
  }

  const order = await Order.findById(id);
  const orderId = order._id;
  const pdfPath = path.join("backend", "data", "pdf", orderId + ".pdf");
  generateHeader(doc);
  generateCustomerInformation(doc, order, name, numberInvoicePdf);
  generateInvoiceTable(doc, order);
  generateFooter(doc);

  doc.pipe(fs.createWriteStream(pdfPath));
  doc.end();
  console.log(pdfPath);

  await cloudinary.uploader.upload(pdfPath, function (error, result) {
    console.log(result, error);
  });

  fs.unlink(pdfPath, (err) => {
    if (err) console.log("fs error", err);
    else {
      console.log("\nDeleted file: example_file.txt");

      // Get the files in current directory
      // after deletion
    }
  });
  //   fs.promises.unlink(pdfPath);
  //   .then((result) => {
  //     const pdfFile = {
  //       pdfName: filename,
  //       pdfUrl: result.url,
  //       pdfId: result.id,
  //     };
  //     console.log("pdf results--", pdfFile.pdfUrl);
  //   });

  //   const pdfOutput = doc.output("datauristring");

  res.status(200);
  res.send("ok");
});

function generateHeader(doc) {
  doc
    .image("C:/Users/Yohi/Desktop/e-shop/backend/logo.jpg", 50, 45, {
      width: 50,
    })
    .fillColor("#444444")
    .fontSize(20)
    .text("E-Shop Inc.", 110, 57)
    .fontSize(10)
    .text("E-Shop Inc.", 200, 50, { align: "right" })
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("New York, NY, 10025", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, order, name, numberInvoicePdf) {
  doc.fillColor("#444444").fontSize(20).text("Tax Invoice/Receipt", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    //   .text(invoice.invoice_nr, 150, customerInformationTop)
    .text(numberInvoicePdf, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Order Number:", 50, customerInformationTop + 30)
    .text(order._id, 150, customerInformationTop + 30)

    .font("Helvetica-Bold")
    .text(name, 300, customerInformationTop)
    .font("Helvetica")
    .text(order.shippingAddress.address, 300, customerInformationTop + 15)
    .text(
      order.shippingAddress.city +
        ", " +
        order.shippingAddress.postalCode +
        ", " +
        order.shippingAddress.country,
      300,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, order) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Item",
    "Description",
    "Unit Cost",
    "Quantity",
    "Line Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < order.orderItem.length; i++) {
    const item = order.orderItem[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.name,
      "",
      `$${item.price}`,
      item.quantity,
      `$${item.price * item.quantity}`
    );

    generateHr(doc, position + 20);
  }

  const shippingPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    shippingPosition,
    "",
    "",
    "Shipping",
    "",
    `$${order.shippingPrice}`
  );

  const paidToDatePosition = shippingPosition + 20;
  let total = 0;
  let sum = 0;
  for (let x = 0; x < order.orderItem.length; x++) {
    let item = order.orderItem[x];
    total = total + item.price * item.quantity;
  }
  sum = order.shippingPrice + total;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "Paid To Date",
    "",
    `$${sum}`
  );

  // const duePosition = paidToDatePosition + 25;
  // doc.font("Helvetica-Bold");
  // generateTableRow(
  //   doc,
  //   duePosition,
  //   "",
  //   "",
  //   "Balance Due",
  //   "",
  //   formatCurrency(invoice.subtotal - invoice.paid)
  // );
  // doc.font("Helvetica");
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text("This invoice is paid", 50, 780, { align: "center", width: 500 });
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(cents) {
  return "$" + (cents / 100).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

export { createInvoice };
