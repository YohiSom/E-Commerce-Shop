import React from "react";
import "antd/dist/antd.css";
import { Alert } from "antd";

function Messages({ message, type }) {
  return <Alert message={message} type={type} />;
}

export default Messages;
