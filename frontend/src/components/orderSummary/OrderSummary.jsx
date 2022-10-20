import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./orderSummary.scss";
import "antd/dist/antd.css";
import { Button, Alert } from "antd";
import { newOrderAction } from "../../store/user-actions";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cart-slice";

function OrderSummary() {
  const cartArr = useSelector((state) => state.cart.cartArr);
  const shippingDetails = useSelector((state) => state.user.shippingDetails);
  const paymentMethod = useSelector((state) => state.user.paymentMethod);
  const token = useSelector((state) => state.user.user.token);
  const newOrderId = useSelector((state) => state.user.newOrder);
  const [success, setSuccess] = useState(false);

  const { order } = newOrderId || {};
  const { _id } = order || {};

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let sum = 0;

  const shippingPrice = 20;

  cartArr.forEach((item) => {
    sum = sum + item.quantity * item.price;

    return sum.toFixed(2);
  });

  const total = sum + shippingPrice;

  const totalPrice = total.toFixed(2);

  const handleOrder = async () => {
    dispatch(
      newOrderAction(
        cartArr,
        shippingDetails,
        paymentMethod,
        shippingPrice,
        token
      )
    );

    // .then(navigate(`/order/${_id}`));
  };

  useEffect(() => {
    // console.log(order);
    if (order) {
      dispatch(cartActions.removeCartFromStorageAfterOrder());
      navigate(`/order/${order._id}`);
    }
  }, [order]);

  if (!shippingDetails || !paymentMethod)
    return (
      <Alert
        message="Shipping and payment details are missing. Please fill them in"
        type="error"
      />
    );

  return (
    <>
      {cartArr.length > 0 && (
        <div className="summary-container">
          <div className="order-summary">
            <span className="order-summary-text" style={{ fontWeight: "bold" }}>
              ORDER SUMMARY
            </span>
            <div className="order-summary-text">
              <span>Items</span>
              <span> ${sum.toFixed(2)}</span>
            </div>
            <div className="order-summary-text">
              <span>Shipping</span>
              <span> ${shippingPrice}</span>
            </div>
            <div className="order-summary-text">
              <span>Total</span>
              <span> ${totalPrice}</span>
            </div>

            <Button onClick={handleOrder} disabled={cartArr.length === 0}>
              PLACE ORDER
            </Button>
          </div>
        </div>
      )}{" "}
    </>
  );
}

export default OrderSummary;
