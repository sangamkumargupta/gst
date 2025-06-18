import React from "react";
import "../assets/css/tableActionButton.css";

const TableActionButton = ({ icon: Icon, title, onClick, type }) => {
  return (
    <div className={`table-action-btn ${type}`} title={title} onClick={onClick}>
      <Icon size={12} />
    </div>
  );
};

export default TableActionButton;
