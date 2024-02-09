import React from "react";

const Input = ({ id, label, value, changeHandler, type, placeHolder }) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        className="form-control"
        placeholder={placeHolder}
        value={value}
        type={type}
        onChange={changeHandler}
        autoComplete="new-password"
      />
    </div>
  );
};

export default Input;
