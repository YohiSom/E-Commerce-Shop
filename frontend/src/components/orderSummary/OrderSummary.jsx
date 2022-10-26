import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./orderSummary.scss";
import "antd/dist/antd.css";
import { Button, Alert } from "antd";
import { newOrderAction } from "../../store/user-actions";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cart-slice";
import { createOrder } from "../../API/api";

function OrderSummary() {
  const cartArr = useSelector((state) => state.cart.cartArr);
  const shippingDetails = useSelector((state) => state.user.shippingDetails);
  const paymentMethod = useSelector((state) => state.user.paymentMethod);
  const token = useSelector((state) => state.user.user.token);
  const [order, setOrder] = useState(null);
  const [success, setSuccess] = useState(false);

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
    try {
      const res = await createOrder(
        cartArr,
        shippingDetails,
        paymentMethod,
        shippingPrice,
        token
      );
      setOrder(res);
    } catch (err) {
      console.log(err.message);
    }
    // dispatch(
    //   newOrderAction(
    //     cartArr,
    //     shippingDetails,
    //     paymentMethod,
    //     shippingPrice,
    //     token
    //   )
    // ).then(
    //   dispatch(cartActions.removeCartFromStorageAfterOrder()),
    //   // navigate(`/order/${_id}`)

    //   console.log(_id)
    // );

    // .then(navigate(`/order/${_id}`));
  };

  useEffect(() => {
    // console.log(order);
    if (order) {
      const id = order.order._id;

      navigate(`/order/${id}`);
      dispatch(cartActions.removeCartFromStorageAfterOrder());
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
