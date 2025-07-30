// components/Button.jsx
import React from "react"; 
const Button = ({ type = "button", label,  variant = "primary", onClick, icon }) => {
  const bgColor = {
    primary: "#0d6efd",
    success: "#45D65B",
    warning: "#ffc107",
    info: "#0dcaf0",
    danger: "#E74C3C",
    secondary: "#6c757d"
  };

  const style = {
    backgroundColor: bgColor[variant] || "#0d6efd",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "4px",
    border: "none",
    marginRight: "10px",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    borderRadius: "20px", 
  };

  return (
    <button type={type} style={style} onClick={onClick}>
      {icon && <i className={`fa fa-${icon}`} />} {label}
    </button>
  );
};

export default React.memo(Button);


 
