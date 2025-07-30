import React from "react";
import "../../assets/css/LedgerTable.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import { FaFilePdf, FaRegFileExcel } from "react-icons/fa";

const dummyData = [
  {
    srNo: 1,
    date: "10/05/2025",
    time: "09:30:00",
    reportingDate: "10/05/2025",
    referenceNo: "TXN001",
    taxPeriod: "Apr-25",
    description: "Cash Deposit",
    type: "Cash",
    integratedTax: "100.00",
    centralTax: "50.00",
    stateTax: "50.00",
  },
  {
    srNo: 2,
    date: "15/05/2025",
    time: "11:00:00",
    reportingDate: "15/05/2025",
    referenceNo: "TXN002",
    taxPeriod: "Apr-25",
    description: "Bank Credit",
    type: "Credit",
    integratedTax: "0.00",
    centralTax: "75.00",
    stateTax: "75.00",
  },
  {
    srNo: 3,
    date: "17/05/2025",
    time: "13:45:00",
    reportingDate: "17/05/2025",
    referenceNo: "TXN003",
    taxPeriod: "Apr-25",
    description: "Vendor Payment",
    type: "Debit",
    integratedTax: "0.00",
    centralTax: "60.00",
    stateTax: "60.00",
  },
  {
    srNo: 4,
    date: "20/05/2025",
    time: "14:30:00",
    reportingDate: "20/05/2025",
    referenceNo: "TXN004",
    taxPeriod: "May-25",
    description: "GST Payable Liability",
    type: "Liability",
    integratedTax: "120.00",
    centralTax: "60.00",
    stateTax: "60.00",
  },
  {
    srNo: 5,
    date: "01/04/2025",
    time: "10:00:00",
    reportingDate: "01/04/2025",
    referenceNo: "TXN005",
    taxPeriod: "Mar-25",
    description: "Old Cash Entry",
    type: "Cash",
    integratedTax: "50.00",
    centralTax: "25.00",
    stateTax: "25.00",
  },
  {
    srNo: 6,
    date: "01/05/2025",
    time: "08:00:00",
    reportingDate: "01/05/2025",
    referenceNo: "TXN006",
    taxPeriod: "May-25",
    description: "First Day Entry",
    type: "Credit",
    integratedTax: "10.00",
    centralTax: "5.00",
    stateTax: "5.00",
  },
  { srNo: 7, description: "Opening Balance" },
  { srNo: 8, description: "Closing Balance" },
];

const LedgerTable = ({ filters }) => {
  const filteredData = dummyData.filter((row) => {
    if (!row.type) return true;

    const matchLedgerType =
      !filters.ledgerType ||
      row.type.toLowerCase() === filters.ledgerType.toLowerCase();

    const matchDateRange =
      !filters.dateRange ||
      (!row.date
        ? true
        : (() => {
            const [day, month, year] = row.date.split("/");
            const rowDate = new Date(`${year}-${month}-${day}`);
            return (
              rowDate >= filters.dateRange[0] && rowDate <= filters.dateRange[1]
            );
          })());

    return matchLedgerType && matchDateRange;
  });

  const handlePdfDownload = () => {
    const input = document.querySelector(".ledger-table-container");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "pt", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      const heading = "GST Ledger Report";
      pdf.setFontSize(18);
      pdf.text(heading, pdfWidth / 2, 40, { align: "center" });

      // Add image below heading
      pdf.addImage(imgData, "PNG", 0, 60, pdfWidth, imgHeight);
      pdf.save("ledger.pdf");
    });
  };

  const handleExcelDownload = () => {
    const table = document.querySelector(".ledger-table");
    const worksheet = XLSX.utils.table_to_sheet(table);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Ledger");
    XLSX.writeFile(workbook, "ledger.xlsx");
  };

  return (
    <div className="ledger-wrapper">
      <div className="bottom-buttons">
        <button className="pdf" onClick={handlePdfDownload}>
          <FaFilePdf /> PDF
        </button>
        <button className="excel" onClick={handleExcelDownload}>
          <FaRegFileExcel /> EXCEL
        </button>
      </div>

      <div className="ledger-table-container">
        <table className="ledger-table">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Date of deposit/Debit</th>
              <th>Time of deposit</th>
              <th>Reporting date (by bank)</th>
              <th>Reference No.</th>
              <th>Tax Period, if applicable</th>
              <th>Description</th>
              <th>Transaction Type (Debit/ Credit)</th>
              <th>Amount debited / credited</th>
              <th>Integrated Tax</th>
              <th>Central Tax</th>
              <th>State Tax</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.srNo}>
                <td>{row.srNo}</td>
                <td>{row.date || "-"}</td>
                <td>{row.time || "-"}</td>
                <td>{row.reportingDate || "-"}</td>
                <td>{row.referenceNo || "-"}</td>
                <td>{row.taxPeriod || "-"}</td>
                <td>{row.description}</td>
                <td>{row.type || "-"}</td>
                <td>-</td>
                <td>{row.integratedTax || "-"}</td>
                <td>{row.centralTax || "-"}</td>
                <td>{row.stateTax || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LedgerTable;
