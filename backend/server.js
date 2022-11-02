import express from "express";
import products from "./data/products.js";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import invoiceRoutes from "./routes/invoiceRoute.js";

connectDb();

const app = express();
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/invoice", invoiceRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
