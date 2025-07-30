import React, { useState } from "react";

// Imported components
import GSTR9_1 from "./forms/GSTR9Forms/GSTR9_1";
import GSTR9_2 from "./forms/GSTR9Forms/GSTR9_2";
import GSTR9_3 from "./forms/GSTR9Forms/GSTR9_3";
import GSTR9_4 from "./forms/GSTR9Forms/GSTR9_4";
import GSTR9_5 from "./forms/GSTR9Forms/GSTR9_5";
import GSTR9_6 from "./forms/GSTR9Forms/GSTR9_6";
import GSTR9_7 from "./forms/GSTR9Forms/GSTR9_7";
import GSTR9_8 from "./forms/GSTR9Forms/GSTR9_8";
import GSTR9_9 from "./forms/GSTR9Forms/GSTR9_9";
import GSTR9_10_11_12_13 from "./forms/GSTR9Forms/GSTR9_10_11_12_13"; 
import GSTR9_14 from "./forms/GSTR9Forms/GSTR9_14";
import GSTR9_15 from "./forms/GSTR9Forms/GSTR9_15";
import GSTR9_16 from "./forms/GSTR9Forms/GSTR9_16";
import GSTR9_17 from "./forms/GSTR9Forms/GSTR9_17";
import GSTR9_18 from "./forms/GSTR9Forms/GSTR9_18";


// ✅ Map code to component
const sectionComponents = {
  GSTR9_1: GSTR9_1,
  GSTR9_2: GSTR9_2,
  GSTR9_3: GSTR9_3,
  GSTR9_4: GSTR9_4,
  GSTR9_5: GSTR9_5,
  GSTR9_6: GSTR9_6,
  GSTR9_7: GSTR9_7,
  GSTR9_8: GSTR9_8,
  GSTR9_9: GSTR9_9,
  GSTR9_10_11_12_13: GSTR9_10_11_12_13, 
  GSTR9_14: GSTR9_14,
  GSTR9_15: GSTR9_15,
  GSTR9_16: GSTR9_16, 
  GSTR9_17: GSTR9_17,
  GSTR9_18: GSTR9_18,

};

// ✅ Section list
const regularOptions = [
  {
    code: "GSTR9_4",
    label:
      "4. Details of advances, inward and outward supplies made during the financial year on which tax is payable",
  },
  {
    code: "GSTR9_5",
    label:
      "5. Details of outward supplies made during the financial year on which tax is not payable",
  },
  {
    code: "GSTR9_6",
    label:
      "6. Details of Input Tax Credit (ITC) availed during the financial year",
  },
  {
    code: "GSTR9_7",
    label:
      "7. Details of ITC reversed and ineligible ITC for the financial year",
  },
  {
    code: "GSTR9_8",
    label: "8. Other ITC-related information",
  },
  {
    code: "GSTR9_9",
    label:
      "9. Details of tax paid as declared in returns filed during the financial year",
  },
  {
    code: "GSTR9_10_11_12_13",
    label:
      "10–13. Particulars of transactions for the financial year declared in returns of the next financial year up to the specified period",
  },
  {
    code: "GSTR9_14",
    label:
      "14. Differential tax paid on account of declarations in Table 10 and 11",
  },
  {
    code: "GSTR9_15",
    label: "15. Particulars of demands and refunds",
  },
  {
    code: "GSTR9_16",
    label:
      "16. Supplies received from composition taxpayers, deemed supplies from job workers, and goods sent on approval basis",
  },
  {
    code: "GSTR9_17",
    label: "17. HSN-wise summary of outward supplies",
  },
  {
    code: "GSTR9_18",
    label: "18. HSN-wise summary of inward supplies",
  },
  {
    code: "GSTR9_19",
    label: "19. Late fee payable and paid",
  },
];

const GSTR9 = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mt-4">
      <h5 className="mb-3 fw-bold text-primary">GSTR-9 Summary Sections</h5>

      <div className="accordion" id="gstr9Accordion">
        {regularOptions.map((item, index) => (
          <div
            key={item.code}
            className="accordion-item shadow-sm border rounded mb-2"
          >
            <h2 className="accordion-header" id={`heading-${index}`}>
              <button
                className={`accordion-button ${
                  openIndex === index ? "" : "collapsed"
                }`}
                type="button"
                onClick={() => toggleAccordion(index)}
                aria-expanded={openIndex === index}
                aria-controls={`collapse-${index}`}
                style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
              >
                {/* <strong className="me-2 text-secondary">{index + 1}.</strong> */}
                {item.label}
              </button>
            </h2>
            <div
              id={`collapse-${index}`}
              className={`accordion-collapse collapse ${
                openIndex === index ? "show" : ""
              }`}
              aria-labelledby={`heading-${index}`}
            >
              <div className="accordion-body text-muted">
                {(() => {
                  const Component = sectionComponents[item.code];
                    
                  return Component ? (
                    <>
                      <Component /> 
                    </>
                  ) : (
                    <div className="text-danger">
                      No form available for this section.
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GSTR9;
