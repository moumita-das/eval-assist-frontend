import React from "react";
import CustomNavbar from "./Navbar";

const Layout = (props) => {
  return (
    <>
      <CustomNavbar />
      {props.children}
    </>
  );
};

export default Layout;
