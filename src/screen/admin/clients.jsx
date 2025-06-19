import React, { useState } from "react";
import "../../assets/css/clients.css";
import PageHeader from "../../components/PageHeader";
import ToggleSelect from "../../components/DropdownToggle";
import { FaFileAlt } from "react-icons/fa";
import Tabs from "../../components/Tabs";

const returnTypeOptions = ["REGULAR", "COMPOSITION"];
const yearOptions = ["2022-2023", "2023-2024", "2024-2025"];
const frequencyOptions = ["MONTHLY", "QUARTERLY"];
const frequencyTabOptions = ["SUMMARY", "REGULAR", "AMENDMENT"];
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
const companyOptions = ["GODAWARI INVENTIVE", "ACME CORP", "XYZ TRADERS"];

const tabs = ["GSTR 1", "GSTR 3B", "GSTR 2A", "GSTR 2B", "CMP 08", "GSTR 4A"];
const Clients = () => {
  const [filters, setFilters] = useState({
    returnType: "REGULAR",
    year: "2022-2023",
    frequency: "MONTHLY",
    month: "NOVEMBER",
    company: "GODAWARI INVENTIVE",
    frequencys: "SUMMARY",
  });

  const [activeTab, setActiveTab] = useState("GSTR 1");

  const [returnData] = useState([
    {
      returnType: "REGULAR",
      year: "2022-2023",
      frequency: "MONTHLY",
      month: "NOVEMBER",
      company: "GODAWARI INVENTIVE",
      gstrType: "GSTR 1",
      arn: "ARN12345678",
      date: "2022-11-25",
      status: "Filed",
    },
    {
      returnType: "REGULAR",
      year: "2023-2024",
      frequency: "MONTHLY",
      month: "DECEMBER",
      company: "ACME CORP",
      gstrType: "GSTR 3B",
      arn: "ARN23456789",
      date: "2023-12-15",
      status: "Pending",
    },
  ]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const filteredData = returnData.find(
    (item) =>
      item.returnType === filters.returnType &&
      item.year === filters.year &&
      item.frequency === filters.frequency &&
      item.month === filters.month &&
      item.company === filters.company &&
      item.gstrType === activeTab
  );

  return (
    <>
      <PageHeader
        title="Clients"
        parentTitle="Return"
        parentLink="/return/home"
      />

      <div className="gstr-options">
        <div className="filter-row">
          <ToggleSelect
            label="Return Type"
            options={returnTypeOptions}
            value={filters.returnType}
            onChange={(val) => handleFilterChange("returnType", val)}
            className="dropdown-wrapper-return-type"
            buttonClass="btn-return-type"
            dropdownClass="dropdown-return-type"
            optionClass="option-return-type"
            selectedOptionClass="selected-return-type"
            arrowClass="arrow-return-type"
          />
          <ToggleSelect
            label="Year"
            options={yearOptions}
            value={filters.year}
            onChange={(val) => handleFilterChange("year", val)}
            className="dropdown-wrapper-year"
            buttonClass="btn-year"
            dropdownClass="dropdown-year"
            optionClass="option-year"
            selectedOptionClass="selected-year"
            arrowClass="arrow-year"
          />
          <ToggleSelect
            label="Frequency"
            options={frequencyOptions}
            value={filters.frequency}
            onChange={(val) => handleFilterChange("frequency", val)}
            className="dropdown-wrapper-frequency"
            buttonClass="btn-frequency"
            dropdownClass="dropdown-frequency"
            optionClass="option-frequency"
            selectedOptionClass="selected-frequency"
            arrowClass="arrow-frequency"
          />
          <ToggleSelect
            label="Month"
            options={monthOptions}
            value={filters.month}
            onChange={(val) => handleFilterChange("month", val)}
            className="dropdown-wrapper-month"
            buttonClass="btn-month"
            dropdownClass="dropdown-month"
            optionClass="option-month"
            selectedOptionClass="selected-month"
            arrowClass="arrow-month"
          />
          <ToggleSelect
            label="Company"
            options={companyOptions}
            value={filters.company}
            onChange={(val) => handleFilterChange("company", val)}
            className="dropdown-wrapper-company"
            buttonClass="btn-company"
            dropdownClass="dropdown-company"
            optionClass="option-company"
            selectedOptionClass="selected-company"
            arrowClass="arrow-company"
          />
        </div>

        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="sub-actions">
          <div className="left-actions">
            <ToggleSelect
              label="Select Frequency"
              options={frequencyTabOptions}
              value={filters.frequencys}
              onChange={(val) => handleFilterChange("frequencys", val)}
              className="dropdown-wrapper-frequency-tab"
              buttonClass="btn-frequency-tab"
              dropdownClass="dropdown-frequency-tab"
              optionClass="option-frequency-tab"
              selectedOptionClass="selected-frequency-tab"
              arrowClass="arrow-frequency-tab"
            />

            <select className="btn blue">
              <option>Regular</option>
            </select>
            <select className="btn purple">
              <option>Amendment</option>
            </select>
          </div>

          <div className="right-actions">
            <span className={`status ${filteredData ? "green" : "red"}`}>
              STATUS: {filteredData ? filteredData.status : "Not Available"}
            </span>
            <span className="status">
              DATE: {filteredData ? filteredData.date : "--"}
            </span>
            <span className="status">
              ARN: {filteredData ? filteredData.arn : "--"}
            </span>

            <label className="nil-return">
              <input type="checkbox" className="custom-checkbox" />
              <span className="checkbox-label">Mark as Nil Return</span>
            </label>
          </div>
        </div>

        {!filteredData ? (
          <div className="no-data">
            <span>
              No Data : No return data found for {filters.month}-{filters.year}
            </span>
          </div>
        ) : (
          <div className="data-present">
            <p>
              ✅ Data available for {activeTab} filed on {filteredData.date}{" "}
              with ARN {filteredData.arn}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Clients;
