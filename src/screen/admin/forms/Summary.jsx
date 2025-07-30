import React, { useMemo } from "react";
import TableActionButton from "../../../components/TableActionButton.jsx";
import swal from "sweetalert";
import "../../../assets/css/formcss.css";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const dummyData = [
  {
    gstin: "27AAACB2230M1ZV",
    receiverName: "ABC Corp",
    invoiceNumber: "INV001",
    invoiceDate: "2025-07-01",
    invoiceValue: "5000.00",
    placeOfSupply: "Maharashtra",
    reverseCharge: "N",
    taxRate: "18%",
    invoiceType: "Regular",
    ecommerceGstin: "",
    rate: "18",
    taxableValue: "4237.29",
    cessAmount: "3.00",
    isAmendment: false,
  },
  {
    gstin: "07AACCA1234F1Z5",
    receiverName: "XYZ Pvt Ltd",
    invoiceNumber: "INV002",
    invoiceDate: "2025-07-05",
    invoiceValue: "12000.00",
    placeOfSupply: "Delhi",
    reverseCharge: "N",
    taxRate: "5%",
    invoiceType: "Regular",
    ecommerceGstin: "",
    rate: "5",
    taxableValue: "11428.57",
    cessAmount: "1.00",
    isAmendment: false,
  },
  // Amendment to INV001
  {
    gstin: "27AAACB2230M1ZV",
    receiverName: "ABC Corp",
    invoiceNumber: "INV001A",
    invoiceDate: "2025-07-10",
    originalInvoiceNumber: "INV001",
    originalInvoiceDate: "2025-07-01",
    invoiceValue: "5500.00",
    placeOfSupply: "Maharashtra",
    reverseCharge: "N",
    taxRate: "18%",
    invoiceType: "Amendment",
    ecommerceGstin: "",
    rate: "18",
    taxableValue: "4661.02",
    cessAmount: "3.50",
    isAmendment: true,
  },
  // Amendment to INV002
 
   {
    gstin: "07AACCA1234F1Z5",
    receiverName: "XYZ Pvt Ltd",
    invoiceNumber: "INV002A",
    invoiceDate: "2025-07-12",
    originalInvoiceNumber: "INV002",
    originalInvoiceDate: "2025-07-05",
    invoiceValue: "12500.00",
    placeOfSupply: "Delhi",
    reverseCharge: "N",
    taxRate: "5%",
    invoiceType: "Amendment",
    ecommerceGstin: "",
    rate: "5",
    taxableValue: "11904.76",
    cessAmount: "1.25",
    isAmendment: true,
  },
   {
    gstin: "07AACCA1234F1Z5",
    receiverName: "XYZ Pvt Ltd",
    invoiceNumber: "INV002A",
    invoiceDate: "2025-07-12",
    originalInvoiceNumber: "INV002",
    originalInvoiceDate: "2025-07-05",
    invoiceValue: "12500.00",
    placeOfSupply: "Delhi",
    reverseCharge: "N",
    taxRate: "5%",
    invoiceType: "Amendment",
    ecommerceGstin: "",
    rate: "5",
    taxableValue: "11904.76",
    cessAmount: "1.25",
    isAmendment: true,
  },
   {
    gstin: "07AACCA1234F1Z5",
    receiverName: "XYZ Pvt Ltd",
    invoiceNumber: "INV002A",
    invoiceDate: "2025-07-12",
    originalInvoiceNumber: "INV002",
    originalInvoiceDate: "2025-07-05",
    invoiceValue: "12500.00",
    placeOfSupply: "Delhi",
    reverseCharge: "N",
    taxRate: "5%",
    invoiceType: "Amendment",
    ecommerceGstin: "",
    rate: "5",
    taxableValue: "11904.76",
    cessAmount: "1.25",
    isAmendment: true,
  },
];


const Summary = ({ filterType = "All" }) => {
  // Filter data based on the selected filter type
  const filteredData = useMemo(() => {
    if (filterType === "All") return dummyData;
    if (filterType === "REGULAR") return dummyData.filter(item => !item.isAmendment);
    if (filterType === "AMENDMENTS") return dummyData.filter(item => item.isAmendment);
    return dummyData;
  }, [filterType]);

  // Calculate summary values based on filtered data
  const summary = useMemo(() => {
    const recipientsSet = new Set();
    const invoicesSet = new Set();
    let totalInvoiceValue = 0;
    let totalTaxableValue = 0;
    let totalCess = 0;

    filteredData.forEach((entry) => {
      recipientsSet.add(entry.gstin);
      invoicesSet.add(entry.invoiceNumber);
      totalInvoiceValue += parseFloat(entry.invoiceValue || 0);
      totalTaxableValue += parseFloat(entry.taxableValue || 0);
      totalCess += parseFloat(entry.cessAmount || 0);
    });

    return {
      recipients: recipientsSet.size,
      invoices: invoicesSet.size,
      totalInvoiceValue: totalInvoiceValue.toFixed(2),
      totalTaxableValue: totalTaxableValue.toFixed(2),
      totalCess: totalCess.toFixed(2),
    };
  }, [filteredData]);

  return (
    <div className="container-fluid ">
      <div className="card shadow-sm">
        <div className="card-header p-3">
          <h5 className="mb-0">B2B, SEZ, DE (4A, 4B, 6B, 6C)</h5>
        </div>
        <div className="card-body table-responsive p-0">
       <div style={{ maxHeight: "400px", overflowY: "auto" }}>
  <table className="table table-bordered text-center align-middle mb-0">
    <thead style={{ backgroundColor: "#fbe4d5", position: "sticky", top: 0, zIndex: 1 }}>
      <tr>
        <th>GSTIN/UIN of Recipient</th>
        <th>Receiver Name</th>
        <th>Invoice Number</th>
        <th>Invoice Date</th>
        <th>Invoice Value</th>
        <th>Place Of Supply</th>
        <th>Reverse Charge</th>
        <th>Applicable % of Tax Rate</th>
        <th>Invoice Type</th>
        <th>E-Commerce GSTIN</th>
        <th>Rate</th>
        <th>Taxable Value</th>
        <th>Cess Amount</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {filteredData.map((row, idx) => (
        <tr key={idx}>
          <td>{row.gstin}</td>
          <td>{row.receiverName}</td>
          <td>
            {row.isAmendment ? (
              <>
                {row.invoiceNumber} (Amends {row.originalInvoiceNumber})
              </>
            ) : (
              row.invoiceNumber
            )}
          </td>
          <td>{row.invoiceDate}</td>
          <td>{row.invoiceValue}</td>
          <td>{row.placeOfSupply}</td>
          <td>{row.reverseCharge}</td>
          <td>{row.taxRate}</td>
          <td>{row.invoiceType}</td>
          <td>{row.ecommerceGstin}</td>
          <td>{row.rate}</td>
          <td>{row.taxableValue}</td>
          <td>{row.cessAmount}</td>
        <td>
  <div className="d-flex justify-content-centerflex-wrap gap-2">
    <TableActionButton
      icon={FaPencilAlt}
      type="edit"
      title="Edit"
      onClick={() => handleEdit(idx)}
    />
    <TableActionButton
      icon={FaTrash}
      type="delete"
      title="Delete"
      onClick={() => handleDelete(idx)}
    />
  </div>
</td>


        </tr>
      ))}
    </tbody>
  </table>
</div>

        </div>

      <div className="p-3 border-top bg-light rounded">
  <div className="row text-center fw-semibold small">
    {/* Row 1 */}
    <div className="col-md-4 mb-2">
      Taxable Value | <span className="fw-bold">{summary.totalTaxableValue || "000"}</span>
    </div>
    <div className="col-md-4 mb-2">
      IGST | <span className="fw-bold">{summary.igst || "000"}</span>
    </div>
    <div className="col-md-4 mb-2">
      CGST | <span className="fw-bold">{summary.cgst || "000"}</span>
    </div>

    {/* Row 2 */}
    <div className="col-md-4 mb-2">
      SGST | <span className="fw-bold">{summary.sgst || "000"}</span>
    </div>
    <div className="col-md-4 mb-2">
      CESS | <span className="fw-bold">{summary.totalCess || "000"}</span>
    </div>
    <div className="col-md-4 mb-2">
      Invoice Value | <span className="fw-bold">{summary.totalInvoiceValue || "000"}</span>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default Summary;
