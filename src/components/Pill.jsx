import React from "react";
import "./Pill.scss";
const Pill = ({ text, extraClasses, clickHandler, isActive }) => {
  return (
    <div className={`pill ${extraClasses} ${isActive}`} onClick={clickHandler}>
      {text}
    </div>
  );
};

export default Pill;
