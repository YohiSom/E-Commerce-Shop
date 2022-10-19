import React from "react";
import { useSelector } from "react-redux";
import "./orderSummary.scss";
import "antd/dist/antd.css";
import { Button } from "antd";

function OrderSummary() {
  const cart = useSelector((state) => state.cart.cartArr);

  let sum = 0;

  const shipping = 20;

  cart.forEach((item) => {
    sum = sum + item.quantity * item.price;

    return sum;
  });

  const total = sum + shipping;

  const totalPrice = total.toFixed(2);

  return (
    <>
      {cart.length > 0 && (
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
              <span> ${shipping}</span>
            </div>
            <div className="order-summary-text">
              <span>Total</span>
              <span> ${totalPrice}</span>
            </div>

            <Button>PLACE ORDER</Button>
          </div>
        </div>
      )}{" "}
    </>
  );
}

export default OrderSummary;
