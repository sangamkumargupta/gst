import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ import
import "../../assets/css/ClientTable.css";
import PageHeader from "../../components/PageHeader";
// import ToggleSelect from "../../components/DropdownToggle";
import clients from "../../GstCustomers/gstCustomer.json";

const StatusBadge = ({ value }) => {
  if (value === "FILED") return <span className="badge badge-filed">FILED</span>;
  if (value === "NOT FILED") return <span className="badge badge-not-filed">NOT FILED</span>;
  return <span className="badge badge-empty">-</span>;
};

const ClientTable = () => {
  const navigate = useNavigate(); // ✅ hook

  const handleRowClick = (client) => {
   navigate(`/return/regular/${client.id}`, { state: { client } }); 
  };

  return (
    <>
      <PageHeader title="Regular" parentTitle="Return" parentLink="/dashboard/home"  />

      <div className="table-container">
        <table className="client-table">
          <thead>
            <tr>
              <th rowSpan="2">ID</th>
              <th rowSpan="2">NAME</th>
              <th rowSpan="2">GSTIN</th>
              <th rowSpan="2">REGISTRATION DATE</th>
              <th colSpan="4" className="text-center">STATUS</th>
            </tr>
            <tr>
              <th>GSTR-1</th>
              <th>GSTR-3B</th>
              <th>GSTR-2A</th>
              <th>GSTR-2B</th>
            </tr>
          </thead>
          <tbody>
            {clients
              .filter((client) => client.type === "REGULAR")
              .map((client, index) => (
                <tr key={index} onClick={() => handleRowClick(client)} style={{ cursor: "pointer" }}>
                  <td>{client.id}</td>
                  <td>
                    <div className="client-name">{client.name}</div>
                    <div className="client-subname">{client.subname}</div>
                  </td>
                  <td>
                    <div>{client.gstin}</div>
                    <div className="client-type">{client.type}</div>
                  </td>
                  <td>{client.date || "-"}</td>
                  {client.status.slice(0, 4).map((status, i) => (
                    <td key={i}><StatusBadge value={status} /></td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ClientTable;
