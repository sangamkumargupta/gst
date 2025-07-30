import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import ClientRow from "../../components/ClientRow";
import clients from "../../GstCustomers/gstCustomer.json";
import ToggleSelect from "../../components/DropdownToggle";
import Footer from "../../components/Footer";
import "../../assets/css/ClientTable.css";

const tabs = ["GSTR 9", "GSTR 9C"];

const returnTypeOptions = ["REGULAR", "COMPOSITION"];
const yearOptions = ["2022-2023", "2023-2024", "2024-2025"];
const frequencyOptions = ["MONTHLY", "QUARTERLY"];
const monthOptions = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
];


  const quarterOptions = [
    "Q1 (April to June)",
    "Q2 (July to September)",
    "Q3 (October to December)",
    "Q4 (January to March)",
  ];
const ClientTableAnnul = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    returnType: "REGULAR",
    year: "",
    frequency: "All",
    month: "Q1 (April to June)",
  });


  const [isFiltering, setIsFiltering] = useState(false);

  const handleFilterChange = (key, value) => {
    setIsFiltering(true);
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleRowClick = useCallback(
    (client) => {
      navigate(`/return/annual/${client.id}`, { state: { client } });
    },
    [navigate]
  );

  const getFinancialYear = (dateString) => {
    const [day, month, year] = dateString.split("/").map(Number);
    const fyStartYear = month < 4 ? year - 1 : year;
    return `${fyStartYear}-${fyStartYear + 1}`;
  };

  const filteredClients = clients.filter((client) => {
    if (filters.returnType && client.type !== filters.returnType) return false;

    if (!isFiltering) return true;

    const [day, monthStr, yearStr] = client.date.split("/");
    const monthIndex = parseInt(monthStr, 10) - 1;
    const monthName = monthOptions[monthIndex];
    const year = getFinancialYear(client.date);

    return (
      (filters.year === "" || year === filters.year) &&
      (filters.month === "" || filters.month === monthName) &&
      (filters.frequency === "" || filters.frequency === "MONTHLY")
    );
  });

  return (
    <>
      <div className="p-4">
        <PageHeader
          parentTitle="Return"
          title="Annual"
          parentLink="/dashboard/home"
        />

        <div className="table-container mb-3">
          <div className="d-flex flex-wrap p-4 justify-content-center gap-2">
            <ToggleSelect
              label="Return Type"
              options={returnTypeOptions}
              value={filters.returnType}
              onChange={(val) => handleFilterChange("returnType", val)}
            />
            <ToggleSelect
              label="Year"
              options={yearOptions}
              value={filters.year}
              onChange={(val) => handleFilterChange("year", val)}
            />
            {/* <ToggleSelect
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
            /> */}
          </div>

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

export default React.memo(ClientTableAnnul);
