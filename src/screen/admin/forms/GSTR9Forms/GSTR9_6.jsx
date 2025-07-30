import React, { useState, useEffect } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import Button from "../../../../components/Button";
import { forms } from "../../../../forms/formConfig";
import "../../../../assets/css/formcss.css";
import { toast, ToastContainer } from "react-toastify";
import TabSwitcher from "../../../../components/TabSwitcher";
import Datatable from "../../../../components/DataTable";
import TableActionButton from "../../../../components/TableActionButton.jsx";

const formstab = [
  { label: "Form", key: "form" },
  { label: "List", key: "list" },
];

const GSTR9_6 = () => {
  const [selectedForm] = useState("SIX");
  const [formData, setFormData] = useState([]);
  const [activeTabForm, setActiveTabForm] = useState("form");
  const [updateLabel, setUpdateLabel] = useState("Submit");
  const [cancelLabel, setCancelLabel] = useState("Cancel");
  const [listData, setListData] = useState([]);

  const disabledParticulars = [
    "(E) Import of goods (including supplies from SEZ)",
    "(F) Import of services (excluding inward supplies from SEZ)",
  ];

  const mergedSections = [
    "(A) Total amount of input tax credit availed through FORM GSTR-3B (sum total of Table 4A of FORM GSTR-3B)",
    "(F) Import of services (excluding inward supplies from SEZ)",
    "(G) Input Tax credit received from ISD",
    "(H) Amount of ITC reclaimed (other than B above) under the provisions of the Act",
    "(I) Sub total (B to H above)",
    "(J) Difference (I - A above)",
    "(K) Transition Credit through TRAN-I (including revisions if any)",
    "(L) Transition Credit through TRAN-II",
    "(M) Any other ITC availed but not specified above",
    "(N) Sub total (K to N above)",
    "(O) Total ITC availed (A + N above)",
  ];
  // Declare these outside render function
  const rowSpanGroups = {
    "(B) Inward supplies (other than imports and inward supplies liable to reverse charge but includes services received from SEZs)": 3,
    "(C) Inward supplies received from unregistered persons liable to reverse charge (other than B above) on which tax is paid & ITC availed": 2,
    "(D) Inward supplies received from registered persons liable to reverse charge (other than B above) on which tax is paid and ITC availed": 2,
    "(E) Import of goods (including supplies from SEZ)": 2,
  };
  const skipIndices = new Set();
  formData.forEach((row, index) => {
    if (rowSpanGroups[row.particular]) {
      // Mark next rows for this group as skip (rowSpan - 1)
      for (let i = 1; i < rowSpanGroups[row.particular]; i++) {
        skipIndices.add(index + i);
      }
    }
  });

  const shouldDisableField = (row, rowIndex, formData, field) => {
    if (
      (row.particular === "(E) Import of goods (including supplies from SEZ)" ||
        row.particular ===
          "(F) Import of services (excluding inward supplies from SEZ)") &&
      (field === "central_tax" || field === "state_tax")
    ) {
      return true;
    }

    if (
      row.particular === "" &&
      row.type === "Capital goods" &&
      disabledParticulars.includes(formData[rowIndex - 1]?.particular) &&
      (field === "central_tax" || field === "state_tax")
    ) {
      return true;
    }

    return false;
  };

  // Helper function to format value with ₹ symbol
  const formatValue = (value) => {
    if (value === 0 || value === "" || value === null || value === undefined) {
      return "";
    }
    return `₹${value.toFixed(2)}`;
  };

  // Helper function to parse input value
  const parseInput = (value) => {
    if (value === "") return 0;
    // Remove ₹ symbol and any non-numeric characters except decimal point
    const numValue = parseFloat(value.replace(/[^\d.]/g, ""));
    return isNaN(numValue) ? 0 : numValue;
  };

  const TaxInputCell = ({
    row,
    rowIndex,
    field,
    isDisabled,
    formData,
    handleTableChange,
  }) => {
    const disabled = shouldDisableField(row, rowIndex, formData, field);
    const [inputValue, setInputValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    // Initialize the input value
    useEffect(() => {
      const val = row[field];
      setInputValue(
        val === 0 || val === "" || val === null || val === undefined
          ? ""
          : val.toString()
      );
    }, [row[field]]);

    const handleChange = (e) => {
      const value = e.target.value;
      // Allow only numbers and decimal point
      if (/^[0-9]*\.?[0-9]*$/.test(value)) {
        setInputValue(value);
      }
    };

    const handleFocus = () => {
      setIsFocused(true);
      // When focusing, show the raw number without formatting
      const val = row[field];
      setInputValue(
        val === 0 || val === "" || val === null || val === undefined
          ? ""
          : val.toString()
      );
    };

    const handleBlur = () => {
      setIsFocused(false);
      const numValue = inputValue === "" ? 0 : parseFloat(inputValue);
      handleTableChange(rowIndex, field, numValue);
      // Show the actual value when blurred, not just ₹
      setInputValue(numValue === 0 ? "" : numValue.toString());
    };

    return (
      <td style={disabled ? { backgroundColor: "#E9ECEF" } : {}}>
        {!disabled && (
          <input
            type="text"
            className="form-control"
            value={isFocused ? inputValue : inputValue === "" ? "" : inputValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="₹0.00"
            readOnly={isDisabled}
            style={
              isDisabled
                ? {
                    backgroundColor: "#f8f9fa",
                    border: "none",
                    fontWeight: "bold",
                  }
                : {}
            }
          />
        )}
      </td>
    );
  };

  useEffect(() => {
    const initialData = [
      // Section A
      {
        particular:
          "(A) Total amount of input tax credit availed through FORM GSTR-3B (sum total of Table 4A of FORM GSTR-3B)",
        type: "",
        integrated_tax: "₹33.00",
        central_tax: "₹34.00",
        state_tax: "₹34.00",
        cess: "₹34.00",
        isDisabled: true,
      },
      // Section B
      {
        particular:
          "(B) Inward supplies (other than imports and inward supplies liable to reverse charge but includes services received from SEZs)",
        type: "Inputs",
        integrated_tax: "",
        central_tax: "",
        state_tax: "",
        cess: "",
        isDisabled: false,
      },
      {
        particular: "",
        type: "Capital goods",
        integrated_tax: "",
        central_tax: "",
        state_tax: "",
        cess: "",
        isDisabled: false,
      },
      {
        particular: "",
        type: "Input Services",
        integrated_tax: "",
        central_tax: "",
        state_tax: "",
        cess: "",
        isDisabled: false,
      },
      // Section C
      {
        particular:
          "(C) Inward supplies received from unregistered persons liable to reverse charge (other than B above) on which tax is paid & ITC availed",
        type: "Inputs",
        integrated_tax: "",
        central_tax: "",
        state_tax: "",
        cess: "",
        isDisabled: false,
      },
      {
        particular: "",
        type: "Capital goods",
        integrated_tax: "",
        central_tax: "",
        state_tax: "",
        cess: "",
        isDisabled: false,
      },
      {
        particular: "",
        type: "Input Services",
        integrated_tax: "",
        central_tax: "",
        state_tax: "",
        cess: "",
        isDisabled: false,
      },
      // Section D
      {
        particular:
          "(D) Inward supplies received from registered persons liable to reverse charge (other than B above) on which tax is paid and ITC availed",
        type: "Inputs",
        integrated_tax: "",
        central_tax: "",
        state_tax: "",
        cess: "",
        isDisabled: false,
      },
      {
        particular: "",
        type: "Capital goods",
        integrated_tax: "",
        central_tax: "",
        state_tax: "",
        cess: "",
        isDisabled: false,
      },
      {
        particular: "",
        type: "Input Services",
        integrated_tax: "",
        central_tax: "",
        state_tax: "",
        cess: "",
        isDisabled: false,
      },
      // Section E
      {
        particular: "(E) Import of goods (including supplies from SEZ)",
        type: "Inputs",
        integrated_tax: "",
        central_tax: "",
        state_tax: "",
        cess: "",
        isDisabled: false,
      },
      {
        particular: "",
        type: "Capital goods",
        integrated_tax: "",
        central_tax: "",
        state_tax: "",
        cess: "",
        isDisabled: false,
      },
      // Section F
      {
        particular:
          "(F) Import of services (excluding inward supplies from SEZ)",
        type: "",
        integrated_tax: "",
        central_tax: "",
        state_tax: "",
        cess: "",
        isDisabled: false,
      },
      // Section G
      {
        particular: "(G) Input Tax credit received from ISD",
        type: "",
        integrated_tax: "",
        central_tax: "",
        state_tax: "",
        cess: "",
        isDisabled: false,
      },
      // Section H
      {
        particular:
          "(H) Amount of ITC reclaimed (other than B above) under the provisions of the Act",
        type: "",
        integrated_tax: "",
        central_tax: "",
        state_tax: "",
        cess: "",
        isDisabled: false,
      },
      // Section I
      {
        particular: "(I) Sub total (B to H above)",
        type: "",
        integrated_tax: "",
        central_tax: "",
        state_tax: "",
        cess: "",
        isDisabled: true,
      },
      // Section J
      {
        particular: "(J) Difference (I - A above)",
        type: "",
        integrated_tax: "-₹200.00",
        central_tax: "-₹137.00",
        state_tax: "-₹200.00",
        cess: "-₹200.00",
        isDisabled: true,
      },
      // Section K
      {
        particular:
          "(K) Transition Credit through TRAN-I (including revisions if any)",
        type: "",
        integrated_tax: "",
        central_tax: "",
        state_tax: "",
        cess: "",
        isDisabled: false,
      },
      // Section L
      {
        particular: "(L) Transition Credit through TRAN-II",
        type: "",
        integrated_tax: "",
        central_tax: "",
        state_tax: "",
        cess: "",
        isDisabled: false, // <-- NOW EDITABLE
      },

      // Section M
      {
        particular: "(M) Any other ITC availed but not specified above",
        type: "",
        integrated_tax: "",
        central_tax: "",
        state_tax: "",
        cess: "",
        isDisabled: false,
      },
      // Section N
      {
        particular: "(N) Sub total (K to N above)",
        type: "",
        integrated_tax: "",
        central_tax: "",
        state_tax: "",
        cess: "",
        isDisabled: true,
      },
      // Section O
      {
        particular: "(O) Total ITC availed (A + N above)",
        type: "",
        integrated_tax: "",
        central_tax: "",
        state_tax: "",
        cess: "",
        isDisabled: true,
      },
    ];
    setFormData(initialData);
    setListData(initialData);
  }, []);
  const handleTableChange = (rowIndex, colName, value) => {
    setFormData((prevData) => {
      const updatedData = [...prevData];
      const row = updatedData[rowIndex];
      updatedData[rowIndex] = { ...row, [colName]: value };
      return updatedData;
    });
  };

  // ... (rest of the component code remains the same, including onAction, handleEditRow, handleDeleteRow, listColumns)

  return (
    <div className="">
      <form>
        <div className="row">
          <div className="col-12 mb-3 table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th style={{ textAlign: "left", width: "40%" }}>Details</th>
                  <th style={{ width: "10%" }}>Type</th>
                  <th style={{ width: "10%" }}>Integrated tax (₹)</th>
                  <th style={{ width: "10%" }}>Central tax (₹)</th>
                  <th style={{ width: "10%" }}>State/UT tax (₹)</th>
                  <th style={{ width: "10%" }}>CESS (₹)</th>
                </tr>
              </thead>
              <tbody>
                {formData.map((row, rowIndex) => {
                  const isDisabled = row.isDisabled;
                  const isParentRow =
                    row.particular && row.particular.startsWith("(");
                  const showType =
                    !isParentRow || (row.type && row.type !== "");
                  const isSpecialRow = mergedSections.includes(row.particular);

                  return (
                    <tr key={rowIndex}>
                      {/* Details cell with colspan for special rows */}
                      <td
                        style={{
                          textAlign: "left",
                          fontWeight: isParentRow ? "bold" : "normal",
                          paddingLeft: isParentRow ? "10px" : "30px",
                        }}
                        colSpan={isSpecialRow ? 2 : 1}
                      >
                        {isSpecialRow ? (
                          <div>
                            <div>{row.particular}</div>
                            {row.type && (
                              <div
                                style={{
                                  fontStyle: "italic",
                                  marginTop: "5px",
                                }}
                              >
                                {row.type}
                              </div>
                            )}
                          </div>
                        ) : (
                          row.particular || ""
                        )}
                      </td>

                      {/* Only show Type column if not a special row */}
                      {!isSpecialRow && (
                        <td>{showType && <strong>{row.type}</strong>}</td>
                      )}

                      {/* Rest of your tax columns (keep these unchanged) */}
                      {row.particular ===
                        "(K) Transition Credit through TRAN-I (including revisions if any)" && (
                        <td
                          rowSpan={2}
                          style={{
                            backgroundColor: "#E9ECEF",
                            textAlign: "center",
                            verticalAlign: "middle",
                            fontWeight: "bold",
                          }}
                        ></td>
                      )}

                      {![
                        "(K) Transition Credit through TRAN-I (including revisions if any)",
                        "(L) Transition Credit through TRAN-II",
                      ].includes(row.particular) && (
                        <TaxInputCell
                          row={row}
                          rowIndex={rowIndex}
                          field="integrated_tax"
                          isDisabled={isDisabled}
                          formData={formData}
                          handleTableChange={handleTableChange}
                        />
                      )}

                      <TaxInputCell
                        row={row}
                        rowIndex={rowIndex}
                        field="central_tax"
                        isDisabled={isDisabled}
                        formData={formData}
                        handleTableChange={handleTableChange}
                      />

                      <TaxInputCell
                        row={row}
                        rowIndex={rowIndex}
                        field="state_tax"
                        isDisabled={isDisabled}
                        formData={formData}
                        handleTableChange={handleTableChange}
                      />

                      {row.particular ===
                        "(K) Transition Credit through TRAN-I (including revisions if any)" && (
                        <td
                          rowSpan={2}
                          style={{
                            backgroundColor: "#E9ECEF",
                            textAlign: "center",
                            verticalAlign: "middle",
                            fontWeight: "bold",
                          }}
                        ></td>
                      )}

                      {![
                        "(K) Transition Credit through TRAN-I (including revisions if any)",
                        "(L) Transition Credit through TRAN-II",
                      ].includes(row.particular) && (
                        <TaxInputCell
                          row={row}
                          rowIndex={rowIndex}
                          field="cess"
                          isDisabled={isDisabled}
                          formData={formData}
                          handleTableChange={handleTableChange}
                        />
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="form-buttons mt-4">
          <Button
            label={updateLabel}
            type="button"
            variant="success"
            onClick={(e) => {
              e.preventDefault();
              onAction("save");
            }}
            style={{ marginRight: "10px" }}
          />
          <Button
            label={cancelLabel}
            type="button"
            variant="danger"
            onClick={(e) => {
              e.preventDefault();
              onAction("cancel");
            }}
          />
        </div>

        <div className="mt-3">
          <p className="text-muted">BACK TO GSTR-3 DASHBOARD</p>
        </div>
      </form>
    </div>
  );
};

export default GSTR9_6;
