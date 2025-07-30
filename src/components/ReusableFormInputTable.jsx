import React from "react";
import { ToastContainer } from "react-toastify";
import dropdownOptions from "./dropdownOptions"; // adjust path as needed
import TableActionButton from "../components/TableActionButton";
import {
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";
const ReusableFormInputTable = ({ rows, onChangeRow, onAddRow, onRemoveRow , pageName}) => {
  const field = {
    label: "Item Details",
    name: "tables",
    type: "table",
    tag: "table",
    columns: [
      {
        label: "Rate (%)",
        name: "rate",
        type: "select",
        placeholder: "Select rate",
        options: dropdownOptions.rate,
      },
      {
        label:  pageName === "AT" || pageName === "ATADJ"? "Taxable value(Gross Advance Received)" : "Taxable Value(₹)",
        name: "taxable_value",
        type: "text",
        placeholder: "Enter taxable value",
      },
      {
        label: "Amount Of Tax",
        name: "amount_of_tax",
        type: "heading",
      },
      {
        label: "Integrated Tax(₹)",
        name: "integrated_tax",
        type: "number",
        placeholder: "Enter IGST amount",
        parent: "Amount Of Tax",
      },
      {
        label: "Central Tax(₹)",
        name: "central_tax",
        type: "number",
        placeholder: "Enter CGST amount",
        parent: "Amount Of Tax",
      },
      {
        label: "State Tax(₹)",
        name: "state_tax",
        type: "number",
        placeholder: "Enter SGST amount",
        parent: "Amount Of Tax",
      },
      {
        label: "Cess(₹)",
        name: "cess",
        type: "number",
        placeholder: "Enter Cess amount",
        parent: "Amount Of Tax",
      },
       // NEW FIELD after Amount Of Tax group
    {
      label: "Invoice Value(₹)",
      name: "invoice_value",
      type: "number",
      placeholder: "Enter Invoice Value",
    }
    ],
  };

  const handleAdd = () => {
    const newRow = {};
    field.columns.forEach((col) => {
      if (col.type !== "heading") {
        newRow[col.name] = "";
      }
    });
    onAddRow(field.name, newRow);
  };

  return (
    <div>
      <label className="fw-bold mb-2 d-block">{field.label}</label>
      <div className="table-responsive">
        <table className="table table-bordered responsive-table align-middle text-center">
          <thead>
            <tr>
              {field.columns.map((col, i) => {
                if (col.type === "heading") {
                  const subCols = field.columns.filter((c) => c.parent === col.label);
                  return (
                    <th key={`heading-${i}`} colSpan={subCols.length}>
                      {col.label}
                    </th>
                  );
                } else if (!col.parent) {
                  return (
                    <th key={`rowspan-${i}`} rowSpan="2">
                      {col.label}
                    </th>
                  );
                } else {
                  return null;
                }
              })}
              <th rowSpan="2">Action</th>
            </tr>
            <tr>
              {field.columns.map((col, i) =>
                col.parent ? <th key={`subcol-${i}`}>{col.label}</th> : null
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {field.columns.map((col, colIndex) => {
                  if (col.type === "heading") return null;

                  return (
                    <td key={colIndex}>
                      {col.type === "select" ? (
                        <select
                          className="form-select form-select-sm"
                          value={row[col.name] || ""}
                          onChange={(e) =>
                            onChangeRow(field.name, rowIndex, col.name, e.target.value)
                          }
                        >
                          <option value="">Select</option>
                          {col.options?.map((opt, i) => (
                            <option key={i} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={col.type}
                          className="form-control form-control-sm"
                          placeholder={col.placeholder}
                          value={row[col.name] || ""}
                          onChange={(e) =>
                            onChangeRow(field.name, rowIndex, col.name, e.target.value)
                          }
                        />
                      )}
                    </td>
                  );
                })}
                <td>
                  {/* <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={() => onRemoveRow(field.name, rowIndex)}
                  >
                    Remove
                  </button> */}
                    <TableActionButton
                      icon={FaTrash}
                      type="delete"
                      title="Delete"
                       onClick={() => onRemoveRow(field.name, rowIndex)}
                    />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        className="btn btn-sm btn-success mt-2"
        onClick={handleAdd}
      >
        + Add Row
      </button>

      <ToastContainer />
    </div>
  );
};

export default ReusableFormInputTable;