import React from "react";
import "antd/dist/antd.css";
import { Alert } from "antd";

function Alerts({ message, type }) {
  return <Alert message={message} type={type} />;
}

export default Alerts;
