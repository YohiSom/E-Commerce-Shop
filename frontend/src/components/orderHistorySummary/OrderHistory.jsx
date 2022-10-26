import React from "react";
import "antd/dist/antd.css";
import { Alert } from "antd";
import "./orderHistory.scss";
import OrderSummaryHistory from "./OrderSummaryHistory";

function OrderHistory({
  orderId,
  name,
  email,
  address,
  isDeliveredMessage,
  isDeliveredType,
  paymentMethod,
  isPaidMessage,
  isPaidType,
  src,
  order,
  item,
  shipping,
}) {
  return (
    <div className="order-page-container">
      <div className="order-detail-container">
        <div
          className="order-number"
          style={{ fontWeight: "bold" }}
        >{`ORDER NUMBER ${orderId}`}</div>
        <div className="shipping" style={{ fontWeight: "bold" }}>
          SHIPPING
        </div>
        <div className="shipping">Name: {`${name}`}</div>
        <div className="shipping">Email: {`${email}`}</div>
        <div className="shipping">Address: {`${address}`}</div>
        <div className="shipping">
          <Alert message={isDeliveredMessage} type={isDeliveredType} />
        </div>
        <div className="payment" style={{ fontWeight: "bold" }}>
          PAYMENT METHOD{" "}
        </div>
        <div className="shipping">Method: {`${paymentMethod}`}</div>
        <div className="shipping">
          {" "}
          <Alert message={isPaidMessage} type={isPaidType} />
        </div>
        <div
          style={{ fontWeight: "bold", marginTop: "20px", marginBottom: "7px" }}
        >
          ORDER DETAILS
        </div>
        <div className="shipping">
          {" "}
          {order.map((item) => {
            return (
              <div key={item.product}>
                <img className="order-image" src={item.image} />
                <span>{item.name}</span>
                <span>{`${item.quantity} x ${item.price} = ${
                  item.quantity * item.price
                }`}</span>
              </div>
            );
          })}
        </div>
      </div>

      <OrderSummaryHistory item={item} shipping={shipping} />
    </div>
  );
}

export default OrderHistory;
