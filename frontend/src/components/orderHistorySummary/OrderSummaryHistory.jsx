import React, { useState } from "react";
import "../orderSummary/orderSummary.scss";
import "antd/dist/antd.css";
import { Alert } from "antd";
import { getOrderById, orderPaid } from "../../API/api";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect } from "react";

const initialOptions = {
  "client-id": `${process.env.REACT_APP_PAYPAL_CLIENT_ID}`,
  currency: "USD",
  intent: "capture",
};

const Buttons = ({
  orderDetails,
  item,
  shipping,
  id,
  isPaid,
  token,
  getNewOrder,
}) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (paidFor) {
      getNewOrder();
    }
  }, [paidFor]);

  if (paidFor) {
    return (
      <Alert message="Transaction complete. Order is paid" type="success" />
    );
  }

  if (error) return <Alert message={`${error}`} type="error" />;
  let total = item + shipping;

  if (isPending) return <div>Loading</div>;

  return (
    <>
      {!orderDetails.isPaid && (
        <PayPalButtons
          // className="paypal-buttons-container"
          style={{ layout: "vertical" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              //   intent: "CAPTURE",
              purchase_units: [
                {
                  description: "My order from E-shop",
                  amount: {
                    currency_code: "USD",
                    value: Number(total),
                  },
                  //   shipping: {
                  //     address: {
                  //       address_line_1: `${shippingAd.shippingAddress.address}`,
                  //       address_line_2: "<removed>",
                  //       admin_area_2: `${shippingAd.shippingAddress.city}`,
                  //       admin_area_1: `${shippingAd.shippingAddress.country}`,
                  //       postal_code: "<removed>",
                  //       country_code: "US",
                  //     },

                  //   },
                },
              ],
              application_context: {
                shipping_preference: "NO_SHIPPING",
              },
            });
          }}
          onApprove={async (data, actions) => {
            return actions.order.capture().then(function (details) {
              const { payer } = details;
              setPaidFor(true);
              orderPaid(orderDetails._id, true, token);
            });
          }}
          onError={(err) => {
            setError(err.message);
          }}
        />
      )}
    </>
  );
};

function OrderSummaryHistory({
  item,
  shipping,
  order,
  orderDetails,
  token,
  getNewOrder,
}) {
  return (
    <PayPalScriptProvider options={initialOptions}>
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

          <Buttons
            order={order}
            item={item}
            shipping={shipping}
            orderDetails={orderDetails}
            token={token}
            getNewOrder={getNewOrder}
          >
            PAY ORDER
          </Buttons>
        </div>
      </div>
    </PayPalScriptProvider>
  );
}

export default OrderSummaryHistory;
