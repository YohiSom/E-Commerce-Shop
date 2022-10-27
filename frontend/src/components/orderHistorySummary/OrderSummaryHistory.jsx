import React, { useState } from "react";
import "../orderSummary/orderSummary.scss";
import "antd/dist/antd.css";
import { Button } from "antd";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect } from "react";

const initialOptions = {
  //   "client-id": `${process.env.PAYPAL_CLIENT_ID}`,
  "client-id": `${process.env.REACT_APP_PAYPAL_CLIENT_ID}`,
  currency: "USD",
  intent: "capture",
};

const Buttons = ({ order, item, shipping, shippingAd }) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState("");

  // if (paidFor) {
  //   return (
  //     <div>
  //       <h1>Congrats, you just bought {order.numStones} stones!</h1>
  //     </div>
  //   )
  // }

  // if (error) return <div>Uh oh, an error occurred! {error.message}</div>
  let total = item + shipping;
  return (
    <>
      {isPending ? (
        <div>Loading</div>
      ) : (
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
            // const completeOrder = await actions.order.capture();
            // console.log(completeOrder);
            return actions.order.capture().then(function (details) {
              const { payer } = details;
              setPaidFor(true);
            });

            //   const boughtStones = db.buyStones(
            //     userInfo,
            //     order.chosenStones.map((x) => x.id)
            //   )

            //   console.log(boughtStones)

            //   moveToNextStep(boughtStones)
          }}
          onError={(err) => {
            setError(err);
            console.error(err);
          }}
        />
      )}
    </>
  );
};

function OrderSummaryHistory({ item, shipping, order, shippingAd }) {
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
            shippingAd={shippingAd}
          >
            PAY ORDER
          </Buttons>
        </div>
      </div>
    </PayPalScriptProvider>
  );
}

export default OrderSummaryHistory;
