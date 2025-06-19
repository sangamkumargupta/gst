import React, { useState, useRef, useEffect } from "react";
import "../assets/css/DropdownToggle.css";

const DropdownToggle = ({
  label,
  options,
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const closeDropdown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  }, []);

  return (
    <div className="custom-dropdown-wrapper">
      <div className="custom-dropdown-toggle-wrapper" ref={ref}>
        <button
          className="custom-btn-dropdown"
          onClick={() => setOpen(!open)}
        >
          {value || label}
          <span className={`custom-arrow-dropdown ${open ? "open" : ""}`}>▼</span>
        </button>

        {open && (
          <ul className="custom-dropdown-menu">
            {options.map((opt) => (
              <li
                key={opt}
                className={`custom-dropdown-option ${value === opt ? "custom-dropdown-option-selected" : ""}`}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
              >
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DropdownToggle;
