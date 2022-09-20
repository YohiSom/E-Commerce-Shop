import React from "react";
import { useSelector } from "react-redux";
import "./Subtotal.scss";
import "antd/dist/antd.css";
import { Button } from "antd";

function SubTotal() {
  const cart = useSelector((state) => state.cart.cartArr);
  let totaleItems = 0;
  let totalPrice = 0;

  cart.forEach((item) => {
    totaleItems = totaleItems + item.quantity;
    totalPrice = totalPrice + item.quantity * item.price;
    totalPrice = Math.round((totalPrice + Number.EPSILON) * 100) / 100;
  });

  return (
    <div className="subtotal-container">
      <div className="total-items-container">
        <div className="total-items">Total Items:</div>
        <div>{`${totaleItems}`}</div>
      </div>
      <div className="total-items-container">
        <div className="total-items">Subtotal</div>{" "}
        <div>{`${totalPrice} $`}</div>
      </div>
      <div className="checkout-btn">
        <Button disabled={cart.length === 0}>Proceed to checkout</Button>
      </div>
    </div>
  );
}

export default SubTotal;
