import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import AuthService from "../services/auth.service";
import Button from "../components/Button";
import Input from "../components/Input";
import Layout from "../components/Layout";

import "./SignIn.scss";
import Toast from "../components/Toast";

const SignIn = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const loginBtnClicked = () => {
    if (
      email == null ||
      password == null ||
      email.trim().length == 0 ||
      password.trim().length == 0
    ) {
      setError("Fill information before proceeding");
      return false;
    } else {
      setError(false);
      AuthService.loginUser(email, password)
        .then((res) => {
          if (res.access_token) {
            authCtx.login(res.access_token);
            navigate("/dashboard");
          }
        })
        .catch((error) => {
          if (error.response.data.detail) setError(error.response.data.detail);
        });
    }
  };

  return (
    <Layout>
      <div className="login-container">
        <div className="container ">
          <div className="left-content">
            <h2 className="mb-5">Login</h2>
            <p className="info m-0">Enter details here</p>
            <Input
              type="text"
              placeHolder="Email"
              value={email}
              changeHandler={(e) => {
                setEmail(e.target.value);
              }}
              id="email-input"
            />
            <Input
              type="password"
              placeHolder="Password"
              value={password}
              changeHandler={(e) => {
                setPassword(e.target.value);
              }}
              id="password-input"
            />
            <a className="info">Forgot your password?</a>
            <Button text="LOG IN" clickHandler={loginBtnClicked} />
          </div>
          <div className="right-content">
            <h2>Lorem Ipsum</h2>
            <h2 className="mb-4">Dior</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing </p>
            <p> sed do eiusmod tempor incididunt ut labore </p>
            <p>et dolore magna aliqua</p>
          </div>
        </div>
      </div>
      {error && <Toast text={error} type={error ? "fail" : "success"} />}
    </Layout>
  );
};

export default SignIn;
