import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import ClientRow from "../../components/ClientRow";
import clients from "../../GstCustomers/gstCustomer.json";
import ToggleSelect from "../../components/DropdownToggle";
import Footer from "../../components/Footer";
import "../../assets/css/ClientTable.css";

const tabs = ["GSTR 1", "GSTR 3B"];

const returnTypeOptions = ["REGULAR", "COMPOSITION"];
const yearOptions = ["2022-2023", "2023-2024", "2024-2025"];
const frequencyOptions = ["All", "MONTHLY", "QUARTERLY"];
const quarterOptions = [
  "Q1 (April to June)",
  "Q2 (July to September)",
  "Q3 (October to December)",
  "Q4 (January to March)",
];

const ClientTableRegular = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    returnType: "REGULAR",
    year: "",
    frequency: "All",
    month: "Q1 (April to June)",
  });

  const [isFiltering, setIsFiltering] = useState(false);

  const handleFilterChange = (key, value) => {
    if (key === "returnType") return; // prevent change if disabled
    setIsFiltering(true);
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleResetFilters = () => {
    setIsFiltering(false);
    setFilters({
      returnType: "REGULAR",
      year: "",
      frequency: "All",
      month: "Q1 (April to June)",
    });
  };

  const handleRowClick = useCallback(
    (client) => {
      navigate(`/return/regular/${client.id}`, { state: { client } });
    },
    [navigate]
  );

  const getFinancialYear = (dateString) => {
    const [day, month, year] = dateString.split("/").map(Number);
    const fyStartYear = month < 4 ? year - 1 : year;
    return `${fyStartYear}-${fyStartYear + 1}`;
  };

  const getQuarterFromMonth = (monthIdx) => {
    if (monthIdx >= 0 && monthIdx <= 2) return "Q4 (January to March)";
    if (monthIdx >= 3 && monthIdx <= 5) return "Q1 (April to June)";
    if (monthIdx >= 6 && monthIdx <= 8) return "Q2 (July to September)";
    if (monthIdx >= 9 && monthIdx <= 11) return "Q3 (October to December)";
    return "";
  };

  const filteredClients = clients.filter((client) => {
    if (filters.returnType && client.type !== filters.returnType) return false;

    if (!isFiltering) return true;

    const [day, monthStr, yearStr] = client.date.split("/");
    const monthIndex = parseInt(monthStr, 10) - 1;
    const year = getFinancialYear(client.date);
    const clientQuarter = getQuarterFromMonth(monthIndex);

    return (
      (filters.year === "" || year === filters.year) &&
      (filters.month === "" || filters.month === clientQuarter) &&
      (filters.frequency === "All" || filters.frequency === "MONTHLY")
    );
  });

  return (
    <>
      <div className="p-4">
        <PageHeader
          parentTitle="Return"
          title="Regular"
          parentLink="/dashboard/home"
        />

        <div className="table-container mb-3">
          <div className="d-flex flex-wrap p-4 justify-content-center gap-2">
            <ToggleSelect
              label="Return Type"
              options={returnTypeOptions}
              value={filters.returnType}
              onChange={(val) => handleFilterChange("returnType", val)}
              disabled
            />
            <ToggleSelect
              label="Year"
              options={yearOptions}
              value={filters.year}
              onChange={(val) => handleFilterChange("year", val)}
            />
            <ToggleSelect
              label="All"
              options={frequencyOptions}
              value={filters.frequency}
              onChange={(val) => handleFilterChange("frequency", val)}
            />
            <ToggleSelect
              label="Month"
              options={quarterOptions}
              value={filters.month}
              onChange={(val) => handleFilterChange("month", val)}
            />
          </div>

          {/* <div className="text-center mb-3">
            <button className="btn btn-sm btn-outline-secondary" onClick={handleResetFilters}>
              Reset Filters
            </button>
          </div> */}

          <div className="client-table-regular">
            <table className="client-table">
              <thead>
                <tr>
                  <th rowSpan="2">ID</th>
                  <th rowSpan="2">NAME</th>
                  <th rowSpan="2">GSTIN</th>
                  <th rowSpan="2">REGISTRATION DATE</th>
                  <th colSpan={tabs.length} className="text-center">STATUS</th>
                </tr>
                <tr>
                  {tabs.map((tab, index) => (
                    <th key={index}>{tab}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredClients.length > 0 ? (
                  filteredClients.map((client, index) => (
                    <ClientRow
                      key={index}
                      client={client}
                      onClick={handleRowClick}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={tabs.length + 4} className="text-center">
                      No clients found for selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
};

export default React.memo(ClientTableRegular);
