import React from "react";
import "./ChildListItem.scss";

const ChildListItem = ({ text, id, isSelected, listType, selectHandler }) => {
  return (
    <div className={`form-check child-list-item ${isSelected ? "active" : ""}`}>
      <input
        className={`form-check-input`}
        type={listType ? listType : "checkbox"}
        checked={isSelected}
        id={`flexCheckDefault-${id}`}
        onChange={() => {
          selectHandler(text);
        }}
      />
      <label className="form-check-label" for={`flexCheckDefault-${id}`}>
        {text}
      </label>
    </div>
  );
};

export default ChildListItem;
