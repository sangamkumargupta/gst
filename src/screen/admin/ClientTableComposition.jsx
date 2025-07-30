import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import ClientRow from "../../components/ClientRow";
import clients from "../../GstCustomers/gstCustomer.json";
import ToggleSelect from "../../components/DropdownToggle";
import Footer from "../../components/Footer";
// const tabs = ["AAGSTR 1", "GSTR 3B", "GSTR 2A", "GSTR 2B"];
const tabs = ["CMP-08"];
// const tabs = ["CMP 08"];

const yearOptions = ["2022-2023", "2023-2024", "2024-2025"];
const frequencyOptions = ["QUARTERLY"];
const quarterOptions = [
  "Q1 (April to June)",
  "Q2 (July to September)",
  "Q3 (October to December)",
  "Q4 (January to March)",
];
const monthOptions = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

const ClientTableComposition = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
  year: "",
  frequency:frequencyOptions[0],
  month: quarterOptions[0],
  returnType: "COMPOSITION",
});


  const [isFiltering, setIsFiltering] = useState(false);

  const handleFilterChange = (key, value) => {
    setIsFiltering(true);
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleResetFilters = () => {
    setIsFiltering(false);
    setFilters({
      year: "",
      frequency: "",
      month: "",
    });
  };

  const handleRowClick = useCallback(
    
    (client) => {
      navigate(`/return/composition/${client.id}`, { state: { client } });
    },
    [navigate]
  );

  const getFinancialYear = (dateString) => {
    const [day, month, year] = dateString.split("/").map(Number);
    const fyStartYear = month < 4 ? year - 1 : year;
    return `${fyStartYear}-${fyStartYear + 1}`;
  };

  const filteredClients = clients.filter((client) => {
    if (client.type !== "COMPOSITION") return false;

    if (!isFiltering) return true;

    const [day, monthStr, yearStr] = client.date.split("/");
    const monthIndex = parseInt(monthStr, 10) - 1;
    const monthName = monthOptions[monthIndex];
    const year = getFinancialYear(client.date);

    const matchesYear = filters.year === "" || year === filters.year;
    const matchesMonth = filters.month === "" || filters.month === monthName;

    return matchesYear && matchesMonth;
  });

  return (
    <>
      <div className="p-4">
        <PageHeader
          parentTitle="Return"
          title="Composition"
          parentLink="/dashboard/home"
        />

        <div className="table-container">
          <div className=" d-flex  p-4 flex-wrap justify-content-center  gap-2">
            <ToggleSelect
              label="Return Type"
              options={["REGULAR", "COMPOSITION"]}
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
              label="Frequency"
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

            {/* {isFiltering && (
            <button
              className="btn btn-outline-danger ms-2"
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>
          )} */}
          </div>
          <div className="client-table-regular">
            <table className="client-table">
              <thead>
                <tr>
                  <th rowSpan="2">ID</th>
                  <th rowSpan="2">NAME</th>
                  <th rowSpan="2">GSTIN</th>
                  <th rowSpan="2">REGISTRATION DATE</th>
                  <th  className="">
                    STATUS
                  </th>
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

export default React.memo(ClientTableComposition);
