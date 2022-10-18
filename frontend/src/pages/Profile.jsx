import React, { useState } from "react";
import "antd/dist/antd.css";
import { Button, Form, Input, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../store/user-actions";
import { userActions } from "../store/user-slice";
import { messageActions } from "../store/error-slice";
import "./profile.scss";

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

  return (
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
  );
}

export default Profile;
