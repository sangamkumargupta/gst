import React, { useState, useEffect } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import Button from "../../../components/Button";
import { forms } from "../../../forms/formConfig";
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

const ATADJA = () => {
  const [selectedForm] = useState("ATADJA");
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [activeTabForm, setActiveTabForm] = useState("form");
  const [updateLabel, setUpdateLabel] = useState("Submit");
  const [cancelLabel, setCancelLabel] = useState("Cancel");

  const [listData, setListData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const initial = generateInitialValues(forms[selectedForm]);

    if (!initial["tables"] || initial["tables"].length === 0) {
      initial["tables"] = [
        {
          rate: "",
          taxable_value: "",
          integrated_tax: "",
          central_tax: "",
          state_tax: "",
          cess: "",
        },
      ];
    }

    setFormData(initial);
    setFormErrors({});
  }, [selectedForm]);

  useEffect(() => {
    setListData([
      {
        financial_year: "2024-2025",
        original_month: "July",
        original_place_of_supply: "27-Maharashtra",
        applicable_tax_percentage: "18",
        rate: "18.00",
        gross_advance_adjusted: "120000",
        cess_amount: "500",
      },
      {
        financial_year: "2024-2025",
        original_month: "June",
        original_place_of_supply: "07-Delhi",
        applicable_tax_percentage: "12",
        rate: "12.00",
        gross_advance_adjusted: "85000",
        cess_amount: "0",
      },
      {
        financial_year: "2023-2024",
        original_month: "March",
        original_place_of_supply: "19-West Bengal",
        applicable_tax_percentage: "5",
        rate: "5.00",
        gross_advance_adjusted: "60000",
        cess_amount: "250",
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
        updated[editIndex] = { ...formData };
        setListData(updated);
        toast.success("Record updated");
      } else {
        setListData((prev) => [...prev, { ...formData }]);
        toast.success("Record added");
      }
      setFormData(generateInitialValues(forms[selectedForm]));
      setIsEditing(false);
      setEditIndex(null);
      setUpdateLabel("Submit");
      setCancelLabel("Cancel");
    }

    if (type === "submit") {
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
      .filter((field) => field.name !== "tables")
      .map((field) => ({
        header: field.label,
        accessor: field.name,
      })),
    {
      header: "Action",
      Cell: ({ rowIndex }) => (
        <>
         <div className="d-flex">
          <TableActionButton
            icon={FaPencilAlt}
            type="edit"
            title="Edit"
            onClick={() => handleEditRow(rowIndex)}
          />&nbsp;
          <TableActionButton
            icon={FaTrash}
            type="delete"
            title="Delete"
            onClick={() => handleDeleteRow(rowIndex)}
          />
         </div>
        </>
      ),
    },
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
              if (field.name === "tables") return null;
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
                pageName={"ATADJA"}
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
      ) : (
        <div className="table-responsive mt-3">
          <Datatable data={listData} columns={listColumns} />
        </div>
      )}
    </div>
  );
};

export default ATADJA;
