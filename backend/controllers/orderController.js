import Order from "../model/order.js";
import User from "../model/user.js";
import Product from "../model/product.js";
import asyncHandler from "express-async-handler";

const createOrder = asyncHandler(async (req, res) => {
  const { cartArr, shippingDetails, paymentMethod, shippingPrice } = req.body;

  const userId = req.user.userId;

  const userExist = await User.findById(userId);
  const user = userExist._id;
  if (!userExist) {
    res.status(400);
    throw new Error("User doesn't exists");
  }

  if (cartArr.length === 0) {
    res.status(400);
    throw new Error("cart is empty!");
  }

  let orderItem = [];
  let name;
  let quantity;
  let image;
  let price;
  let product;

  cartArr.forEach((element) => {
    name = element.productName;
    quantity = element.quantity;
    image = element.image;
    price = element.price;
    product = element.id;
    // const productId = await Product.findById(element.id);
    // product = productId._id.toString();

    // console.log(product);

    orderItem.push({ name, quantity, image, price, product });
  });

  const shippingAddress = {
    address: shippingDetails.myAddress,
    city: shippingDetails.myCity,
    postalCode: shippingDetails.myZip,
    country: shippingDetails.myCoutry,
  };

  const order = await Order.create({
    user,
    orderItem,
    shippingAddress,
    paymentMethod,
    shippingPrice,
  });

  res.status(201);
  res.json({
    order,
  });
  //   console.log(userExist._id.toString());
});

export { createOrder };
