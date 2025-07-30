import React, { forwardRef, useImperativeHandle } from "react";
import * as XLSX from "xlsx";
const GSTR4ACDNRA = forwardRef((props, ref) => {
  const data = [
    {
      period: "Apr-Jun 25",
      originalInvoiceNumber: "7001",
      originalInvoiceDate: "10/04/2025",
      revisedGstin: "08AISPQ7157J1ZN",
      revisedName: "JAYA GURNANI",
      revisedInvoiceType: "R",
      revisedInvoiceNumber: "7528",
      revisedInvoiceDate: "16/04/2025",
      revisedInvoiceValue: "37,520.00",
      place: "Rajasthan",
      reverseCharge: "N",
      rate: "5",
      taxableValue: "35,733.00",
      integratedTax: "0.00",
      centralTax: "893.33",
      stateTax: "893.33",
      cess: "0.00",
      filingDate: "08/05/2025",
    },
    {
      period: "Apr-Jun 25",
      originalInvoiceNumber: "7002",
      originalInvoiceDate: "20/04/2025",
      revisedGstin: "08AISPQ7157J1ZN",
      revisedName: "JAYA GURNANI",
      revisedInvoiceType: "R",
      revisedInvoiceNumber: "7578",
      revisedInvoiceDate: "05/06/2025",
      revisedInvoiceValue: "30,957.00",
      place: "Rajasthan",
      reverseCharge: "N",
      rate: "5",
      taxableValue: "29,483.00",
      integratedTax: "0.00",
      centralTax: "737.08",
      stateTax: "737.08",
      cess: "0.00",
      filingDate: "11/06/2025",
    },
  ];

  // Export logic
  const exportToExcel = () => {
    const header = [[
      "GSTR-4A period",
      "Original Invoice Number",
      "Original Invoice Date",
      "GSTIN of supplier/ECO",
      "Trade/Legal name",
      "Invoice Type",
      "Invoice Number",
      "Invoice Date",
      "Invoice Value (₹)",
      "Place of supply",
      "Reverse Charge",
      "Rate (%)",
      "Taxable Value (₹)",
      "Integrated Tax (₹)",
      "Central Tax (₹)",
      "State Tax (₹)",
      "Cess (₹)",
      "Filing Date",
    ]];

    const rows = data.map((row) => [
      row.period,
      row.originalInvoiceNumber,
      row.originalInvoiceDate,
      row.revisedGstin,
      row.revisedName,
      row.revisedInvoiceType,
      row.revisedInvoiceNumber,
      row.revisedInvoiceDate,
      row.revisedInvoiceValue,
      row.place,
      row.reverseCharge,
      row.rate,
      row.taxableValue,
      row.integratedTax,
      row.centralTax,
      row.stateTax,
      row.cess,
      row.filingDate,
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([...header, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "GSTR-4A Amendments");
    XLSX.writeFile(workbook, "GSTR4A-Amendments.xlsx");
  };

  useImperativeHandle(ref, () => ({ exportToExcel }));

  return (
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
       
        <table className="table  table-bordered table-striped table-hover text-center align-middle gstr-table">
          <thead>
            <tr>
              <th colSpan={18}>
                Amendments to previously uploaded invoices by supplier/ECO
              </th>
            </tr>

            <tr>
              <th rowSpan={3}>GSTR-4A period</th>
              <th className="text-center" colSpan={2}>
                Original Details
              </th>
              <th colSpan={15}>Revised details</th>
            </tr>
            <tr>
              <th rowSpan="2"> Invoice number</th>
              <th rowSpan="2">Invoice date</th>
              <th rowSpan="2">GSTIN of supplier/ECO</th>
              <th rowSpan="2">Trade/Legal name</th>
              <th colSpan="4">Invoice details</th>
              <th rowSpan="2">Place of supply</th>
              <th rowSpan="2">Supply attract reverse charge</th>
              <th rowSpan="2">Rate (%)</th>
              <th rowSpan="2">Taxable value (₹)</th>
              <th colSpan="4">Tax amount</th>
              <th rowSpan="2">GSTR-1/IFF/GSTR-1A/GSTR-5 filing date</th>
            </tr>
            <tr>
              <th>Invoice type</th>
              <th>Invoice number</th>
              <th>Invoice date</th>
              <th>Invoice value (₹)</th>
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
                <td>{row.originalInvoiceNumber}</td>
                <td>{row.originalInvoiceDate}</td>
                <td>{row.revisedGstin}</td>
                <td>{row.revisedName}</td>
                <td>{row.revisedInvoiceType}</td>
                <td>{row.revisedInvoiceNumber}</td>
                <td>{row.revisedInvoiceDate}</td>
                <td>{row.revisedInvoiceValue}</td>
                <td>{row.place}</td>
                <td>{row.reverseCharge}</td>
                <td>{row.rate}</td>
                <td>{row.taxableValue}</td>
                <td>{row.integratedTax}</td>
                <td>{row.centralTax}</td>
                <td>{row.stateTax}</td>
                <td>{row.cess}</td>
                <td>{row.filingDate}</td>
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

export default GSTR4ACDNRA;