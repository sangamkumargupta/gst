import React, { useState, useEffect } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import Button from "../../../../components/Button";
import { forms } from "../../../../forms/formConfig";
import "../../../../assets/css/formcss.css";
import { toast, ToastContainer } from "react-toastify";
import ReusableFormInputTable from "../../../../components/ReusableFormInputTable";
import TabSwitcher from "../../../../components/TabSwitcher";
import Datatable from "../../../../components/DataTable";
import TableActionButton from "../../../../components/TableActionButton.jsx";
import { generateInitialValues } from "../../../../utils/formUtils";

const formstab = [
  { label: "Form", key: "form" },
  { label: "List", key: "list" },
];

const formatNumber = (value) => {
  const num = parseInt(value?.toString().replace(/,/g, ""), 10);
  return isNaN(num) ? "" : num.toLocaleString("en-IN");
};

const GSTR9_14 = () => {
  const [selectedForm] = useState("FOURTEEN");
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [activeTabForm, setActiveTabForm] = useState("form");
  const [updateLabel, setUpdateLabel] = useState("Submit");
  const [cancelLabel, setCancelLabel] = useState("Cancel");

  const [listData, setListData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const docConfig = forms[selectedForm].find((field) => field.name === "tables");
  const documentTypes = docConfig?.documentTypes || [];

  // Initial form values setup
  useEffect(() => {
    const initial = generateInitialValues(forms[selectedForm]);
    initial["tables"] = initial["tables"]?.length
      ? initial["tables"]
      : documentTypes.map((type) => ({
          particular: type,
          sr_no_from: "",
          sr_no_to: "",
        }));
    setFormData(initial);
    setFormErrors({});
  }, [selectedForm, documentTypes]);

  // Simulated List data
 

  const handleTableChange = (tableName, rowIndex, colName, value) => {
    setFormData((prev) => {
      const updatedTable = [...prev[tableName]];
      updatedTable[rowIndex] = {
        ...updatedTable[rowIndex],
        [colName]: value,
      };

      if (colName === "total_number" || colName === "cancelled") {
        const total = parseInt(updatedTable[rowIndex].total_number || 0);
        const cancelled = parseInt(updatedTable[rowIndex].cancelled || 0);
        updatedTable[rowIndex].net_issued = (total - cancelled).toString();
      }

      return { ...prev, [tableName]: updatedTable };
    });
  };

  const onAction = (type) => {
    if (type === "save") {
      console.log("Form Data:", formData);
      toast.success("Form saved (check console for data)");
    } else if (type === "cancel") {
      toast.info("Form cancelled");
      const initial = generateInitialValues(forms[selectedForm]);
      initial["tables"] = documentTypes.map((type) => ({
        particular: type,
        sr_no_from: "",
        sr_no_to: "",
      }));
      setFormData(initial);
    }
  };

  const handleEditRow = (index) => {
    toast.info(`Edit clicked on row ${index + 1}`);
  };

  const handleDeleteRow = (index) => {
    toast.warn(`Delete clicked on row ${index + 1}`);
  };

  const listColumns = [
    {
      header: "Particular",
      accessor: "particular",
    },
    {
      header: "Sr. No.",
      Cell: ({ row }) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>From: {row.sr_no_from}</span>
          <span>To: {row.sr_no_to}</span>
        </div>
      ),
    },
    {
      header: "Total Number",
      accessor: "total_number",
    },
    {
      header: "Cancelled",
      accessor: "cancelled",
    },
    {
      header: "Net Issued",
      accessor: "net_issued",
    },
    {
      header: "Action",
      Cell: ({ rowIndex }) => (
        <>
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
        </>
      ),
    },
  ];

  return (
    <div>
    
        <form>
          <div className="row">
            <div className="col-12 mb-3 table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Nature of supplies</th>
                    <th>Taxable value (₹)</th>
                    <th>Integrated Tax (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.tables?.map((row, rowIndex) => {
                    const isSubtotalRow =
                      row.particular === "(A) Supply received from composition taxpayers";

                    return (
                      <tr
                        key={rowIndex}
                        style={
                          isSubtotalRow ? { backgroundColor: "#e9ecef" } : {}
                        }
                      >
                        <td style={{ textAlign: "left" }}>{row.particular}</td>

                        {/* sr_no_from */}
                        <td>
                          <input
                            type="text"
                            inputMode="numeric"
                            className="form-control"
                             disabled= {row.particular === "Central Tax" || row.particular === "State/UT Tax" || row.particular === "Integrated Tax" || row.particular === "Cess" }
                            value={formatNumber(row.sr_no_from)}
                            placeholder="₹ 0.00"
                            onChange={(e) => {
                              const raw = e.target.value.replace(/,/g, "").replace(/\D/g, "");
                              handleTableChange("tables", rowIndex, "sr_no_from", raw);
                            }}

                          />
                        </td>

                        {/* sr_no_to */}
                       
                          <td>
                            <input
                              type="text"
                              inputMode="numeric"
                              className="form-control"
                              value={formatNumber(row.sr_no_to)}
                              placeholder="₹ 0.00"
                              onChange={(e) => {
                                const raw = e.target.value.replace(/,/g, "").replace(/\D/g, "");
                                handleTableChange("tables", rowIndex, "sr_no_to", raw);
                              }}
                            />
                          </td> 
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
    </div>
  );
};

export default GSTR9_14;
