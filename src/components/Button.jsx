import React from "react";

const Button = ({ text, clickHandler, extraClasses }) => {
  return (
    <button
      className={`btn btn-primary ${extraClasses}`}
      onClick={clickHandler}
    >
      {text}
    </button>
  );
};

export default Button;
