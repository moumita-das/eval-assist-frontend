import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import "./CustomNavbar.scss";
const CustomNavbar = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(null);
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);
  console.log(currentPath);
  return (
    <Navbar expand="lg">
      <Container className="w-100">
        <Navbar.Brand href="/landing">
          <img src="/assets/images/reactjs-icon.svg" />
          React-Bootstrap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav w-75">
          <Nav className="me-auto">
            <Nav.Link
              href="/landing"
              className={`${
                currentPath == "/landing" || currentPath == "/" ? "active" : ""
              }`}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="/login"
              className={`${currentPath == "/login" ? "active" : ""}`}
            >
              Login
            </Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
