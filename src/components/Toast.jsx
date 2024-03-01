import React, { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";

const Toast = ({ type, text, hideModal }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, [text]);
  return (
    <>
      <div className="position-fixed bottom-0 p-3" style={{ zIndex: 11 }}>
        <div
          id="liveToast"
          className={`toast ${show ? "show" : "hide"}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            {type == "fail" ? (
              <AlertTriangle color="var(--color-error)" className="me-2" />
            ) : (
              <></>
            )}
            <strong
              className="me-auto"
              style={{
                color: `${
                  type == "fail" ? "var(--color-error)" : "var(--color-info)"
                }`,
              }}
            >
              {type == "fail" ? "Failed" : "Success"}
            </strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={() => {
                setShow(false);
                hideModal();
              }}
            ></button>
          </div>
          <div className="toast-body">{text}</div>
        </div>
      </div>
    </>
  );
};

export default Toast;
