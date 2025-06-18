import React, { useState, useRef, useEffect } from "react";

const DropdownToggle = ({
  label,
  options,
  value,
  onChange,
  className = "",              // wrapper class
  buttonClass = "",            // button style
  dropdownClass = "",          // dropdown style
  optionClass = "",            // option item style
  selectedOptionClass = "",    // selected item style
  arrowClass = ""              // arrow icon style
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
    <div className={className} ref={ref}>
      <button
        className={buttonClass}
        onClick={() => setOpen(!open)}
      >
        {value || label}
        <span className={arrowClass}>▼</span>
      </button>

      {open && (
        <ul className={dropdownClass} >
          {options.map((opt) => (
            <li 
              key={opt}
              className={`${optionClass} ${value === opt ? selectedOptionClass : ""}`}
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
  );
};

export default DropdownToggle;
