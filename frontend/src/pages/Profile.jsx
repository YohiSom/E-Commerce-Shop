import React, { useState } from "react";
import "antd/dist/antd.css";
import { Button, Form, Input, Alert, Menu, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../store/user-actions";
import { userActions } from "../store/user-slice";
import { messageActions } from "../store/error-slice";
import "./profile.scss";
import { useEffect } from "react";
import { getUserOrders } from "../API/api";
import { useNavigate } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const alerts = useSelector((state) => state.message.alerts);
  const { open } = alerts || {};
  const { name, email, token } = user;

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmNewPassword] = useState("");
  const [orderHistory, setOrderHistory] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const userOrders = async () => {
    try {
      const res = await getUserOrders(token);
      setOrders(res);
      setIsLoading(false);

      console.log(res);
    } catch (err) {
      setIsOpen(true);
      setMessage(err.message);
    }
  };

  useEffect(() => {
    orderHistory && userOrders();
  }, [orderHistory]);

  const onFinish = async (values) => {
    const { name, email, password } = values;
    // console.log(values);
    if (newPassword !== confirmPassword) {
      dispatch(
        messageActions.showAlerts({
          open: true,
          message: "Passwords don't match",
          type: "error",
        })
      );

      setTimeout(() => {
        dispatch(messageActions.clearAlert({}));
      }, 3000);

      setNewPassword("");
      setConfirmNewPassword("");
    }

    if (
      newPassword === confirmPassword ||
      (newPassword && confirmPassword === "")
    ) {
      dispatch(
        updateUserProfile(
          values.name.name,
          values.email.email,
          values.password.password,
          token
        )
      ).then(setNewPassword(""), setConfirmNewPassword(""));
    }
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const seeOrders = () => {
    setOrderHistory(true);
  };

  const seeProfile = () => {
    setOrderHistory(false);
  };

  const items = [
    {
      label: "My orders",
      onClick: seeOrders,
    },
    {
      label: "My profile info",
      onClick: seeProfile,
    },
  ];

  if (isLoading || orders === undefined) return <Spin />;

  return (
    <>
      <Menu mode="horizontal" items={items} />
      {orderHistory && (
        <>
          {" "}
          {isOpen && <Alert message={message} />}
          <div className="orders-container">
            {orders && orders.message && <div>{orders.message}</div>}
            {orders &&
              orders.length > 0 &&
              orders.map((item) => {
                return (
                  <div
                    className="order-item"
                    key={item._id}
                    onClick={() => {
                      navigate(`/order/${item._id}`);
                    }}
                  >
                    <div>Order Number: {item._id}</div>
                    <div>Order Created at: {item.createdAt}</div>
                    <div>Order Paid: {item.isPaid == true ? "Yes" : "No"}</div>
                    <div>
                      Order Delivered: {item.isDelivered == true ? "Yes" : "No"}
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      )}
      {!orderHistory && (
        <div className="profile-container">
          {open && <Alert message={alerts.message} type={alerts.type} />}
          <Form
            name="nest-messages"
            onFinish={onFinish}
            // validateMessages={validateMessages}
          >
            <Form.Item
              name={["name", "name"]}
              label="Name"
              rules={[
                {
                  type: "text",
                },
              ]}
              initialValue={name}
            >
              <Input
                // defaultValue={name}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name={["email", "email"]}
              label="Email"
              rules={[
                {
                  type: "email",
                },
              ]}
              initialValue={email}
            >
              <Input
                // defaultValue={email}
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name={["password", "password"]}
              label="Password"
              initialValue=""
              rules={[
                {
                  type: "password",
                },
              ]}
            >
              <Input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
              />
            </Form.Item>
            <Form.Item
              name={["confirm", "confirm"]}
              initialValue=""
              label="Confirm Password"
              rules={[
                {
                  type: "password",
                },
              ]}
            >
              <Input
                value={confirmPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                type="password"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
}

export default Profile;
