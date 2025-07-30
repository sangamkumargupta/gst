import React from "react";
import { FaSyncAlt } from "react-icons/fa";

const CMP08 = () => {
  const allColumns = ["TAXABLE VALUE", "IGST", "CGST", "SGST", "CESS"];
  const sectionTitles = [
    "(1) Outward supplies (including exempted supplies)",
    "(2) Inward supplies attracting Reverse charge (including import of services)",
  ];
  const subSections = ["(a) Tax", "(b) Interest", "(c) Late Fee"];
  const groupedSections = ["Payable", "Utilization", "Balance"];

  // Dummy data JSON
  const dummyData = {
    main: [
      { "TAXABLE VALUE": "1000", IGST: "", CGST: "50", SGST: "50", CESS: "" },
      { "TAXABLE VALUE": "500", IGST: "0.00", CGST: "25", SGST: "25", CESS: "0.00" },
    ],
    group: {
      Payable: {
        "(a) Tax": { IGST: "20", CGST: "10", SGST: "10", CESS: "0" },
        "(b) Interest": { IGST: "2", CGST: "1", SGST: "1", CESS: "0" },
        "(c) Late Fee": { IGST: "0", CGST: "0", SGST: "0", CESS: "0" },
      },
      Utilization: {
        "(a) Tax": { IGST: "15", CGST: "10", SGST: "10", CESS: "0" },
        "(b) Interest": { IGST: "1", CGST: "1", SGST: "1", CESS: "0" },
        "(c) Late Fee": { IGST: "0", CGST: "0", SGST: "0", CESS: "0" },
      },
      Balance: {
        "(a) Tax": { IGST: "5", CGST: "0", SGST: "0", CESS: "0" },
        "(b) Interest": { IGST: "1", CGST: "0", SGST: "0", CESS: "0" },
        "(c) Late Fee": { IGST: "0", CGST: "0", SGST: "0", CESS: "0" },
      },
    },
  };

  // Format to Indian Rupee style
  const formatINR = (value) => {
    const num = parseFloat(value.replace(/,/g, ""));
    if (isNaN(num)) return "";
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const shouldDisableCell = (rowType, rowIdx, subIdx, colName) => {
    if (rowType === "main") {
      if (rowIdx === 0 && (colName === "IGST" || colName === "CESS")) return true;
    }

    if (rowType === "group") {
      if (groupedSections[rowIdx] === "Balance") return true;
      if (groupedSections[rowIdx] === "Payable" && subIdx === 0) return true;
    }

    return false;
  };

  const getInputProps = (value, disabled = false) => ({
    type: "text",
    defaultValue: formatINR(value),
    readOnly: disabled,
    className: "form-control form-control-sm text-end border-secondary",
    style: {
      borderRadius: "10px",
      backgroundColor: disabled ? "#e9ecef" : undefined,
    },
    onInput: (e) => {
      // Allow only digits and single dot
      e.target.value = e.target.value
        .replace(/[^0-9.]/g, "")
        .replace(/(\..*)\./g, "$1");
    },
    onBlur: (e) => {
      e.target.value = formatINR(e.target.value);
    },
  });

  return (
    <div className="container-fluid p-0">
      <div className="card shadow-sm border-0">
        <div className="card-body p-3">
          {/* Top Buttons Row */}
          <div className="row g-2 mb-3">
            <div className="col-12 col-md-auto">
              <button className="btn_redbtn redbtn btn btn-sm rounded-pill px-3 py-1 w-100 w-md-auto">
                Status: Not Available
              </button>
            </div>
            <div className="col-12 col-md-auto">
              <button className="btn btn-primary btn-sm rounded-pill px-3 py-1 fw-bold w-100 w-md-auto">
                Date: -
              </button>
            </div>
            <div className="col-12 col-md-auto">
              <button className="btn btn-primary btn-sm rounded-pill px-3 py-1 fw-bold w-100 w-md-auto">
                ARN: -
              </button>
            </div>
            <div className="col-12 col-md-auto">
              <button className="btn btn-primary btn-sm rounded-pill px-3 py-1 fw-bold w-100 w-md-auto">
                <FaSyncAlt size={12} />
              </button>
            </div>
            <div className="col-12 col-md d-flex align-items-center">
              <div className="form-check w-100 d-flex align-items-center justify-content-md-end">
                <div className="p-2 shadow-sm cmp-rounded-md bg-white d-flex">
                  <input className="" type="checkbox" /> &nbsp;
                  <span className="">MARK AS NIL RETURN</span>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-bordered table-sm m-0">
              <thead>
                <tr>
                  <th className="text-start" style={{ width: "30%" }}>PARTICULAR</th>
                  {allColumns.map((col) => (
                    <th key={col} className="text-end" style={{ width: "14%" }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Main Rows */}
                {sectionTitles.map((label, rowIdx) => (
                  <tr key={`main-${rowIdx}`}>
                    <td className="text-start fw-medium">{label}</td>
                    {allColumns.map((col) => {
                      const disabled = shouldDisableCell("main", rowIdx, 0, col);
                      const value = dummyData.main[rowIdx]?.[col] ?? "0.00";
                      return (
                        <>
                          {value === "" ? (
                            <td key={`td-disabled-main-${rowIdx}-${col}`} className="p-1" style={{ background: "#e9ecef" }} />
                          ) : (
                            <td key={`main-${rowIdx}-${col}`} className="p-1">
                              <input {...getInputProps(value, disabled)} />
                            </td>
                          )}
                        </>
                      );
                    })}
                  </tr>
                ))}

                {/* Grouped Sections */}
                {groupedSections.map((section, groupIdx) => (
                  <React.Fragment key={`group-${groupIdx}`}>
                    {/* Section Header */}
                    <tr className="table-active">
                      <td colSpan={allColumns.length + 1} className="fw-bold p-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <span>({groupIdx + 3}) {section}</span>
                          {section === "Utilization" && (
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input me-1"
                                type="checkbox"
                                id={`autoCalc${groupIdx}`}
                              />
                              <label
                                className="form-check-label fw-normal"
                                htmlFor={`autoCalc${groupIdx}`}
                              >
                                Auto Calculation
                              </label>
                            </div>
                          )}
                          <span style={{ width: "80px" }} />
                        </div>
                      </td>
                    </tr>

                    {/* Sub-sections */}
                    {subSections.map((sub, subIdx) => (
                      <tr key={`sub-${groupIdx}-${subIdx}`}>
                        <td colSpan={2} className="ps-4 small text-start">{sub}</td>
                        {allColumns.slice(1).map((col) => {
                          const disabled = shouldDisableCell("group", groupIdx, subIdx, col);
                          const value = dummyData.group[section]?.[sub]?.[col] ?? "0.00";
                          return (
                            <td key={`sub-${groupIdx}-${subIdx}-${col}`} className="p-1">
                              <input {...getInputProps(value, disabled)} />
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMP08;
