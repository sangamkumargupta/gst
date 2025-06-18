import React, { memo } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "../assets/css/PopupMessage.css"; 

const PopupMessage = ({ type = "success", title, message, onClose }) => {
  const isSuccess = type === "success";

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {isSuccess ? (
          <FaCheckCircle className="popup-icon success" />
        ) : (
          <FaTimesCircle className="popup-icon error" />
        )}
        <h3 className="popup-title">{title || (isSuccess ? "Success" : "Error")}</h3>
        <p className="popup-message">{message}</p>
        <button
          className={`popup-btn ${isSuccess ? "success" : "error"}`}
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default memo(PopupMessage);
