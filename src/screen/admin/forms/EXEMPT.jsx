import React, { useState, useEffect } from "react";
import Button from "../../../components/Button";
import { forms } from "../../../forms/formConfig";
import "../../../assets/css/formcss.css";
import { toast, ToastContainer } from "react-toastify";
import TabSwitcher from "../../../components/TabSwitcher";
import Datatable from "../../../components/DataTable";

import { generateInitialValues } from "../../../utils/formUtils";

const formstab = [
  { label: "Form", key: "form" },
  { label: "List", key: "list" },
];

// Default record from JSON (can be replaced with API data)
const defaultRecord = {
  id: 1,
  tableData: [
    {
      description: "Intra-state supplies to registered person",
      nil_rated_supplies: "31231",
      exempted_supplies: "123",
      non_gst_supplies: "1.00",
    },
    {
      description: "Intra-state supplies to unregistered person",
      nil_rated_supplies: "213",
      exempted_supplies: "123",
      non_gst_supplies: "4.00",
    },
    {
      description: "Inter-state supplies to registered person",
      nil_rated_supplies: "6.00",
      exempted_supplies: "8.00",
      non_gst_supplies: "9.00",
    },
    {
      description: "Inter-state supplies to unregistered person",
      nil_rated_supplies: "312",
      exempted_supplies: "123",
      non_gst_supplies: "1231230",
    },
  ],
};

const EXEMPT = () => {
  const [selectedForm] = useState("EXEMPT");
  const [formData, setFormData] = useState({});
  const [activeTabForm, setActiveTabForm] = useState("form");
  const [updateLabel] = useState("Submit");
  const [cancelLabel] = useState("Cancel");

  const [listData, setListData] = useState([defaultRecord]); // Load JSON record by default

  const parentConfig = forms[selectedForm]?.[0];
  const tableConfig = parentConfig?.tables?.[0];

  useEffect(() => {
    const initial = generateInitialValues(forms[selectedForm]);

    if (tableConfig) {
      initial["tables"] = tableConfig.rows.map((rowLabel) => {
        const rowData = { description: rowLabel };
        tableConfig.columns.forEach((col) => {
          if (col.name !== "description") {
            rowData[col.name] = ""; // Start empty in the form
          }
        });
        return rowData;
      });
    }

    setFormData(initial);
  }, [selectedForm, tableConfig]);

  const handleTableChange = (rowIndex, colName, value) => {
    setFormData((prev) => {
      const updatedTable = [...prev.tables];
      updatedTable[rowIndex][colName] = value;
      return { ...prev, tables: updatedTable };
    });
  };

  const handleSave = () => {
    if (!formData.tables) return;

    const newRecord = {
      id: 1, // Keep it as one record always
      tableData: [...formData.tables],
    };

    setListData([newRecord]); // Replace default record
    toast.success("Saved successfully!");
    setActiveTabForm("list");
  };

  const listColumns = [
    { header: "Record ID", accessor: "id" },
    {
      header: "Details",
      Cell: ({ row }) => {
        const tableData = row.tableData || [];
        return (
          <table className="table table-bordered table-sm">
            <thead>
              <tr>
                <th>Description</th>
                <th>Nil Rated Supplies (₹)</th>
                <th>Exempted (₹)</th>
                <th>Non-GST Supplies (₹)</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((r, idx) => (
                <tr key={idx}>
                  <td>{r.description}</td>
                  <td>{r.nil_rated_supplies || "0.00"}</td>
                  <td>{r.exempted_supplies || "0.00"}</td>
                  <td>{r.non_gst_supplies || "0.00"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      },
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
              <h4>{tableConfig?.label }</h4>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    {tableConfig?.columns.map((col) => (
                      <th key={col.name}>{col.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {formData.tables?.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {tableConfig.columns.map((col) => (
                        <td key={col.name}>
                          {col.name === "description" ? (
                            row.description
                          ) : (
                            <input
                              type="number"
                              className="form-control"
                              step="0.01"
                              placeholder="0.00"
                              value={row[col.name] ?? ""}
                              onBlur={(e) => {
                                const newValue = e.target.value.trim();
                                handleTableChange(
                                  rowIndex,
                                  col.name,
                                  newValue === "" ? "0.00" : newValue
                                );
                              }}
                              onChange={(e) =>
                                handleTableChange(rowIndex, col.name, e.target.value)
                              }
                            />
                          )}
                        </td>
                      ))}
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
              onClick={handleSave}
            />
            <Button
              label={cancelLabel}
              type="button"
              variant="danger"
              onClick={() => toast.info("Cancelled")}
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

export default EXEMPT;