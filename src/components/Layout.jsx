import React from "react";
import CustomNavbar from "./CustomNavbar";

const Layout = (props) => {
  return (
    <>
      <CustomNavbar />
      <div className="main">{props.children}</div>
    </>
  );
};

export default Layout;
