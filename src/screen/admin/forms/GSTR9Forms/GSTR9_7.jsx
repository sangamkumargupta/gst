import React, { useState, useEffect } from "react";
import { FaPencilAlt, FaTrash, FaPlus } from "react-icons/fa";
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

const GSTR9_7 = () => {
  const [selectedForm] = useState("SEVEN");
  const [formData, setFormData] = useState([]);
  const [activeTabForm, setActiveTabForm] = useState("form");
  const [updateLabel, setUpdateLabel] = useState("Submit");
  const [cancelLabel, setCancelLabel] = useState("Cancel");
  const [listData, setListData] = useState([]);
  const [otherReversalsCount, setOtherReversalsCount] = useState(1);

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
      <td>
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
      </td>
    );
  };

  useEffect(() => {
    const initialData = [
      {
        description: "(A) As per Rule 37",
        integrated_tax: 0,
        central_tax: 0,
        state_tax: 0,
        cess: 0,
        isDisabled: false,
        isSpecial: false,
      },
      {
        description: "(B) As per Rule 39",
        integrated_tax: 0,
        central_tax: 0,
        state_tax: 0,
        cess: 0,
        isDisabled: false,
        isSpecial: false,
      },
      {
        description: "(C) As per Rule 42",
        integrated_tax: 0,
        central_tax: 0,
        state_tax: 0,
        cess: 0,
        isDisabled: false,
        isSpecial: false,
      },
      {
        description: "(D) As per Rule 43",
        integrated_tax: 0,
        central_tax: 0,
        state_tax: 0,
        cess: 0,
        isDisabled: false,
        isSpecial: false,
      },
      {
        description: "(E) As per section 17(5)",
        integrated_tax: 0,
        central_tax: 0,
        state_tax: 0,
        cess: 0,
        isDisabled: false,
        isSpecial: false,
      },
      {
        description: "(F) Reversal of TRAN-1 credit",
        integrated_tax: "",
        central_tax: 0,
        state_tax: 0,
        cess: "",
        isDisabled: false,
        isSpecial: true,
      },
      {
        description: "(G) Reversal of TRAN-11 credit",
        integrated_tax: "",
        central_tax: 0,
        state_tax: 0,
        cess: "",
        isDisabled: false,
        isSpecial: true,
      },
      {
        description: "",
        integrated_tax: 0,
        central_tax: 0,
        state_tax: 0,
        cess: 0,
        specification: "",
        isDisabled: false,
        isSpecial: false,
        isOtherReversal: true,
        reversalNumber: 1,
      },
      {
        description: "(1) Total ITC Reversed (Sum of A to H above)",
        integrated_tax: 0,
        central_tax: 0,
        state_tax: 0,
        cess: 0,
        isDisabled: true,
        isSpecial: false,
      },
      {
        description: "(2) Net ITC Available for Utilization (60 - 71)",
        integrated_tax: 0,
        central_tax: 0,
        state_tax: 0,
        cess: 0,
        isDisabled: true,
        isSpecial: false,
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

      // Calculate totals when any value changes
      if (rowIndex < 8 + otherReversalsCount - 1) {
        // Only for rows A to H
        calculateTotals(updatedData);
      }

      return updatedData;
    });
  };

  const calculateTotals = (data) => {
    // Find the index of the first H row
    const firstHIndex = data.findIndex((item) => item.isOtherReversal);
    // Find the index of the total row
    const totalIndex = data.findIndex((item) =>
      item.description.startsWith("(1) Total ITC Reversed")
    );

    // Calculate total ITC reversed (sum of A to H)
    let totalIntegrated = 0;
    let totalCentral = 0;
    let totalState = 0;
    let totalCess = 0;

    // Sum all rows from A to H (before the total row)
    for (let i = 0; i < totalIndex; i++) {
      // Skip TRAN rows for integrated and cess
      if (!data[i].isSpecial) {
        totalIntegrated += parseFloat(data[i].integrated_tax) || 0;
        totalCess += parseFloat(data[i].cess) || 0;
      }
      totalCentral += parseFloat(data[i].central_tax) || 0;
      totalState += parseFloat(data[i].state_tax) || 0;
    }

    // Update total row
    data[totalIndex] = {
      ...data[totalIndex],
      integrated_tax: totalIntegrated,
      central_tax: totalCentral,
      state_tax: totalState,
      cess: totalCess,
    };
  };

  const addOtherReversalRow = () => {
    setFormData((prevData) => {
      const lastHIndex = prevData.findLastIndex((item) => item.isOtherReversal);
      const newRow = {
        description: "",
        integrated_tax: 0,
        central_tax: 0,
        state_tax: 0,
        cess: 0,
        specification: "",
        isDisabled: false,
        isSpecial: false,
        isOtherReversal: true,
        reversalNumber: otherReversalsCount + 1,
      };

      const newData = [
        ...prevData.slice(0, lastHIndex + 1),
        newRow,
        ...prevData.slice(lastHIndex + 1),
      ];

      calculateTotals(newData);
      return newData;
    });

    setOtherReversalsCount((prev) => prev + 1);
  };

  const removeOtherReversalRow = (index) => {
    // Find all other reversal rows
    const otherReversalRows = formData.filter((item) => item.isOtherReversal);

    if (otherReversalRows.length <= 1) {
      toast.warning("At least one Other reversals row must remain");
      return;
    }

    setFormData((prevData) => {
      const newData = prevData.filter((_, i) => i !== index);
      setOtherReversalsCount((prev) => prev - 1);

      // Recalculate totals
      calculateTotals(newData);

      return newData;
    });
  };

  const onAction = (action) => {
    switch (action) {
      case "save":
        toast.success("Form saved successfully!");
        setUpdateLabel("Update");
        setCancelLabel("Reset");
        setListData(formData);
        break;
      case "cancel":
        setFormData(listData);
        setOtherReversalsCount(
          listData.filter((item) => item.isOtherReversal).length
        );
        toast.info("Form reset!");
        break;
      default:
        break;
    }
  };

  const listColumns = [
    { label: "Description", key: "description" },
    { label: "Integrated tax (₹)", key: "integrated_tax", format: formatValue },
    { label: "Central tax (₹)", key: "central_tax", format: formatValue },
    { label: "State/UT tax (₹)", key: "state_tax", format: formatValue },
    { label: "CESS (₹)", key: "cess", format: formatValue },
    {
      label: "Action",
      key: "action",
      render: (row, index) => (
        <div>
          <TableActionButton
            icon={<FaPencilAlt />}
            onClick={() => handleEditRow(index)}
            tooltip="Edit"
          />
          {row.isOtherReversal && (
            <TableActionButton
              icon={<FaTrash />}
              onClick={() => removeOtherReversalRow(index)}
              tooltip="Delete"
            />
          )}
        </div>
      ),
    },
  ];

  const handleEditRow = (index) => {
    setActiveTabForm("form");
    // You might want to scroll to the specific row here
  };

  return (
    <div className="">
      <form>
        <div className="row">
          <div className="col-12 mb-3 table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th style={{ textAlign: "left", width: "40%" }}>
                    Description
                  </th>
                  <th style={{ width: "12%" }}>Integrated tax (₹)</th>
                  <th style={{ width: "12%" }}>Central tax (₹)</th>
                  <th style={{ width: "12%" }}>State/UT tax (₹)</th>
                  <th style={{ width: "12%" }}>CESS (₹)</th>
                  <th style={{ width: "12%" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td
                      style={{
                        textAlign: "left",
                        fontWeight: row.description.startsWith("(")
                          ? "bold"
                          : "normal",
                        paddingLeft: row.isOtherReversal ? "30px" : "10px",
                      }}
                    >
                      {row.isOtherReversal ? (
                        <span style={{ fontWeight: "bold" }}>
                          {row.description || ""}{" "}
                          {/* Only show description, no H1 numbering */}
                        </span>
                      ) : (
                        row.description
                      )}

                      {row.isOtherReversal && (
                        <input
                          type="text"
                          className="form-control p-0"
                          value={row.specification || ""}
                          onChange={(e) =>
                            handleTableChange(
                              rowIndex,
                              "specification",
                              e.target.value
                            )
                          }
                          placeholder="(H1)Specify reversal reason"
                          style={{ width: "100%" }}
                        />
                      )}
                    </td>
                    {row.isSpecial ? (
                      <>
                        <td style={{ backgroundColor: "#E9ECEF" }}></td>
                        <TaxInputCell
                          row={row}
                          rowIndex={rowIndex}
                          field="central_tax"
                          isDisabled={row.isDisabled}
                          formData={formData}
                          handleTableChange={handleTableChange}
                        />
                        <TaxInputCell
                          row={row}
                          rowIndex={rowIndex}
                          field="state_tax"
                          isDisabled={row.isDisabled}
                          formData={formData}
                          handleTableChange={handleTableChange}
                        />
                        <td style={{ backgroundColor: "#E9ECEF" }}></td>
                      </>
                    ) : (
                      <>
                        <TaxInputCell
                          row={row}
                          rowIndex={rowIndex}
                          field="integrated_tax"
                          isDisabled={row.isDisabled}
                          formData={formData}
                          handleTableChange={handleTableChange}
                        />
                        <TaxInputCell
                          row={row}
                          rowIndex={rowIndex}
                          field="central_tax"
                          isDisabled={row.isDisabled}
                          formData={formData}
                          handleTableChange={handleTableChange}
                        />
                        <TaxInputCell
                          row={row}
                          rowIndex={rowIndex}
                          field="state_tax"
                          isDisabled={row.isDisabled}
                          formData={formData}
                          handleTableChange={handleTableChange}
                        />
                        <TaxInputCell
                          row={row}
                          rowIndex={rowIndex}
                          field="cess"
                          isDisabled={row.isDisabled}
                          formData={formData}
                          handleTableChange={handleTableChange}
                        />
                      </>
                    )}
                    <td>
                      {row.isOtherReversal && (
                        <>
                          <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            onClick={addOtherReversalRow}
                            style={{ marginRight: "5px" }}
                          >
                            <FaPlus />
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={() => removeOtherReversalRow(rowIndex)}
                          >
                            <FaTrash />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
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
          <p className="text-muted">BACK TO GSTR-9 DASHBOARD</p>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
};

export default GSTR9_7;
