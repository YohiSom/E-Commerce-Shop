import React, { useState } from "react";
import { Button, Modal, Alert } from "antd";
import "antd/dist/antd.css";
import "./LoginModal.scss";
import Alerts from "../Alerts";
import { useSelector } from "react-redux";

function LoginModal({
  visible,
  handleCancel,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  name,
  email,
  password,
  handleRegist,
  message,
  type,
  messageOpen,
  handleLogin,
  confirmPassword,
  onConfirmPasswordChange,
}) {
  const user = useSelector((state) => state.user.user);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div>
      {" "}
      <Modal
        className="modal-login"
        title="Please fill in all fields"
        visible={visible}
        onOk={showRegister ? handleRegist : handleLogin}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText={showRegister ? "Register" : "Login"}
        cancelText="Cancel"
      >
        <div className="input-container">
          {messageOpen && <Alerts message={message} type={type} />}
          {showRegister && (
            <>
              <label className="label-input">Full Name:</label>
              <input
                className="login-input"
                type="text"
                value={name}
                onChange={onNameChange}
              />
            </>
          )}
          <label>Email:</label>
          <input
            className="login-input"
            value={email}
            type="email"
            onChange={onEmailChange}
          />
          <label>Password:</label>
          <input
            className="login-input"
            value={password}
            type="password"
            onChange={onPasswordChange}
          />
          <label>Confirm Password:</label>
          {showRegister && (
            <input
              className="login-input"
              value={confirmPassword}
              type="password"
              onChange={onConfirmPasswordChange}
            />
          )}
          {!showRegister ? (
            <p>
              Not yet registered?{" "}
              <button
                className="not-yet-btn"
                onClick={() => {
                  setShowRegister(true);
                }}
              >
                click here
              </button>{" "}
              to register now!
            </p>
          ) : (
            <p>
              Already registered?{" "}
              <button
                className="not-yet-btn"
                onClick={() => {
                  setShowRegister(false);
                }}
              >
                click here
              </button>{" "}
              to login now!
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default LoginModal;
