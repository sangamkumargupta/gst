import React, { useState } from "react";

// Regular Form Components
import B2B from "./forms/B2B";
import B2CL from "./forms/B2CL";
import B2CS from "./forms/B2CS";
import SIXA from "./forms/SIXA";
import CDNR from "./forms/CDNR";
import CDNUR from "./forms/CDNUR";
import ATADJ from "./forms/ATADJ";
import ECO from "./forms/ECO";
import EXP from "./forms/EXP";
import DOCS from "./forms/DOCS";
import AT from "./forms/AT";
import EXEMPT from "./forms/EXEMPT";
import HSN from "./forms/HSN";
import Summary from "./forms/Summary";
import AllRegularList from "./AllRegularList";

// Amendment Form Components
import B2BA from "./forms/B2BA";
import B2CLA from "./forms/B2CLA";
import B2CSA from "./forms/B2CSA";
import EXPA from "./forms/EXPA";
import CDNRA from "./forms/CDNRA";
import CDNURA from "./forms/CDNURA";
import ATADJA from "./forms/ATADJA";
import ECOA from "./forms/ECOA";
import ATA from "./forms/ATA";
import EXEMPTA from "./forms/EXEMPTA";

// UI Components
import ToggleSelect from "../../components/DropdownToggle";

// Dropdown Options
const regularOptions = [
  { code: "B2B", label: "(Business-to-Business)" },
  { code: "B2CL", label: "(Business-to-Consumer Large)" },
  { code: "B2CS", label: "(Business-to-Consumer Small)" },
  { code: "EXP", label: "(Exports)" },
  { code: "EXEMP", label: "(Exempt or NIL Rated)" },
  { code: "CDNR", label: "(Credit/Debit Notes - Registered)" },
  { code: "CDNUR", label: "(Credit/Debit Notes - Unregistered)" },
  { code: "AT", label: "(Advance Received)" },
  { code: "ATADJ", label: "(Adjustment of Advance)" },
  { code: "HSN", label: "(Harmonized System of Nomenclature)" },
  { code: "DOCS", label: "(Documents Issued)" },
  { code: "ECO", label: "(E-Commerce Operator)" },
];

const amendmentOptions = [
  { code: "B2B-Amendment", label: "(Business-to-Business Amendment)" },
  { code: "B2CL-Amendment", label: "(Business-to-Consumer Large Amendment)" },
  { code: "B2CS-Amendment", label: "(Business-to-Consumer Small Amendment)" },
  { code: "EXP-Amendment", label: "(Exports Amendment)" },
  { code: "EXEMP-Amendment", label: "(Exempt or NIL Rated Amendment)" },
  {
    code: "CDNR-Amendment",
    label: "(Credit/Debit Notes - Registered Amendment)",
  },
  {
    code: "CDNUR-Amendment",
    label: "(Credit/Debit Notes - Unregistered Amendment)",
  },
  { code: "AT-Amendment", label: "(Advance Received Amendment)" },
  { code: "ATADJ-Amendment", label: "(Advance Tax Adjustment Amendment)" },
  { code: "ECO-Amendment", label: "(E-Commerce Operator Amendment)" },
];

// Dummy return records
const returnData = [
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
];

const GstR1 = ({ activeTab = "GSTR 1" }) => {
  const [selectedTab, setSelectedTab] = useState("All");
  const [selectedRegular, setSelectedForm] = useState("");
  const [selectedSummaryOption, setSelectedSummaryOption] = useState("All");

  const [filters, setFilters] = useState({
    returnType: "REGULAR",
    year: "2022-2023",
    frequency: "MONTHLY",
    month: "NOVEMBER",
    company: "GODAWARI INVENTIVE",
    viewType: "SUMMARY",
  });

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
    <div className="processed-container">
      <div className="sub-actions border-bottom p-2">
        <div className="left-actions">
          {/* View Type Toggle */}
          <ToggleSelect
            label="SUMMARY"
            options={["All", "REGULAR", "AMENDMENTS"]}
            value={selectedSummaryOption}
            onChange={(val) => {
              setSelectedSummaryOption(val);
              handleFilterChange("viewType", "SUMMARY");
              setSelectedTab(val);
            }}
            className="me-3"
          />

          {/* Regular Form Type */}
          <ToggleSelect
            label="Regular"
            options={regularOptions.map((opt) => `${opt.code} - ${opt.label}`)}
            value={
              filters.viewType === "REGULAR"
                ? `${selectedTab} - ${
                    regularOptions.find((o) => o.code === selectedTab)?.label ||
                    ""
                  }`
                : ""
            }
            onChange={(val) => {
              const selectedCode = val.split(" - ")[0];
              setSelectedForm(selectedCode);
              setSelectedTab(selectedCode);
              handleFilterChange("viewType", "REGULAR");
            }}
          />

          {/* Amendment Form Type */}
          <ToggleSelect
            label="Amendment"
            options={amendmentOptions.map(
              (opt) => `${opt.code} - ${opt.label}`
            )}
            value={
              filters.viewType === "AMENDMENTS"
                ? `${selectedTab} - Amendment`
                : ""
            }
            onChange={(val) => {
              const selectedCode = val.split(" - ")[0];
              setSelectedForm(selectedCode);
              setSelectedTab(selectedCode);
              handleFilterChange("viewType", "AMENDMENTS");
            }}
          />
        </div>

        {/* Status Info */}
        <div className="right-actions">
          <span className={`status ${filteredData ? "green" : "red"}`}>
            STATUS: {filteredData ? filteredData.status : "Not Available"}
          </span>
          <span className="status">DATE: {filteredData?.date || "--"}</span>
          <span className="status">ARN: {filteredData?.arn || "--"}</span>

          <label className="nil-return">
            <input type="checkbox" className="custom-checkbox" />
            <span className="checkbox-label">Mark as Nil Return</span>
          </label>
        </div>
      </div>

      {/* === RENDER REGULAR FORMS === */}
      {selectedTab === "B2B" && <B2B />}
      {selectedTab === "B2CL" && <B2CL />}
      {selectedTab === "B2CS" && <B2CS />}
      {selectedTab === "EXP" && <EXP />}
      {selectedTab === "EXEMP" && <EXEMPT />}
      {selectedTab === "CDNR" && <CDNR />}
      {selectedTab === "CDNUR" && <CDNUR />}
      {selectedTab === "AT" && <AT />}
      {selectedTab === "ATADJ" && <ATADJ />}
      {selectedTab === "HSN" && <HSN />}
      {selectedTab === "DOCS" && <DOCS />}
      {selectedTab === "ECO" && <ECO />}
      {selectedTab === "6A" && <SIXA />}

      {/* === RENDER AMENDMENT FORMS === */}
      {selectedTab === "B2B-Amendment" && <B2BA />}
      {selectedTab === "B2CL-Amendment" && <B2CLA />}
      {selectedTab === "B2CS-Amendment" && <B2CSA />}
      {selectedTab === "EXP-Amendment" && <EXPA />}
      {selectedTab === "EXEMP-Amendment" && <EXEMPTA />}
      {selectedTab === "CDNR-Amendment" && <CDNRA />}
      {selectedTab === "CDNUR-Amendment" && <CDNURA />}
      {selectedTab === "AT-Amendment" && <ATA />}
      {selectedTab === "ATADJ-Amendment" && <ATADJA />}
      {selectedTab === "ECO-Amendment" && <ECOA />}

      {/* === FALLBACK: SUMMARY === */}
      {(selectedTab === "All" ||
        selectedTab === "REGULAR" ||
        selectedTab === "AMENDMENTS") && (
        <AllRegularList filter={selectedSummaryOption} />
      )}
    </div>
  );
};

export default GstR1;
