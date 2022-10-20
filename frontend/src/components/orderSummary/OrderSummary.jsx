import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./orderSummary.scss";
import "antd/dist/antd.css";
import { Button, Alert } from "antd";
import { newOrderAction } from "../../store/user-actions";

function OrderSummary() {
  const cartArr = useSelector((state) => state.cart.cartArr);
  const shippingDetails = useSelector((state) => state.user.shippingDetails);
  const paymentMethod = useSelector((state) => state.user.paymentMethod);
  const token = useSelector((state) => state.user.user.token);

  const dispatch = useDispatch();

  let sum = 0;

  const shippingPrice = 20;

  cartArr.forEach((item) => {
    sum = sum + item.quantity * item.price;

    return sum;
  });

  const total = sum + shippingPrice;

  const totalPrice = total.toFixed(2);

  const handleOrder = () => {
    dispatch(
      newOrderAction(
        cartArr,
        shippingDetails,
        paymentMethod,
        shippingPrice,
        token
      )
    );
  };

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
              <span> ${sum}</span>
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
