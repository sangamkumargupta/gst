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

const DOCS = () => {
  const [selectedForm] = useState("DOCS");
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [activeTabForm, setActiveTabForm] = useState("form");
  const [updateLabel, setUpdateLabel] = useState("Submit");
  const [cancelLabel, setCancelLabel] = useState("Cancel");

  const [listData, setListData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const docConfig = forms[selectedForm].find(
    (field) => field.name === "tables"
  );
  const documentTypes = docConfig?.documentTypes || [];

  useEffect(() => {
    const initial = generateInitialValues(forms[selectedForm]);
    initial["tables"] = initial["tables"]?.length
      ? initial["tables"]
      : documentTypes.map((type) => ({
          particular: type,
          sr_no_from: "",
          sr_no_to: "",
          total_number: "",
          cancelled: "",
          net_issued: "",
        }));
    setFormData(initial);
    setFormErrors({});
  }, [selectedForm, documentTypes]);

  useEffect(() => {
    setListData([
      {
        particular: "Invoices for outward supply",
        sr_no_from: "1001",
        sr_no_to: "1050",
        total_number: "50",
        cancelled: "2",
        net_issued: "48",
      },
      {
        particular: "Revised Invoice",
        sr_no_from: "2001",
        sr_no_to: "2010",
        total_number: "10",
        cancelled: "0",
        net_issued: "10",
      },
    ]);
  }, []);

  const handleTableChange = (tableName, rowIndex, colName, value) => {
    setFormData((prev) => {
      const updatedTable = [...prev[tableName]];
      updatedTable[rowIndex] = {
        ...updatedTable[rowIndex],
        [colName]: value,
      };

      if (colName === "total_number" || colName === "cancelled") {
        const total = updatedTable[rowIndex].total_number
          ? parseInt(updatedTable[rowIndex].total_number)
          : 0;
        const cancelled = updatedTable[rowIndex].cancelled
          ? parseInt(updatedTable[rowIndex].cancelled)
          : 0;
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
        total_number: "",
        cancelled: "",
        net_issued: "",
      }));
      setFormData(initial);
    }
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
    <div className="form-container">
      <TabSwitcher
        tabs={formstab}
        activeKey={activeTabForm}
        onTabChange={setActiveTabForm}
      />

      {activeTabForm === "form" ? (
        <form>
          <div className="row">
            <div className="col-12 mb-3">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th rowSpan="2">Sr. No.</th>
                    <th rowSpan="2">Particular</th>
                    <th colSpan="2">Sr. No.</th>
                    <th rowSpan="2">Total Number</th>
                    <th rowSpan="2">Cancelled</th>
                    <th rowSpan="2">Net Issued</th>
                  </tr>
                  <tr>
                    <th>From</th>
                    <th>To</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.tables?.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {/* Particular Field */}
                      <td>{rowIndex +1}</td>
                      <td>{row.particular}</td>

                      {/* SR No From */}
                      <td>
                        <input
                          type="number"
                          min="0"
                          className="form-control"
                          value={row.sr_no_from || ""}
                          name={`tables[${rowIndex}].sr_no_from`}
                          onInput={(e) => {
                            e.target.value = e.target.value.replace(/\D/g, "");
                          }}
                          onChange={(e) =>
                            handleTableChange(
                              "tables",
                              rowIndex,
                              "sr_no_from",
                              e.target.value
                            )
                          }
                        />
                      </td>

                      {/* SR No To */}
                      <td>
                        <input
                          type="number"
                          min="0"
                          className="form-control"
                          value={row.sr_no_to || ""}
                          name={`tables[${rowIndex}].sr_no_to`}
                          onInput={(e) => {
                            e.target.value = e.target.value.replace(/\D/g, "");
                          }}
                          onChange={(e) =>
                            handleTableChange(
                              "tables",
                              rowIndex,
                              "sr_no_to",
                              e.target.value
                            )
                          }
                        />
                      </td>

                      {/* Total Number */}
                      <td>
                        <input
                          type="number"
                          min="0"
                          className="form-control"
                          value={row.total_number || ""}
                          name={`tables[${rowIndex}].total_number`}
                          onInput={(e) => {
                            e.target.value = e.target.value.replace(/\D/g, "");
                          }}
                          onChange={(e) =>
                            handleTableChange(
                              "tables",
                              rowIndex,
                              "total_number",
                              e.target.value
                            )
                          }
                        />
                      </td>

                      {/* Cancelled */}
                      <td>
                        <input
                          type="number"
                          min="0"
                          className="form-control"
                          value={row.cancelled || ""}
                          name={`tables[${rowIndex}].cancelled`}
                          onInput={(e) => {
                            e.target.value = e.target.value.replace(/\D/g, "");
                          }}
                          onChange={(e) =>
                            handleTableChange(
                              "tables",
                              rowIndex,
                              "cancelled",
                              e.target.value
                            )
                          }
                        />
                      </td>

                      {/* Net Issued (Read-Only) */}
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={row.net_issued || ""}
                          name={`tables[${rowIndex}].net_issued`}
                          readOnly
                        />
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

export default DOCS;
