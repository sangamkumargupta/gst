import React from "react";
import { FaSignInAlt } from "react-icons/fa";
import "../../assets/css/ClientTable.css";
import PageHeader from "../../components/pageHeader";

import ToggleSelect from "../../components/DropdownToggle";

const clients = [
  {
    name: "AABHAA AYURVEDA CARE PRIVATE LIMITED",
    subname: "AABHAA AYURVEDA CARE PRIVATE LIMITED",
    gstin: "08AAUCA1798A1ZF",
    type: "REGULAR",
    date: "",
    status: ["FILED", "FILED", "-"],
  },
  {
    name: "ATYAN TECHNOLOGIES LIMITED",
    subname: "ATYAN TECHNOLOGIES LIMITED",
    gstin: "08AAVCA9296N1ZE",
    type: "REGULAR",
    date: "",
    status: ["FILED", "FILED", "-"],
  },
  {
    name: "KRISHNA MATCHING CENTRE",
    subname: "DEVKISHAN SHARMA",
    gstin: "08ACBPS6587M1ZT",
    type: "COMPOSITION",
    date: "01/07/2017",
    status: ["-", "-", "-"],
  },
  {
    name: "K.K. SALES & SERVICES",
    subname: "RAVINDRA JAISWAL",
    gstin: "14AHJPJ0345E1ZY",
    type: "REGULAR",
    date: "02/07/2017",
    status: ["FILED", "FILED", "-"],
  },
];

const StatusBadge = ({ value }) => {
  if (value === "FILED")
    return <span className="badge badge-filed">FILED</span>;
  if (value === "NOT FILED")
    return <span className="badge badge-not-filed">NOT FILED</span>;
  return <span className="badge badge-empty">-</span>;
};

const ClientTable = () => {
  return (
    <>
      <PageHeader
        title="Regular"
        parentTitle="Return"
        parentLink="/dashboard/home"
      />
      
      <div className="table-container">
        
        <table className="client-table">
          <thead>
            <tr>
              <th rowSpan="2">NAME</th>
              <th rowSpan="2">GSTIN</th>
              <th rowSpan="2">REGISTRATION DATE</th>
              <th colSpan="2" className="text-center">STATUS</th> {/* updated from 3 to 2 */}
            </tr>
            <tr>
              <th>GSTR-1</th>
              <th>GSTR-3B</th>
              {/* CMP-08 column removed */}
            </tr>
          </thead>

          <tbody>
            {clients.map((client, index) => (
              <tr key={index}>
                <td>
                  <div className="client-name">{client.name}</div>
                  <div className="client-subname">{client.subname}</div>
                </td>
                <td>
                  <div>{client.gstin}</div>
                  <div className="client-type">{client.type }</div>
                </td>
                <td>{client.date || "-"}</td>
               {client.type !== 'CMP-08' &&
                  client.status.slice(0, 2).map((s, i) => (
                    <td key={i}>
                      <StatusBadge value={s} />
                    </td>
                ))}

                {/* <td >
                  <FaSignInAlt  className="login-icon"/>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ClientTable;
