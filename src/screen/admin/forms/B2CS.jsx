import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import {
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { forms } from "../../../forms/formConfig";
import { buttons } from "../../../forms/buttonConfig";
import "../../../assets/css/formcss.css";
import { toast, ToastContainer } from "react-toastify";
import ReusableFormInputTable from "../../../components/ReusableFormInputTable";
import TabSwitcher from "../../../components/TabSwitcher";
import Datatable from "../../../components/DataTable";
import TableActionButton from "../../../components/TableActionButton.jsx";

import {
  generateInitialValues,
  validateFields,
  handleSubmit,
} from "../../../utils/formUtils";

const formstab = [
  { label: "Form", key: "form" },
  { label: "List", key: "list" },
];

const B2CS = () => {
  const [selectedForm] = useState("B2CS");
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [activeTabForm, setActiveTabForm] = useState("form");
  const [updateLabel, setUpdateLabel] = useState("Submit");
  const [cancelLabel, setCancelLabel] = useState("Cancel");

  const [listData, setListData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedDetailRow, setSelectedDetailRow] = useState(null);

const openDetailModal = (row) => {
  setSelectedDetailRow(row);
};

const closeDetailModal = () => {
  setSelectedDetailRow(null);
};


  useEffect(() => {
    const initial = generateInitialValues(forms[selectedForm]);
    initial["tables"] = initial["tables"]?.length
      ? initial["tables"]
      : [
          {
            rate: "",
            taxable_value: "",
            integrated_tax: "",
            central_tax: "",
            state_tax: "",
            cess: "",
          },
        ];
    setFormData(initial);
    setFormErrors({});
  }, [selectedForm]);
  // Add this state to your component
const [expandedRows, setExpandedRows] = useState([]);
// Add this toggle function
const toggleRow = (index) => {
  const currentExpandedRows = [...expandedRows];
  const isRowExpanded = currentExpandedRows.includes(index);
  
  if (isRowExpanded) {
    currentExpandedRows.splice(currentExpandedRows.indexOf(index), 1);
  } else {
    currentExpandedRows.push(index);
  }
  
  setExpandedRows(currentExpandedRows);
};

  useEffect(() => {
  setListData([
    {
      pos: "Maharashtra",
      rate_of_tax: "18",
      ecommerce_gstin: "27ABCDE1234F1Z5", // from `source` in original data
      items: [
        {
          rate: "18",
          taxable_value: "10000",
          integrated_tax: "1800",
          central_tax: "900",
          state_tax: "900",
          cess: "0",
          invoice_value: "11800",
        },
        {
          rate: "12",
          taxable_value: "5000",
          integrated_tax: "600",
          central_tax: "300",
          state_tax: "300",
          cess: "0",
          invoice_value: "6200",
        },
      ],
    },
  ]);
}, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleTableChange = (tableName, rowIndex, colName, value) => {
    setFormData((prev) => {
      const updatedTable = [...prev[tableName]];
      updatedTable[rowIndex] = {
        ...updatedTable[rowIndex],
        [colName]: value,
      };
      return { ...prev, [tableName]: updatedTable };
    });
  };

  const addTableRow = (tableName, newRow) => {
    setFormData((prev) => ({
      ...prev,
      [tableName]: [...(prev[tableName] || []), newRow],
    }));
  };

  const removeTableRow = (tableName, rowIndex) => {
    setFormData((prev) => {
      const updatedTable = [...prev[tableName]];
      if (updatedTable.length <= 1) {
        toast.warn("At least one row is required", {
          position: "top-right",
          autoClose: 3000,
        });
        return prev;
      }
      updatedTable.splice(rowIndex, 1);
      return { ...prev, [tableName]: updatedTable };
    });
  };

  const onAction = (type) => {
    if (type === "cancel") {
      setFormData(generateInitialValues(forms[selectedForm]));
      setIsEditing(false);
      setEditIndex(null);
      setUpdateLabel("Submit");
      setCancelLabel("Cancel");
      return;
    }

    const errors = validateFields(forms[selectedForm], formData);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    if (type === "save") {
      if (isEditing && editIndex !== null) {
  const updated = [...listData];
  updated[editIndex] = {
    ...formData,
    items: formData.tables || [], // ✅ update items too
  };
  setListData(updated);
  toast.success("Record updated");
}
else {
        setListData((prev) => [
  ...prev,
  {
    ...formData,
    items: formData.tables || [], // ✅ Add this line to fix the modal!
  },
]);

        toast.success("Record added");
      }
      setFormData(generateInitialValues(forms[selectedForm]));
      setIsEditing(false);
      setEditIndex(null);
      setUpdateLabel("Submit");
      setCancelLabel("Cancel");
    }

    if (type === "submit") {
      console.log("Submitting form data:", formData);
      handleSubmit(formData, {
        setSubmitting: () => {},
        resetForm: () =>
          setFormData(generateInitialValues(forms[selectedForm])),
      });
    }
  };

  const handleEditRow = (rowIndex) => {
    setUpdateLabel("Update");
    setCancelLabel("Cancel");
    const row = listData[rowIndex];
    setFormData({ ...row });
    setIsEditing(true);
    setEditIndex(rowIndex);
    setActiveTabForm("form");
  };

  const handleDeleteRow = (rowIndex) => {
    const updated = [...listData];
    updated.splice(rowIndex, 1);
    setListData(updated);
    toast.success("Record deleted");
  };

const listColumns = [
  ...forms[selectedForm]
    .filter((field) => field.name !== "tables" && field.name !== "items")
    .map((field) => ({
      header: field.label,
      accessor: field.name,
    })),
{
  header: "Actions",
  Cell: ({ row }) => {
    const rowIndex = listData.indexOf(row);
    return (
      <div className="d-flex align-items-center gap-2">
        <TableActionButton
          icon={FaPencilAlt}
          type="edit"
          title="Edit"
          onClick={() => handleEditRow(rowIndex)}
        />
        <TableActionButton
          icon={FaTrash}
          type="delete"
          title="Delete"
          onClick={() => handleDeleteRow(rowIndex)}
        />
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => openDetailModal(row)}
        >
          👁️
        </button>
      </div>
    );
  },
}


];


  return (

    
    <div className="form-container">
      <TabSwitcher
        tabs={formstab}
        activeKey={activeTabForm}
        onTabChange={setActiveTabForm}
      />

      {activeTabForm === "form" ? (
        <form>
          <div className="row">
            {forms[selectedForm].map((field, index) => {
             if (field.type === "table") return null;

              return (
                <div
                  key={index}
                  className={`${
                    field.type === "table" ? "col-12" : "col-md-6 col-lg-4"
                  } mb-3`}
                >
                  {field.type === "checkbox" ? (
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={field.name}
                        name={field.name}
                        checked={formData[field.name] || false}
                        onChange={onChange}
                      />
                      <label className="form-check-label" htmlFor={field.name}>
                        {field.label}
                      </label>
                      {formErrors[field.name] && (
                        <div className="error-text">
                          {formErrors[field.name]}
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <label htmlFor={field.name}>{field.label}</label>
                      {field.type === "select" ? (
                        <select
                          name={field.name}
                          className="form-select"
                          value={formData[field.name] || ""}
                          onChange={onChange}
                          required={field.required}
                        >
                          <option value="">Select</option>
                          {field.options?.map((opt, i) => (
                            <option key={i} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : (
                       <input
  type={field.type}
  name={field.name}
  className="form-control"
  placeholder={field.placeholder}
  value={formData[field.name] || ""}
  onChange={onChange}
  disabled={field.disabled || false}  // <-- Add this line
/>

                      )}
                      {formErrors[field.name] && (
                        <div className="error-text">
                          {formErrors[field.name]}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}

            <div className="col-12 mb-3">
              <ReusableFormInputTable
                rows={formData["tables"] || []}
                onChangeRow={handleTableChange}
                onAddRow={addTableRow}
                onRemoveRow={removeTableRow}
              />
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

          <ToastContainer />
        </form>
      ) :(
  <div>
    <Datatable 
      data={listData}
      columns={listColumns}
    />

    {selectedDetailRow?.items && Array.isArray(selectedDetailRow.items) && (
  <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Item Details</h5>
          <button type="button" className="btn-close" onClick={closeDetailModal}></button>
        </div>
        <div className="modal-body table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Rate (%)</th>
                <th>Taxable Value (₹)</th>
                <th>Integrated Tax (₹)</th>
                <th>Central Tax (₹)</th>
                <th>State Tax (₹)</th>
                <th>Cess (₹)</th>
                <th>Invoice Value (₹)</th>
              </tr>
            </thead>
            <tbody>
              {selectedDetailRow.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.rate}%</td>
                  <td>₹{item.taxable_value}</td>
                  <td>₹{item.integrated_tax}</td>
                  <td>₹{item.central_tax}</td>
                  <td>₹{item.state_tax}</td>
                  <td>₹{item.cess}</td>
                  <td>₹{item.invoice_value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={closeDetailModal}>Close</button>
        </div>
      </div>
    </div>
  </div>
)}

  </div>
)}
    </div>
  );
};

export default B2CS;
