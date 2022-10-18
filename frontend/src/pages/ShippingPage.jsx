import React, { useState } from "react";
import "antd/dist/antd.css";
import { Button, Form, Input, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./../store/user-slice";
import "./shipping.scss";
import { useNavigate } from "react-router-dom";
import { messageActions } from "../store/error-slice";
import CheckoutNavbar from "../components/CheckoutNavbar";
import LoginModal from "../components/loginModal/LoginModal";

function ShippingPage() {
  const shippingDetails = useSelector((state) => state.user.shippingDetails);
  const user = useSelector((state) => state.user.user);
  const { myAddress, myCity, myZip, myCoutry } = shippingDetails || {};
  const alerts = useSelector((state) => state.message.alerts);
  const { open } = alerts || {};
  const [address, setAddress] = useState(myAddress || "");
  const [city, setCity] = useState(myCity || "");
  const [postalCode, setPostalCode] = useState(myZip || "");
  const [coutry, setCoutnry] = useState(myCoutry || "");
  // const [shipping] = useState(true);
  // const [payment] = useState(false);
  // const [order] = useState(false);

  const shipping = true;
  const payment = false;
  const order = false;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateMessages = {
    required: "${label} is required!",
    // types: {
    //   email: '${label} is not a valid email!',
    //   number: '${label} is not a valid number!',
    // },
    // number: {
    //   range: '${label} must be between ${min} and ${max}',
    // },
  };

  const onFinish = (values) => {
    dispatch(
      userActions.handleShipping({
        myAddress: address,
        myCity: city,
        myZip: postalCode,
        myCoutry: coutry,
      })
    );
    dispatch(
      messageActions.showAlerts({
        open: true,
        message: "Shipping info has been updated",
        type: "success",
      })
    );

    setTimeout(() => {
      dispatch(messageActions.clearAlert({}));
      navigate("/payment");
    }, 3000);
  };

  !user && dispatch(userActions.handleModal());

  return (
    <>
      {user && (
        <div className="shipping-container">
          {/* <div className="shipping-title">SHIPPING DETAILS</div> */}
          <div className="alert-container">
            {open && <Alert message={alerts.message} type={alerts.type} />}
          </div>
          <div className="checkout-container">
            <CheckoutNavbar
              shipping={shipping}
              payment={payment}
              order={order}
            />
          </div>
          <Form
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={["address", "address"]}
              label="Address"
              rules={[
                {
                  required: true,
                },
              ]}
              initialValue={address}
            >
              <Input
                // defaultValue={name}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name={["city", "city"]}
              label="City"
              rules={[
                {
                  required: true,
                },
              ]}
              initialValue={city}
            >
              <Input
                // defaultValue={email}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name={["postalCode", "postalCode"]}
              label="PostalCode"
              initialValue={postalCode}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                type="text"
              />
            </Form.Item>
            <Form.Item
              name={["coutry", "coutry"]}
              initialValue={coutry}
              label="Coutry"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                value={coutry}
                onChange={(e) => setCoutnry(e.target.value)}
                type="text"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
      <LoginModal />
    </>
  );
}

export default ShippingPage;
