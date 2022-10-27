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

const getOrderById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const orderById = await Order.findById(id).populate("user", "name email");

  if (!orderById) {
    res.status(400);
    throw new Error("Order not found. Please try again");
  }

  res.status(201);
  res.json(orderById);
});

const getUserOrder = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  const orders = await Order.find({ user: userId });

  if (orders.length == 0) {
    res.json({ message: "You have no orders" });
  } else {
    res.status(201);
    res.json(orders);
  }
});

const orderPaid = asyncHandler(async (req, res) => {
  const { id, isPaid } = req.body;

  // const order = await findById(id);

  const order = await Order.findOneAndUpdate(
    { _id: id },
    { isPaid: isPaid },
    { runValidators: true, useFindAndModify: false, new: true }
  );

  res.json(order);
});

export { createOrder, getOrderById, getUserOrder, orderPaid };
