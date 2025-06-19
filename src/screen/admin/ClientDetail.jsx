import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import clients from "../../GstCustomers/gstCustomer.json";
import "../../assets/css/ClientDetails.css";
import PageHeader from "../../components/PageHeader";
import ToggleSelect from "../../components/DropdownToggle";
import Tabs from "../../components/Tabs";


const yearOptions = ["2022-2023", "2023-2024", "2024-2025"];
const frequencyOptions = ["MONTHLY", "QUARTERLY"];
const monthOptions = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
];
const companyOptions = clients.map((client) => client.name);
const tabs = ["GSTR 1", "GSTR 3B", "GSTR 2A", "GSTR 2B","GSTR 4A"];

const ClientDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const client = location.state?.client;

  const [activeTab, setActiveTab] = useState("GSTR 1");
  const [selectedCompany, setSelectedCompany] = useState("");

  const [filters, setFilters] = useState({
    returnType: "REGULAR",
    year: "2023-2024",
    frequency: "MONTHLY",
    month: "NOVEMBER",
    company: "", // will be set below
  });

  // ✅ Initialize the company value from `client.subname`
  useEffect(() => {
    if (client && !filters.company) {
      setFilters((prev) => ({ ...prev, company: client.subname }));
      setSelectedCompany(client.subname);
    }
  }, [client]);

  const handleFilterChange = (field, value) => {
    if (field === "company") {
      setSelectedCompany(value);
    }
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  if (!client) {
    return (
      <div className="text-center p-4">
        <h4>No client data available.</h4>
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
          ← Back to List
        </button>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="Regular"
        parentTitle="Return"
        parentLink="/dashboard/home"
        gstClint={selectedCompany || client.subname}
      />

      <div className="client-detail">
        <div className="card p-4 shadow-sm">
          {/* Filters */}
          <div className="details-dropdown d-flex flex-wrap justify-content-center mb-3">
            <ToggleSelect
              label="Year"
              options={yearOptions}
              value={filters.year}
              onChange={(val) => handleFilterChange("year", val)}
            />
            <ToggleSelect
              label="Frequency"
              options={frequencyOptions}
              value={filters.frequency}
              onChange={(val) => handleFilterChange("frequency", val)}
            />
            <ToggleSelect
              label="Month"
              options={monthOptions}
              value={filters.month}
              onChange={(val) => handleFilterChange("month", val)}
            />
            <ToggleSelect
              label="Company"
              options={companyOptions}
              value={filters.company}
              onChange={(val) => handleFilterChange("company", val)}
            />
          </div>

          {/* Tabs */}
          <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Client Info Table */}
          <div className="table-responsive mt-4">
            <table className="table table-bordered table-striped text-center client-info-horizontal">
              <thead className="table-light">
                <tr>
                  <th>Client Name</th>
                  <th>Subname</th>
                  <th>GSTIN</th>
                  <th>Type</th>
                  <th>Registration Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{client.name}</td>
                  <td>{client.subname}</td>
                  <td>{client.gstin}</td>
                  <td>{client.type}</td>
                  <td>{client.date || "-"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Status Table */}
          {client.status && client.status.length > 0 && (
            <div className="table-responsive mt-4">
              <h5>Status</h5>
              <table className="table table-bordered table-striped text-center">
                <thead className="table-light">
                  <tr>
                    {client.status.map((_, i) => (
                      <th key={i}>#{i + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {client.status.map((s, i) => (
                      <td key={i}>{s}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ClientDetail;
