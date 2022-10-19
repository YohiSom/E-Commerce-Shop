import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutNavbar from "../components/CheckoutNavbar";
import "./placeOrder.scss";
import OrderSummary from "../components/orderSummary/OrderSummary";
import { Link } from "react-router-dom";
import LoginModal from "../components/loginModal/LoginModal";
import { userActions } from "../store/user-slice";

function PlaceOrderPage() {
  const shippingDetails = useSelector((state) => state.user.shippingDetails);
  const paymentMethod = useSelector((state) => state.user.paymentMethod);
  const cartItems = useSelector((state) => state.cart.cartArr);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  !user && dispatch(userActions.handleModal());

  const { myAddress, myCity, myZip, myCoutry } = shippingDetails || {};
  const shipping = true;
  const payment = true;
  const order = true;

  return (
    <>
      <LoginModal />
      {user && (
        <>
          {" "}
          <div>
            {" "}
            <div className="checkout-nav">
              <CheckoutNavbar
                className="checkout-container"
                shipping={shipping}
                payment={payment}
                order={order}
              />
            </div>
          </div>
          {cartItems.length > 0 ? (
            <div className="order-container">
              <div className="details-container">
                <div style={{ fontWeight: "bold" }}>SHIPPING</div>
                <div className="address-container">
                  Address: {myAddress}, {myCity}, {myZip}, {myCoutry}
                </div>
                <div className="payment-container">
                  <span style={{ fontWeight: "bold" }}> PAYMENT METHOD</span>{" "}
                  <div>Method: {paymentMethod}</div>
                </div>

                <div>
                  <span style={{ fontWeight: "bold" }}>ORDER ITEMS</span>
                  <div>
                    {cartItems.map((item) => {
                      return (
                        <div key={item.id}>
                          <Link
                            to={`/product/${item.id}`}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            {" "}
                            <img src={item.image} className="order-image" />
                            <span className="productName-container">
                              {item.productName}
                            </span>
                            <span>
                              {item.quantity} X ${item.price} = $
                              {`${item.quantity}` * `${item.price}`}
                            </span>
                          </Link>
                        </div>
                      );
                    })}
                  </div>{" "}
                </div>
              </div>
              <div className="subTotal-container"></div>
              <OrderSummary />
            </div>
          ) : (
            <div style={{ marginLeft: "20px", marginTop: "20px" }}>
              Your cart is empty. At this point you cannot place an order.
            </div>
          )}
        </>
      )}
    </>
  );
}

export default PlaceOrderPage;
