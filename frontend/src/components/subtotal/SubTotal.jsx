import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Subtotal.scss";
import "antd/dist/antd.css";
import { Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import LoginModal from "../loginModal/LoginModal";
import { userActions } from "../../store/user-slice";

function SubTotal({ location }) {
  const cart = useSelector((state) => state.cart.cartArr);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  let totaleItems = 0;
  let totalPrice = 0;

  cart.forEach((item) => {
    totaleItems = totaleItems + item.quantity;
    totalPrice = totalPrice + item.quantity * item.price;
    totalPrice = Math.round((totalPrice + Number.EPSILON) * 100) / 100;
  });

  const checkoutHandler = () => {
    !user ? dispatch(userActions.handleModal()) : navigate("/shipping");
  };

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
        <Button disabled={cart.length === 0} onClick={checkoutHandler}>
          Proceed to checkout
        </Button>
      </div>
      <LoginModal />
    </div>
  );
}

export default SubTotal;
