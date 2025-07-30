import React, { useState } from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import clients from "../../GstCustomers/gstCustomer.json";
import "../../assets/css/Ledger.css";
import PageHeader from "../../components/PageHeader";
import ToggleSelect from "../../components/DropdownToggle";
import LedgerTable from "../admin/LedgerTable";
import { FaTelegramPlane } from "react-icons/fa";
const companyOptions = clients.map((client) => client.name);

const Ledger = () => {
  const [selectedCompany, setSelectedCompany] = useState("");

  // Holds the values from UI (temporary filters)
  const [filters, setFilters] = useState({
    returnType: "REGULAR",
    year: "2023-2024",
    frequency: "MONTHLY",
    month: "NOVEMBER",
    company: "",
    dateRange: null,
    ledgerType: "",
  });

  // Final filters applied on Go click
  const [appliedFilters, setAppliedFilters] = useState({});

  const handleFilterChange = (field, value) => {
    if (field === "company") {
      setSelectedCompany(value);
    }
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleGoClick = () => {
    setAppliedFilters(filters);
  };

  return (
    <>
      <div className="p-4">
        <PageHeader
          // title = "Ledger"
          parentTitle="Ledger"
          parentLink="/dashboard/home"
          gstClint={selectedCompany || ""}
        />

        <div className="client-detail">
          <div className="card ledger-card shadow-sm">
            <div className="details-dropdown">
              {/* Client */}
              <div className="form-group">
                <label>Clients</label>
                <ToggleSelect
                  label="Clients"
                  options={companyOptions}
                  value={filters.company}
                  onChange={(val) => handleFilterChange("company", val)}
                />
              </div>

              {/* Date Range */}
              <div className="form-group">
                <label>Date Range</label>
                <DateRangePicker
                  size="md"
                  placeholder="Select Date Range"
                  style={{ width: "100%" }}
                  value={filters.dateRange}
                  onChange={(val) => handleFilterChange("dateRange", val)}
                  appearance="default"
                  cleanable
                />
              </div>

              {/* Ledger Type */}
              <div className="form-group">
                <label>Ledger Type</label>
                <div className="ledger-type">
                  {["Cash", "Credit", "Liability"].map((type) => (
                    <label key={type}>
                      <input
                        type="radio"
                        name="ledgerType"
                        value={type}
                        checked={filters.ledgerType === type}
                        onChange={(e) =>
                          handleFilterChange("ledgerType", e.target.value)
                        }
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              {/* Go Button */}
              <div className="form-group go-btn">
                <button className="primary-btn" onClick={handleGoClick}>
                  Go <FaTelegramPlane />
                </button>
              </div>
            </div>

            <LedgerTable filters={appliedFilters} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Ledger;
