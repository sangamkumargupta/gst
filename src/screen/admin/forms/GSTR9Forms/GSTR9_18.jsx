import React, { useState, useEffect } from "react";
import { FaPencilAlt, FaTrash, FaPlus } from "react-icons/fa";
import Button from "../../../../components/Button";
import { forms } from "../../../../forms/formConfig";
import "../../../../assets/css/formcss.css";
import { toast, ToastContainer } from "react-toastify";
import TabSwitcher from "../../../../components/TabSwitcher";
import Datatable from "../../../../components/DataTable";
import TableActionButton from "../../../../components/TableActionButton.jsx";

const formTabs = [
  { label: "Form", key: "form" },
  { label: "List", key: "list" },
];

const hsnTabs = [
  { label: "Goods", key: "goods" },
  { label: "Services", key: "services" },
];

const GSTR9_18 = () => {
  const [activeTabForm, setActiveTabForm] = useState("form");
  const [activeHsnTab, setActiveHsnTab] = useState("goods");
  const [hsnDetails, setHsnDetails] = useState({
    goods: [],
    services: []
  });
  const [currentHsn, setCurrentHsn] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editTab, setEditTab] = useState(null);

  // Sample list data for the "List" tab
  const [listData, setListData] = useState([
    {
      type: "Goods",
      code: "1234",
      description: "Electronics",
      value: "50000"
    },
    {
      type: "Services",
      code: "9987",
      description: "Consulting",
      value: "25000"
    }
  ]);

  const handleAddHsn = () => {
    if (!currentHsn) {
      toast.warn("Please enter HSN/SAC code", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    
    const newDetail = {
      code: currentHsn,
      description: "",
      value: 0
    };

    if (isEditing && editIndex !== null && editTab !== null) {
      // Update existing entry
      const updatedDetails = { ...hsnDetails };
      updatedDetails[editTab][editIndex] = newDetail;
      setHsnDetails(updatedDetails);
      toast.success("Record updated");
    } else {
      // Add new entry
      if (activeHsnTab === "goods") {
        setHsnDetails({
          ...hsnDetails,
          goods: [...hsnDetails.goods, newDetail]
        });
      } else {
        setHsnDetails({
          ...hsnDetails,
          services: [...hsnDetails.services, newDetail]
        });
      }
      toast.success("Record added");
    }

    setCurrentHsn("");
    setIsEditing(false);
    setEditIndex(null);
    setEditTab(null);
  };

  const handleEditRow = (rowIndex) => {
    const row = listData[rowIndex];
    setCurrentHsn(row.code);
    setIsEditing(true);
    setEditIndex(rowIndex);
    setEditTab(row.type.toLowerCase());
    setActiveHsnTab(row.type.toLowerCase());
    setActiveTabForm("form");
  };

  const handleDeleteRow = (rowIndex) => {
    const updated = [...listData];
    updated.splice(rowIndex, 1);
    setListData(updated);
    toast.success("Record deleted");
  };

  const handleCancel = () => {
    setCurrentHsn("");
    setIsEditing(false);
    setEditIndex(null);
    setEditTab(null);
  };

  const handleSave = () => {
    if (isEditing) {
      // Update the list data
      const updated = [...listData];
      const updatedItem = {
        type: activeHsnTab === "goods" ? "Goods" : "Services",
        code: currentHsn,
        description: "",
        value: 0
      };
      updated[editIndex] = updatedItem;
      setListData(updated);
      toast.success("Record updated");
    } else {
      // Add to list data
      const newItem = {
        type: activeHsnTab === "goods" ? "Goods" : "Services",
        code: currentHsn,
        description: "",
        value: 0
      };
      setListData([...listData, newItem]);
      toast.success("Record added");
    }
    
    setCurrentHsn("");
    setIsEditing(false);
    setEditIndex(null);
    setEditTab(null);
  };

  const listColumns = [
    { header: "Type", accessor: "type" },
    { header: "Code", accessor: "code" },
    { header: "Description", accessor: "description" },
    { header: "Value", accessor: "value" },
    {
      header: "Action",
      Cell: ({ rowIndex }) => (
        <div className="d-flex">
          <TableActionButton
            icon={FaPencilAlt}
            type="edit"
            title="Edit"
            onClick={() => handleEditRow(rowIndex)}
          />
          &nbsp;
          <TableActionButton
            icon={FaTrash}
            type="delete"
            title="Delete"
            onClick={() => handleDeleteRow(rowIndex)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="form-container">
     
      
     

      {activeTabForm === "form" ? (
        <div>
          <TabSwitcher
            tabs={hsnTabs}
            activeKey={activeHsnTab}
            onTabChange={setActiveHsnTab}
          />
          
          <div className="hsn-input-section mt-3">
            <p>To add HSN Detail, Enter and select {activeHsnTab === "goods" ? "HSN Name or Code" : "SAC Name or Code"}</p>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                value={currentHsn}
                onChange={(e) => setCurrentHsn(e.target.value)}
                placeholder={`Enter ${activeHsnTab === "goods" ? "HSN" : "SAC"} code`}
              />
             
            </div>
          </div>
          
          <div className="note-section mb-3">
            <p><strong>Note:</strong> Kindly click on save button after any modification (add, edit, delete) to save the changes</p>
          </div>
          
          <div className="form-buttons mt-4">
            <Button
              label={isEditing ? "Update" : "Save"}
              type="button"
              variant="success"
              onClick={handleSave}
            />
            <Button
              label="Cancel"
              type="button"
              variant="danger"
              onClick={handleCancel}
            />
          </div>
        </div>
      ) : (
        <div className="table-responsive mt-3">
          <Datatable data={listData} columns={listColumns} />
        </div>
      )}
      
      <ToastContainer />
    </div>
  );
};

export default GSTR9_18;