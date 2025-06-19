import React, { useState } from "react"; 
import {
  FaEye,
  FaEyeSlash,
  FaPencilAlt,
  FaTrash,
  FaSignInAlt,
  FaSearch,
  FaSave  ,
} from "react-icons/fa";
import Datatable from "../../components/DataTable.jsx";
import TableActionButton from "../../components/TableActionButton.jsx";
import PageHeader from "../../components/PageHeader.jsx";


const myClientsData = [
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
  const [visiblePasswordIndex, setVisiblePasswordIndex] = useState(null);

  const togglePasswordVisibility = (index) => {
    setVisiblePasswordIndex(visiblePasswordIndex === index ? null : index);
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "GSTIN", accessor: "gstin" },
    { header: "GST Type", accessor: "gstType" },
    { header: "PAN", accessor: "pan" },
    { header: "PAN Type", accessor: "panType" },
    { header: "Username", accessor: "username" },
    {
      header: "Password",
      accessor: "password",
      Cell: ({ row, rowIndex }) => (
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
              <FaSave
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
      Cell: ({ row }) => (
        <div className="d-flex align-items-center gap-2">
          <TableActionButton
            icon={FaPencilAlt}
            type="edit"
            title="Edit"
            onClick={() => console.log("Edit", row)}
          />

          <TableActionButton
            icon={FaTrash}
            type="delete"
            title="Delete"
            onClick={() => console.log("Delete", row)}
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
    <>
      <PageHeader
        title="My Clients"
        parentTitle="Dashboards"
        parentLink="/dashboard/home"
      />
      <div className="my-clients-page">
        <Datatable data={myClientsData} columns={columns} />
      </div>
    </>
  );
};

export default MyClients;
