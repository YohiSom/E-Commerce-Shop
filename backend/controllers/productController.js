import Product from "../model/product.js";
import asyncHandler from "express-async-handler";

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  // res.status(401);
  // throw new Error("oops something went wrong");
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const product = await Product.findById(id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found!");
  }
});

export { getProducts, getProductById };
