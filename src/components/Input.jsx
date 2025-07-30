// components/Input.jsx
import React from "react";

const Input = ({ label, type = "text", name, placeholder, value, onChange, className ,error}) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      {label && <label style={{ display: "block", marginBottom: "6px" }}>{label}</label>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        className={` ${error ? "input-error" : ""}`}
        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
      />
    </div>
  );
};

export default React.memo(Input);


// Input.jsx
// const Input = ({
//   label,
//   type = "text",
//   name,
//   placeholder,
//   value,
//   onChange,
//   error,
//   className = ""
// }) => {
//   return (
//     <div className={`input-wrapper ${className}`}>
//       {label && <label>{label}</label>}
//       <input
//         type={type}
//         name={name}
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         className={`form-control ${error ? "input-error" : ""}`}
//       />
//       {/* {error && <div className="error-text">{error}</div>} */}
//     </div>
//   );
// };

// export default Input;
