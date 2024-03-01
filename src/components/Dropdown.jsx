import React, { useEffect, useState } from "react";
import Button from "./Button";

import "./Dropdown.scss";
import Input from "./Input";

const Dropdown = ({
  display,
  options,
  selectHandler,
  selected,
  clickHandler,
  otherNeeded,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (selected && selected != selectedOption) setSelectedOption(selected);
  }, [selected]);
  useEffect(() => {
    setShow(display);
  }, [display]);

  return (
    <div className="dropdown-wrapper">
      <div className="form-group">
        <input
          className="form-control"
          readOnly
          value={!selectedOption ? "Select" : selectedOption}
          onClick={(e) => {
            setShow((prevState) => !prevState);
          }}
        ></input>
      </div>
      {show && (
        <ul>
          {options.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setShow(false);
                selectHandler(item);
              }}
            >
              {item}
            </li>
          ))}
          {otherNeeded && (
            <li>
              <Button text="Other" clickHandler={clickHandler} />
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
