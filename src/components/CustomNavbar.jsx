import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import "./CustomNavbar.scss";
const CustomNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [currentPath, setCurrentPath] = useState(null);
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);
  const checkCurrentPath = (path) => {
    return path === currentPath ? "active" : "";
  };
  const navigateToLocation = (path) => {
    navigate(path);
  };
  const links = [
    {
      href: "/home",
      isActive: checkCurrentPath("/home"),
      isDisplayed: true,
      desc: "Home",
      clickHandler: () => {
        navigateToLocation("/home");
      },
    },

    {
      href: "/dashboard",
      isActive: checkCurrentPath("/dashboard"),
      isDisplayed: authCtx.isLoggedIn,
      desc: "Dashboard",
      clickHandler: () => {
        navigateToLocation("/dashboard");
      },
    },
    {
      href: "/login",
      isActive: checkCurrentPath("/login"),
      isDisplayed: !authCtx.isLoggedIn,
      desc: "Login",
      clickHandler: () => {
        navigateToLocation("/login");
      },
    },
    {
      href: "/logout",
      isActive: checkCurrentPath("/logout"),
      isDisplayed: authCtx.isLoggedIn,
      desc: "Logout",
      clickHandler: () => {
        authCtx.logout();
      },
    },
  ];
  return (
    <Navbar expand="lg">
      <Container className="w-100">
        <Navbar.Brand href="/home">
          <img src="/assets/images/reactjs-icon.svg" />
          React-Bootstrap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav w-75">
          <Nav className="me-auto">
            {links.map((item, index) => (
              <Nav.Link
                key={index}
                href="#!"
                className={item.isActive}
                style={{
                  display: !item.isDisplayed ? "none" : "",
                }}
                onClick={item.clickHandler}
              >
                {item.desc}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
