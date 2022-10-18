import React from "react";
import "antd/dist/antd.css";
import { Menu } from "antd";
import { Link } from "react-router-dom";

function CheckoutNavbar({ shipping, payment, order }) {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="one" disabled={!shipping}>
        <Link to="/shipping" disabled={!shipping}>
          {" "}
          Shipping{" "}
        </Link>
      </Menu.Item>

      <Menu.Item key="two" disabled={!payment}>
        <Link to="/payment" disabled={!payment}>
          {" "}
          Payment{" "}
        </Link>
      </Menu.Item>

      <Menu.Item key="three" disabled={!order}>
        <Link to="/order" disabled={!order}>
          {" "}
          Place Order{" "}
        </Link>
      </Menu.Item>
    </Menu>
  );
}

export default CheckoutNavbar;
