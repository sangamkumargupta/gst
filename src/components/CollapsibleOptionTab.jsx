import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const CollapsibleOptionTab = ({ index, title, children, parentId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const itemId = `collapse-${parentId}-${index}`;

  return (
    <div className="accordion-item  shadow-sm rounded border">
      <h2 className="accordion-header" id={`heading-${itemId}`}>
        <button
          className={`accordion-button d-flex justify-content-between align-items-center ${!isOpen ? "collapsed" : ""}` }
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={itemId}
          style={{paddingTop:'0px',paddingBottom: '0px'}}
        >
          <div className="d-flex align-items-center">
            <strong className="me-2 text-secondary">{index + 1}.</strong>
            <span>{title}</span>
          </div>
        
        </button>
      </h2>

      <div
        id={itemId}
        className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
        aria-labelledby={`heading-${itemId}`}
      >
        <div className="accordion-body  text-muted">
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleOptionTab;
