import React, { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaPencilAlt,
  FaTrash,
  FaSignInAlt,
  FaSave,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import Datatable from "../../components/DataTable.jsx";
import TableActionButton from "../../components/TableActionButton.jsx";
import PageHeader from "../../components/PageHeader.jsx";
import swal from "sweetalert";

const initialData = [
  {
    name: "AABHAA AYURVEDA CARE PRIVATE LIMITED",
    shortName: "AABHAA AYURVEDA CARE PRIVATE LIMITED",
    gstin: "08AAUCA1798A1ZF",
    gstType: "REGULAR",
    pan: "AAUCA1798A",
    panType: "Private Limited Company",
    username: "AABHAA2020",
    password: "sangam",
  },
  {
    name: "ATYANI TECHNOLOGIES LIMITED",
    shortName: "ATYANI TECHNOLOGIES LIMITED",
    gstin: "08AAVCA9296N1ZE",
    gstType: "REGULAR",
    pan: "AAVCA9296N",
    panType: "Public Limited Company",
    username: "ATYANITECH2021",
    password: "sangam",
  },
  {
    name: "BHAVYARSH INDIA LIMITED",
    shortName: "BHAVYARSH INDIA LIMITED",
    gstin: "08AAJCB0243L1ZO",
    gstType: "REGULAR",
    pan: "AAJCB0243L",
    panType: "Public Limited Company",
    username: "BHAVYARSH2020",
    password: "sangam",
  },
];

const MyClients = () => {
  const [data, setData] = useState(initialData);
  const [visiblePasswordIndex, setVisiblePasswordIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editRow, setEditRow] = useState({});

  const togglePasswordVisibility = (index) => {
    setVisiblePasswordIndex(visiblePasswordIndex === index ? null : index);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditRow({ ...data[index] });
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditRow({});
  };

  const handleSave = () => {
    const updatedData = [...data];
    updatedData[editingIndex] = editRow;
    setData(updatedData);
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this client!",
    icon: "warning",
    buttons: ["Cancel", "Delete"],
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      const updatedData = data.filter((_, i) => i !== index);
      setData(updatedData);

      swal("Client has been deleted!", {
        icon: "success",
        timer: 1500,
        buttons: false,
      });
    }
  });
};


  const handleInputChange = (field, value) => {
    setEditRow({ ...editRow, [field]: value });
  };

  const columns = [
    {
      header: "Name",
      accessor: "name",
      Cell: ({ row, rowIndex }) =>
        editingIndex === rowIndex ? (
          <input
            value={editRow.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        ) : (
          row.name
        ),
    },
    {
      header: "GSTIN",
      accessor: "gstin",
      Cell: ({ row, rowIndex }) =>
        editingIndex === rowIndex ? (
          <input
            value={editRow.gstin}
            onChange={(e) => handleInputChange("gstin", e.target.value)}
          />
        ) : (
          row.gstin
        ),
    },
    {
      header: "GST Type",
      accessor: "gstType",
      Cell: ({ row, rowIndex }) =>
        editingIndex === rowIndex ? (
          <input
            value={editRow.gstType}
            onChange={(e) => handleInputChange("gstType", e.target.value)}
          />
        ) : (
          row.gstType
        ),
    },
    {
      header: "PAN",
      accessor: "pan",
      Cell: ({ row, rowIndex }) =>
        editingIndex === rowIndex ? (
          <input
            value={editRow.pan}
            onChange={(e) => handleInputChange("pan", e.target.value)}
          />
        ) : (
          row.pan
        ),
    },
    {
      header: "PAN Type",
      accessor: "panType",
      Cell: ({ row, rowIndex }) =>
        editingIndex === rowIndex ? (
          <input
            value={editRow.panType}
            onChange={(e) => handleInputChange("panType", e.target.value)}
          />
        ) : (
          row.panType
        ),
    },
    {
      header: "Username",
      accessor: "username",
      Cell: ({ row, rowIndex }) =>
        editingIndex === rowIndex ? (
          <input
            value={editRow.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
          />
        ) : (
          row.username
        ),
    },
    {
      header: "Password",
      accessor: "password",
      Cell: ({ row, rowIndex }) =>
        editingIndex === rowIndex ? (
          <input
            type="text"
            value={editRow.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
        ) : (
          <div className="d-flex align-items-center gap-2">
            {visiblePasswordIndex === rowIndex ? (
              <>
                <span>{row.password}</span>
                <FaEyeSlash
                  style={{ cursor: "pointer" }}
                  onClick={() => togglePasswordVisibility(rowIndex)}
                />
              </>
            ) : (
              <>
                <span>******</span>
                <FaEye
                  style={{ cursor: "pointer" }}
                  onClick={() => togglePasswordVisibility(rowIndex)}
                />
              </>
            )}
          </div>
        ),
    },
    {
      header: "Actions",
      accessor: "actions",
      Cell: ({ row, rowIndex }) =>
        editingIndex === rowIndex ? (
          <div className="d-flex align-items-center gap-2">
            <TableActionButton
              icon={FaCheck}
              type="save"
              title="Save"
              onClick={handleSave}
            />
            <TableActionButton
              icon={FaTimes}
              type="cancel"
              title="Cancel"
              onClick={handleCancelEdit}
            />
          </div>
        ) : (
          <div className="d-flex align-items-center gap-2">
            <TableActionButton
              icon={FaPencilAlt}
              type="edit"
              title="Edit"
              onClick={() => handleEdit(rowIndex)}
            />
            <TableActionButton
              icon={FaTrash}
              type="delete"
              title="Delete"
              onClick={() => handleDelete(rowIndex)}
            />
            <TableActionButton
              icon={FaSignInAlt}
              type="login"
              title="Login"
              onClick={() => console.log("Login", row)}
            />
          </div>
        ),
    },
  ];

  return (
    <div className="p-4">
      <PageHeader
        title="My Clients"
        parentTitle="Dashboards"
        parentLink="/dashboard/home"
      />
      <div className="my-clients-page">
        <Datatable data={data} columns={columns} />
      </div>
    </div>
  );
};

export default MyClients;