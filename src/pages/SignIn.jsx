import React from "react";
import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Layout from "../components/Layout";

import "./SignIn.scss";

const SignIn = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  return (
    <Layout>
      <div className="container">
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
          <Button text="LOG IN" />
        </div>
        <div className="right-content">
          <h2>Lorem Ipsum</h2>
          <h2 className="mb-4">Dior</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing </p>
          <p> sed do eiusmod tempor incididunt ut labore </p>
          <p>et dolore magna aliqua</p>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
