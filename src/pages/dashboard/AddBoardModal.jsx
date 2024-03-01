import React, { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-bootstrap/Modal";
import Input from "../../components/Input";
import Button from "../../components/Button";

const AddBoardModal = ({ show, hideModal, clickHandler }) => {
  const [shortCode, setShortCode] = useState(null);
  const [description, setDescription] = useState(null);
  return ReactDOM.createPortal(
    <Modal
      show={show}
      onHide={() => {
        hideModal();
      }}
    >
      <Modal.Header>Examination Board</Modal.Header>
      <Modal.Body
        style={{ display: "flex", flexDirection: "column" }}
        className="py-5 px-4"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1em",
          }}
        >
          <p className="info m-0">Abbreviation</p>
          <Input
            value={shortCode}
            changeHandler={(e) => {
              setShortCode(e.target.value);
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p className="info m-0">Full Form</p>
          <Input
            value={description}
            changeHandler={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          text="Proceed"
          extraClasses="px-4"
          clickHandler={() => {
            clickHandler(shortCode, description);
          }}
        />
      </Modal.Footer>
    </Modal>,
    document.getElementById("app-modal")
  );
};

export default AddBoardModal;
