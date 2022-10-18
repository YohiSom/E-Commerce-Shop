import React, { useState } from "react";
import CheckoutNavbar from "../components/CheckoutNavbar";
import "./shipping.scss";
import "antd/dist/antd.css";
import { Radio, Button } from "antd";
import { useNavigate } from "react-router-dom";

function PaymentPage() {
  const [shipping] = useState(true);
  const [payment] = useState(true);
  const [order] = useState(false);
  const navigate = useNavigate();

  const [paymentOption, setPaymentOption] = useState("Paypal");

  const handlePaymentOption = () => {
    navigate("/order");
  };

  return (
    <div className="shipping-container">
      <div className="checkout-container">
        <CheckoutNavbar shipping={shipping} payment={payment} order={order} />
      </div>
      <div className="select-payment">SELECT PAYMENT METHOD</div>
      <Radio.Group
        onChange={(e) => {
          setPaymentOption(e.target.value);
        }}
        value={paymentOption}
      >
        <Radio value={"Paypal"}>Paypal or Credit Card</Radio>
        {/* <Radio value={"MP"}>MP</Radio>
        <Radio value={"Delhi"}>Delhi</Radio>
        <Radio value={"UP"}>UP</Radio> */}
      </Radio.Group>
      <div className="payment-btn">
        <Button type="primary" onClick={handlePaymentOption}>
          Continue
        </Button>
      </div>
    </div>
  );
}

export default PaymentPage;
