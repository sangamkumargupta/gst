import React, { forwardRef, useImperativeHandle } from "react";
import * as XLSX from "xlsx";
const GSTR4ACDNR = forwardRef((props, ref) => {
  const data = [
    {
      period: "Apr-Jun 25",
      gstin: "08AISPQ7157J1ZN",
      name: "JAYA GURNANI",
      noteType: "Credit",
      noteNumber: "CDN001",
      noteSupplyType: "Regular",
      noteDate: "16/04/2025",
      noteValue: "37,520.00",
      place: "Rajasthan",
      reverseCharge: "N",
      rate: "5",
      taxableValue: "35,733.00",
      integratedTax: "0.00",
      centralTax: "893.33",
      stateTax: "893.33",
      cess: "0.00",
      filingDate: "08/05/2025",
      source: "GSTR-1",
      inr: "789654123",
      inrDate: "17/04/2025",
    },
    {
      period: "Apr-Jun 25",
      gstin: "08AISPQ7157J1ZN",
      name: "JAYA GURNANI",
      noteType: "Debit",
      noteNumber: "CDN002",
      noteSupplyType: "Regular",
      noteDate: "05/06/2025",
      noteValue: "30,957.00",
      place: "Rajasthan",
      reverseCharge: "N",
      rate: "5",
      taxableValue: "29,483.00",
      integratedTax: "0.00",
      centralTax: "737.08",
      stateTax: "737.08",
      cess: "0.00",
      filingDate: "11/06/2025",
      source: "GSTR-1A",
      inr: "456123789",
      inrDate: "06/06/2025",
    },
  ];


  
  const exportToExcel = () => {
    const header = [[
      "GSTR-4A period",
      "GSTIN of supplier/ECO",
      "Trade/Legal name",
      "Note type",
      "Note number",
      "Note supply type",
      "Note date",
      "Note value (₹)",
      "Place of supply",
      "Supply attract reverse charge",
      "Rate (%)",
      "Taxable value (₹)",
      "Integrated tax (₹)",
      "Central tax (₹)",
      "State/UT tax (₹)",
      "Cess (₹)",
      "GSTR-1/IFF/GSTR-1A/GSTR-5 filing date",
      "Source",
      "INR",
      "INR Date",
    ]];

    const rows = data.map((row) => [
      row.period,
      row.gstin,
      row.name,
      row.noteType,
      row.noteNumber,
      row.noteSupplyType,
      row.noteDate,
      row.noteValue,
      row.place,
      row.reverseCharge,
      row.rate,
      row.taxableValue,
      row.integratedTax,
      row.centralTax,
      row.stateTax,
      row.cess,
      row.filingDate,
      row.source,
      row.inr,
      row.inrDate,
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([...header, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "GSTR-4A CDNR");
    XLSX.writeFile(workbook, "GSTR4A-CDNR.xlsx");
  };

  useImperativeHandle(ref, () => ({ exportToExcel }));


  return (
    // <div className="container mt-4 text-center">
    <div className="gstr01-table">
      <div
        className="d-flex align-items-center px-3 py-3"
        style={{ background: "#b94eed", color: "white" }}
      >
        <img src="/image.png" alt="Vite Logo" style={{ height: 40 }} />
        <div className="flex-grow-1 text-center">
          <h4 className="mb-0">Goods and Services Tax - GSTR 4A</h4>
        </div>
      </div>
      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover text-center align-middle gstr-table">
          <thead>
            <tr>
              <th rowSpan="2">GSTR-4A period</th>
              <th rowSpan="2">GSTIN of supplier/ECO</th>
              <th rowSpan="2">Trade/Legal name</th>
              <th colSpan="5">Credit/Debit note details</th>
              <th rowSpan="2">Place of supply</th>
              <th rowSpan="2">Supply attract reverse charge</th>
              <th rowSpan="2">Rate (%)</th>
              <th rowSpan="2">Taxable value (₹)</th>
              <th colSpan="4">Tax amount</th>
              <th rowSpan="2">GSTR-1/IFF/GSTR-1A/GSTR-5 filing date</th>
              <th rowSpan="2">Source</th>
              <th rowSpan="2">INR</th>
              <th rowSpan="2">INR Date</th>
            </tr>
            <tr>
              <th>Note type</th>
              <th>Note number</th>
              <th>Note supply type</th>
              <th>Note date</th>
              <th>Note value (₹)</th>
              <th>Integrated tax (₹)</th>
              <th>Central tax (₹)</th>
              <th>State/UT tax (₹)</th>
              <th>Cess (₹)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                <td>{row.period}</td>
                <td>{row.gstin}</td>
                <td>{row.name}</td>
                <td>{row.noteType}</td>
                <td>{row.noteNumber}</td>
                <td>{row.noteSupplyType}</td>
                <td>{row.noteDate}</td>
                <td>{row.noteValue}</td>
                <td>{row.place}</td>
                <td>{row.reverseCharge}</td>
                <td>{row.rate}</td>
                <td>{row.taxableValue}</td>
                <td>{row.integratedTax}</td>
                <td>{row.centralTax}</td>
                <td>{row.stateTax}</td>
                <td>{row.cess}</td>
                <td>{row.filingDate}</td>
                <td>{row.source}</td>
                <td>{row.inr}</td>
                <td>{row.inrDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Summary Table */}
      <div className="p-2 table-responsive">
        <table className="w-100 table table-bordered table-striped table-hover text-center align-middle">
          <tbody>
            <tr className="d-block d-md-table-row">
              <td className="p-2 d-block d-md-table-cell"><strong>Taxable value </strong>| 000</td>
              <td className="d-block d-md-table-cell"><strong>IGST </strong>| 000</td>
              <td className="d-block d-md-table-cell"><strong>CGST </strong>| 000</td>
              <td className="d-block d-md-table-cell"><strong>SGST </strong>| 000</td>
              <td className="d-block d-md-table-cell"><strong>CESS </strong>| 000</td>
              <td className="d-block d-md-table-cell"><strong>Invoice Value </strong>| 000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default GSTR4ACDNR;