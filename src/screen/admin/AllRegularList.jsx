import React, { useState } from "react";
import CollapsibleRecordItem from "../../components/CollapsibleOptionTab";
import Datatable from "../../components/DataTable";

// Dummy data map
const gstDummyDataMap = {
  b2b: { recipient_gstin: "22AAAAA0000A1Z5", recipient_name: "ABC Pvt Ltd", invoice_number: "INV001", invoice_date: "2025-07-21", total_invoice_value: "15000", pos: "Maharashtra", supply_attract_reverse_charge: "No", is_the_supply_eligible: "Yes", supply_type: "Regular", source: "27ABCDE1234F1Z5", irn: "IRN0001", irn_date: "2025-07-20" },
  b2ba: { original_invoice_number: "INV001", original_invoice_date: "2025-07-21", revised_invoice_number: "INV001A", revised_invoice_date: "2025-07-25", gstin: "22AAAAA0000A1Z5", name: "ABC Pvt Ltd", invoice_value: "15500", pos: "Maharashtra", reverse_charge: "No", eligibility: "Yes", supply_type: "Regular", irn: "IRN0001A", irn_date: "2025-07-24" },
  b2cl: { invoice_number: "CL001", invoice_date: "2025-07-19", invoice_value: "12000", pos: "Madhya Pradesh", place_of_supply: "Madhya Pradesh", type: "Interstate", rate: "18%", taxable_value: "10169.49", cess_amount: "0" },
  b2cla: { original_invoice_number: "CL001", original_invoice_date: "2025-07-19", revised_invoice_number: "CL001A", revised_invoice_date: "2025-07-22", pos: "Madhya Pradesh", taxable_value: "10200", rate: "18%", cess_amount: "0" },
  b2cs: { pos: "Gujarat", rate: "5%", taxable_value: "5000", cess_amount: "0" },
  b2csa: { original_month: "06-2025", pos: "Gujarat", rate: "5%", taxable_value: "5000", cess_amount: "0" },
  cdnr: { note_number: "CN001", note_date: "2025-07-10", recipient_gstin: "24AAAAA0000A1Z5", invoice_number: "INV005", invoice_date: "2025-07-05", note_type: "Credit Note", reason: "Rate Difference", pos: "Gujarat", rate: "18%", taxable_value: "2000", cess_amount: "0" },
  cdnra: { original_note_number: "CN001", original_note_date: "2025-07-10", revised_note_number: "CN001A", revised_note_date: "2025-07-15", invoice_number: "INV005", invoice_date: "2025-07-05", note_type: "Credit Note", reason: "Correction", pos: "Gujarat", rate: "18%", taxable_value: "2100", cess_amount: "0" },
  exp: { invoice_number: "EXP001", invoice_date: "2025-07-12", invoice_value: "25000", port_code: "INDEL5", shipping_bill_number: "SB1234567", shipping_bill_date: "2025-07-13", supply_type: "With Payment", rate: "5%", taxable_value: "23809.52", cess_amount: "0" },
  expa: { original_invoice_number: "EXP001", original_invoice_date: "2025-07-12", revised_invoice_number: "EXP001A", revised_invoice_date: "2025-07-17", port_code: "INDEL5", shipping_bill_number: "SB7654321", shipping_bill_date: "2025-07-18", supply_type: "With Payment", rate: "5%", taxable_value: "24000", cess_amount: "0" },
  at: { place_of_supply: "Rajasthan", rate: "12%", gross_advance_received: "10000", cess_amount: "0" },
  ata: { original_month: "06-2025", place_of_supply: "Rajasthan", rate: "12%", adjusted_advance: "5000", cess_amount: "0" },
  txpd: { rate: "18%", gross_advance_received: "8000", pos: "Tamil Nadu", cess_amount: "0" },
  txpda: { original_month: "06-2025", rate: "18%", adjusted_advance: "3000", pos: "Tamil Nadu", cess_amount: "0" },
  hsn: { hsn_code: "1001", description: "Wheat", uqc: "KG", total_quantity: "1000", total_value: "20000", taxable_value: "19000", igst: "3420", cgst: "0", sgst: "0", cess: "0" },
  docs: { document_type: "Invoice", serial_number_from: "INV001", serial_number_to: "INV050", total_number: "50", cancelled: "2" }
};

// Utility to generate columns for table
const generateColumns = (obj) => {
  return Object.keys(obj).map((key) => ({
    header: key.replace(/_/g, " ").toUpperCase(),
    accessor: key
  }));
};

// Convert object to row data
const formatObjectToTableData = (obj) => {
  return obj ? [obj] : [];
};

// Options
const regularOptions = [
  { code: "B2B", label: "B2B Regular Records" },
  { code: "B2CL", label: "B2CL Regular Records" },
  { code: "B2CS", label: "B2CS Regular Records" },
  { code: "EXP", label: "Exports Regular Records" },
  { code: "EXEMP", label: "Exempt/NIL Rated Regular Records" },
  { code: "CDNR", label: "CDNR Regular Records" },
  { code: "CDNUR", label: "CDNUR Regular Records" },
  { code: "AT", label: "Advance Received Regular Records" },
  { code: "ATADJ", label: "Advance Adjustment Regular Records" },
  { code: "HSN", label: "HSN Regular Records" },
  { code: "DOCS", label: "Documents Issued Regular Records" },
  { code: "ECO", label: "E-Commerce Regular Records" }
];

const amendmentOptions = [
  { code: "B2B-Amendment", label: "B2B Amendment Records" },
  { code: "B2CL-Amendment", label: "B2CL Amendment Records" },
  { code: "B2CS-Amendment", label: "B2CS Amendment Records" },
  { code: "EXP-Amendment", label: "Exports Amendment Records" },
  { code: "EXEMP-Amendment", label: "Exempt/NIL Rated Amendment Records" },
  { code: "CDNR-Amendment", label: "CDNR Amendment Records" },
  { code: "CDNUR-Amendment", label: "CDNUR Amendment Records" },
  { code: "AT-Amendment", label: "Advance Amendment Records" },
  { code: "ATADJ-Amendment", label: "Advance Adjustment Amendment Records" },
  { code: "ECO-Amendment", label: "E-Commerce Amendment Records" }
];

// Main Component
const AllRegularList = ({ filter = "All" }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filterOptions = (options) =>
    options.filter((item) =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const renderSection = (options, title, color, parentId) => {
    const filtered = filterOptions(options);
    if (filtered.length === 0) return null;

    return (
      <>
        <h5 className={`text-${color} mb-3 fw-bold`}>{title}</h5>
        <div className="accordion mb-4" id={parentId}>
          {filtered.map((item, index) => {
            const key = item.code.toLowerCase().replace(/-amendment$/, "a");
            const data = gstDummyDataMap[key];

            return (
              <CollapsibleRecordItem
                key={item.code}
                index={index}
                title={item.label}
                parentId={parentId}
              >
                {data ? (
                  <div className="table-responsive mt-3">
                    <Datatable
                      data={formatObjectToTableData(data)}
                      columns={generateColumns(data)}
                    />
                  </div>
                ) : (
                  <div className="text-muted mt-2">
                    No dummy data available for <strong>{item.code}</strong>.
                  </div>
                )}
              </CollapsibleRecordItem>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className="container mt-4">
      {/* <div className="mb-4">
        <input
          type="text"
          className="form-control shadow-sm"
          placeholder="🔍 Search records by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div> */}
      <div className="row mb-3">
        <div className="col-12 col-md-6 ms-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Please enter form name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {(filter === "All" || filter === "REGULAR") &&
        renderSection(regularOptions, "📂 Regular Records", "primary", "regular-accordion")}

      {(filter === "All" || filter === "AMENDMENTS") &&
        renderSection(amendmentOptions, "📝 Amendment Records", "success", "amendment-accordion")}
    </div>
  );
};

export default AllRegularList;
