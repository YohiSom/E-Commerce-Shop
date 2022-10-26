import React from "react";
import "../orderSummary/orderSummary.scss";
import "antd/dist/antd.css";
import { Button } from "antd";

function OrderSummaryHistory({ item, shipping }) {
  return (
    <div className="summary-container">
      <div className="order-summary">
        <span className="order-summary-text" style={{ fontWeight: "bold" }}>
          ORDER SUMMARY
        </span>
        <div className="order-summary-text">
          <span>Items</span>
          <span> $ {`${item}`}</span>
        </div>
        <div className="order-summary-text">
          <span>Shipping</span>
          <span> $ {`${shipping}`}</span>
        </div>
        <div className="order-summary-text">
          <span>Total</span>
          <span> $ {item + shipping}</span>
        </div>

        <Button>PAY ORDER</Button>
      </div>
    </div>
  );
}

export default OrderSummaryHistory;
