import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import {
  ShoppingCartOutlined,
  HomeOutlined,
  LoginOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import LoginModal from "../loginModal/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user-slice";
import { register, login } from "../../store/user-actions";
import { messageActions } from "../../store/error-slice";

function Navbar() {
  const modal = useSelector((state) => state.user.modalOpen);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.message.alerts);
  const { open, message, type } = alert || {};
  const user = useSelector((state) => state.user.user);

  const handleModelOpen = () => {
    dispatch(userActions.handleModal());
  };

  const handleCancel = () => {
    dispatch(userActions.handleCloseModal());
  };

  const handleLogout = () => {
    dispatch(userActions.clearUser());
  };
  const items = [
    {
      label: "Home",
      icon: (
        <Link to="/">
          <HomeOutlined />
        </Link>
      ),
      // icon: <MailOutlined />,
    },
    {
      label: "Cart",
      icon: (
        <Link to="/cart">
          <ShoppingCartOutlined />
        </Link>
      ),
    },
    {
      label: !user ? "Sign In" : "Sign Out",
      icon: <LoginOutlined />,
      onClick: !user ? handleModelOpen : handleLogout,
    },
    {
      label: user && "Profile",
      icon: user && (
        <Link to="/profile">
          <ProfileOutlined />
        </Link>
      ),
    },
  ];

  const handleRegist = async () => {
    if (password !== confirmPassword) {
      dispatch(
        messageActions.clearAlert({
          open: true,
          message: "Passwords don't match!",
          type: "error",
        })
      );
    } else {
      dispatch(register(name, email, password)).then(
        setEmail(""),
        setPassword(""),
        setName(""),
        setConfirmPassword("")
      );
    }
  };

  const handleLogin = () => {
    dispatch(login(email, password)).then(setEmail(""), setPassword(""));
  };

  return (
    <>
      <Menu className="menu-container" mode="horizontal" items={items} />
      <LoginModal
        visible={modal}
        handleCancel={handleCancel}
        name={name}
        email={email}
        password={password}
        onNameChange={(e) => setName(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onEmailChange={(e) => setEmail(e.target.value)}
        handleRegist={handleRegist}
        messageOpen={open}
        message={message}
        type={type}
        handleLogin={handleLogin}
        confirmPassword={confirmPassword}
        onConfirmPasswordChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
      />
    </>
  );
}

export default Navbar;
