import { useRef, useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTimes, FaTrash } from "react-icons/fa"; // Import needed icons// Ensure Bootstrap JS is loaded globally (via <script> or import)

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/css/GSTR3B.css";
import { Modal, Button } from "react-bootstrap";

const GSTR3B = () => {
  const [editIndex, setEditIndex] = useState(null); // null = add mode
  const modalRef = useRef(null);
  const modalInstanceRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      modalInstanceRef.current = new bootstrap.Modal(modalRef.current, {
        backdrop: "static",
        keyboard: true,
      });
    }
  }, []);

  // 3.1 Outward Supplies data (editable)
  const [outwardData, setOutwardData] = useState([
    {
      title:
        "A) Outward taxable supplies (Other than zero rated, nil rated and exempted)",
      values: ["0.00", "0.00", "0.00", "0.00", "0.00"],
    },
    {
      title: "B) Outward taxable supplies (Zero rated)",
      values: ["0.00", "0.00", "0.00", "0.00", "0.00"],
    },
    {
      title: "C) Other outward supplies (Nil rated, exempted)",
      values: ["0.00", "0.00", "0.00", "0.00", "0.00"],
    },
    {
      title: "D) Inward supplies (Reverse Charge)",
      values: ["0.00", "0.00", "0.00", "0.00", "0.00"],
    },
    {
      title: "E) Non GST Outward supplies",
      values: ["0.00", "0.00", "0.00", "0.00", "0.00"],
    },
  ]);

  // 3.1.1 E-commerce Supplies (editable)
  const [ecommerceData, setEcommerceData] = useState([
    {
      title: "A) Supplies where e-com operator pays tax u/s 9(5)",
      values: ["0.00", "0.00", "0.00", "0.00", "0.00"],
    },
    {
      title: "B) Supplies made by registered person through e-com operator",
      values: ["0.00", "0.00", "0.00", "0.00", "0.00"],
    },
  ]);

  const supplyTypes = [
    "Supplies made to Unregistered Persons",
    "Supplies made to Composition Taxable Persons",
    "Supplies made to UIN holders",
  ];
  const placesOfSupply = [
    "Andhra Pradesh",
    "Gujarat",
    "Karnataka",
    "Maharashtra",
    "Tamil Nadu",
    "West Bengal",
  ];

  const [interStateRows, setInterStateRows] = useState([]);
  const [formData, setFormData] = useState({
    type: "",
    place: "",
    taxableValue: "",
    igst: "",
  });

  const handleOutwardChange = (rowIdx, valIdx, value) => {
    const updated = [...outwardData];
    updated[rowIdx].values[valIdx] = value;
    setOutwardData(updated);
  };

  // Updated logic: Only specific cells are grey
  const isOutwardGreyBox = (rowIdx, colIdx) => {
    // (b) row: index 1 → grey only Central Tax (2), State/UT Tax (3)
    if (rowIdx === 1 && (colIdx === 2 || colIdx === 3)) return true;

    // (c) and (e) rows: index 2 and 4 → grey columns 1 to 4
    if ((rowIdx === 2 || rowIdx === 4) && colIdx >= 1 && colIdx <= 4)
      return true;

    return false;
  };

  const handleEcommerceChange = (rowIdx, valIdx, value) => {
    const updated = [...ecommerceData];
    updated[rowIdx].values[valIdx] = value;
    setEcommerceData(updated);
  };

  // Disable certain fields based on row and column
  const isEcommerceGreyBoxes = (rowIdx, colIdx) => {
    // Row 2 (index 1) → Disable CGST (2), SGST (3), CESS (4)
    return rowIdx === 1 && colIdx >= 1;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddItem = () => {
    const { type, place, taxableValue, igst } = formData;

    // Validate required fields
    if (!type || !place || !taxableValue || !igst) {
      toast.error("Please fill all fields before adding.");
      return;
    }

    if (editIndex !== null) {
      // Update existing row
      const updated = [...interStateRows];
      updated[editIndex] = formData;
      setInterStateRows(updated);
      setEditIndex(null); // Exit edit mode
      toast.success("Item updated successfully!");
    } else {
      // Add new row
      setInterStateRows([...interStateRows, formData]);
      toast.success("Item added successfully!");
    }

    // Reset form
    setFormData({ type: "", place: "", taxableValue: "", igst: "" });

    // Optionally show modal again
    if (modalInstanceRef.current) {
      modalInstanceRef.current.show();
    }
  };

  const handleEdit = (index) => {
    const item = interStateRows[index];
    setFormData(item);
    setEditIndex(index); // Enter edit mode

    modalInstanceRef.current.hide();
  };

  const closeModal = () => {
    if (modalInstanceRef.current) {
      modalInstanceRef.current.hide();
    }
  };

  const handleDelete = (index) => {
    const updated = [...interStateRows];
    updated.splice(index, 1);
    setInterStateRows(updated);
    toast.info("Item deleted.");
  };

  const isElibibleGreyBoxess = (rowGroup, rowIdx, colIdx) => {
    // Section A: ITC Available
    if (
      rowGroup === "A" &&
      (rowIdx === 0 || rowIdx === 1) &&
      (colIdx === 1 || colIdx === 2)
    ) {
      return true;
    }
    return false;
  };
  return (
    <div className="container mt-4">
      {/* Status & Alert */}
      <div className="row ">
        <div className="col-md-8 flex-wrap gap-2 ">
          <button className="btn btn_redbtn  redbtn me-2  text-white ">
            STATUS: Not Available
          </button>
          <button className="btn purple_btnpurple me-2 ">DATE: --</button>
          <button className="btn purple_btnpurple">ARN: --</button>
        </div>
        <div className="col-md-4">
          <div className="alert alert-warning text-center p-2 mb-0  me-2 ">
            No Data found : No return data found for selected period.
          </div>
        </div>
      </div>

      {/* 3.1 Outward Supplies */}
      <div className="d-flex justify-content-between align-items-center mb-2 mt-4">
        <h5 className="text-primary fw-bold mb-0">3.1 Outward Supplies</h5>
        <button
          className="btn btn-sm btn-primary"
          // onClick={handleImportFromGSTR1} // define this function
        >
          Import from GSTR-1&nbsp;
          <i className="bi bi-box-arrow-up-right"></i> {/* Optional icon */}
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead className=" ">
            <tr>
              <th>Nature of Supplies</th>
              <th>Total Taxable Value (₹)</th>
              <th>Integrated Tax (₹)</th>
              <th>Central Tax (₹)</th>
              <th>State/UT Tax (₹)</th>
              <th>CESS (₹)</th>
            </tr>
          </thead>
          <tbody>
            {outwardData.map((row, rowIdx) => (
              <tr key={rowIdx}>
                <td className="text-start">{row.title}</td>
                {row.values.map((val, valIdx) => (
                  <td key={valIdx}>
                    <input
                      type="number"
                      className="form-control form-control-sm text-end"
                      style={
                        isOutwardGreyBox(rowIdx, valIdx)
                          ? { backgroundColor: "#f0f0f0" }
                          : {}
                      }
                      value={val}
                      onChange={(e) =>
                        handleOutwardChange(rowIdx, valIdx, e.target.value)
                      }
                      disabled={isOutwardGreyBox(rowIdx, valIdx)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3.1.1 E-commerce Supplies */}
      <h5 className="text-primary fw-bold mt-4 mb-2">
        3.1.1 Details of supplies under section 9(5)
      </h5>
      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead className="">
            <tr>
              <th className="mobile-th-width">Description</th>
              <th className="mobile-th-width">Total Taxable Value (₹)</th>
              <th className="mobile-th-width">Integrated Tax (₹)</th>
              <th className="mobile-th-width">Central Tax (₹)</th>
              <th className="mobile-th-width">State/UT Tax (₹)</th>
              <th className="mobile-th-width">CESS (₹)</th>
            </tr>
          </thead>
          <tbody>
            {ecommerceData.map((row, rowIdx) => (
              <tr key={rowIdx}>
                <td className="text-start">{row.title}</td>
                {row.values.map((val, valIdx) => (
                  <td key={valIdx}>
                    <input
                      type="number"
                      className="form-control text-end"
                      style={
                        isEcommerceGreyBoxes(rowIdx, valIdx)
                          ? { backgroundColor: "#f0f0f0" }
                          : {}
                      }
                      value={val}
                      onChange={(e) =>
                        handleEcommerceChange(rowIdx, valIdx, e.target.value)
                      }
                      disabled={isEcommerceGreyBoxes(rowIdx, valIdx)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3.2 Interstate Supplies */}
      <h5 className="text-primary fw-bold mt-4 mb-3">
        3.2 Interstate Supplies made to Unregistered persons
      </h5>
      <div className="row g-3 align-items-end">
        <div className="col-md-3 col-6">
          <label className="form-label">Nature of Supply</label>
          <select
            className="form-select"
            name="type"
            value={formData.type}
            onChange={handleFormChange}
          >
            <option value="">Select Supply Type</option>
            {supplyTypes.map((type, idx) => (
              <option key={idx}>{type}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3 col-6">
          <label className="form-label">Place of Supply</label>
          <select
            className="form-select"
            name="place"
            value={formData.place}
            onChange={handleFormChange}
          >
            <option value="">Select Place</option>
            {placesOfSupply.map((place, idx) => (
              <option key={idx}>{place}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3 col-6">
          <label className="form-label">Taxable Value</label>
          <input
            type="number"
            name="taxableValue"
            value={formData.taxableValue}
            onChange={handleFormChange}
            className="form-control"
            placeholder="0.00"
          />
        </div>
        <div className="col-md-2 col-6">
          <label className="form-label">IGST</label>
          <input
            type="number"
            name="igst"
            value={formData.igst}
            onChange={handleFormChange}
            className="form-control"
            placeholder="0.00"
          />
        </div>
        <div className="col-md-1 col-12 d-flex">
          <button onClick={handleAddItem} className="btn greenbtn d-flex ">
            {editIndex !== null ? (
              <>
                <FaEdit className=" mt-1 " />
              </>
            ) : (
              <>
                <FaPlus className=" mt-1 me-2" /> Add
              </>
            )}
          </button>
          &nbsp;
          {editIndex !== null && (
            <div className="col-12  ">
              <button
                onClick={() => {
                  setFormData({
                    type: "",
                    place: "",
                    taxableValue: "",
                    igst: "",
                  });
                  setEditIndex(null);
                }}
                className="btn redbtn "
              >
                <FaTimes className=" mt-1  " />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table for 3.2 Added Items */}
      {/* {interStateRows.length > 0 && (
        <div className="table-responsive mt-3">
          <table className="table table-bordered text-center align-middle">
            <thead className="">
              <tr>
                <th className="mobile-th-width">#</th>
                <th className="mobile-th-width">Nature of Supply</th>
                <th className="mobile-th-width">Place of Supply</th>
                <th className="mobile-th-width">Taxable Value</th>
                <th className="mobile-th-width">IGST</th>
                <th className="mobile-th-width">Action</th>
              </tr>
            </thead>
            <tbody>
              {interStateRows.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row.type}</td>
                  <td>{row.place}</td>
                  <td>{row.taxableValue}</td>
                  <td>{row.igst}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} */}
      {/* 4. Eligible ITC */}
      <h5 className="text-primary fw-bold mt-4 mb-3">4. Eligible ITC</h5>
      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead className="">
            <tr>
              <th>Details</th>
              <th>Integrated Tax (₹)</th>
              <th>Central Tax (₹)</th>
              <th>State/UT Tax (₹)</th>
              <th>CESS (₹)</th>
            </tr>
          </thead>
          <tbody>
            {/* (A) ITC Available */}
            <tr>
              <td colSpan="5" className="fw-bold text-start">
                (A) ITC Available (whether in full or part)
              </td>
            </tr>
            {[
              "Import of goods",
              "Import of services",
              "Inward supplies liable to reverse charge (other than 1 & 2 above)",
              "Inward supplies from ISD",
              "All other ITC",
            ].map((label, rowIdx) => (
              <tr key={`available-${rowIdx}`}>
                <td className="text-start">
                  ({rowIdx + 1}) {label}
                </td>
                {[...Array(4)].map((_, colIdx) => (
                  <td key={colIdx}>
                    <input
                      type="number"
                      className="form-control text-end"
                      placeholder="0.00"
                      disabled={isElibibleGreyBoxess("A", rowIdx, colIdx)}
                      style={
                        isElibibleGreyBoxess("A", rowIdx, colIdx)
                          ? { backgroundColor: "#f0f0f0" }
                          : {}
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}

            {/* (B) ITC Reversed */}
            <tr>
              <td colSpan="5" className="fw-bold text-start">
                (B) ITC Reversed
              </td>
            </tr>
            {[
              "As per rules 38, 42 & 43 of CGST Rules and section 17(5)",
              "Others",
            ].map((label, rowIdx) => (
              <tr key={`reversed-${rowIdx}`}>
                <td className="text-start">
                  ({rowIdx + 1}) {label}
                </td>
                {[...Array(4)].map((_, colIdx) => (
                  <td key={colIdx}>
                    <input
                      type="number"
                      className="form-control text-end"
                      placeholder="0.00"
                    />
                  </td>
                ))}
              </tr>
            ))}

            {/* (C) Net ITC */}
            <tr>
              <td className="fw-bold text-start">
                (C) Net ITC Available (A - B)
              </td>
              {[...Array(4)].map((_, colIdx) => (
                <td key={colIdx}>
                  <input
                    type="number"
                    className="form-control text-end"
                    placeholder="0.00"
                  />
                </td>
              ))}
            </tr>

            {/* (D) Other Details */}
            <tr>
              <td colSpan="5" className="fw-bold text-start">
                (D) Other Details
              </td>
            </tr>
            {[
              "ITC reclaimed which was reversed under Table 4(B)(2) in earlier tax period",
              "Ineligible ITC under section 16(4) & ITC restricted due to PoS rules",
            ].map((label, rowIdx) => (
              <tr key={`other-${rowIdx}`}>
                <td className="text-start">
                  ({rowIdx + 1}) {label}
                </td>
                {[...Array(4)].map((_, colIdx) => (
                  <td key={colIdx}>
                    <input
                      type="number"
                      className="form-control text-end"
                      placeholder="0.00"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* 5. Values of Exempt, Nil-rated and Non-GST Inward Supplies */}
      <h5 className="text-primary fw-bold mt-4 mb-3">
        5. Values of exempt, nil-rated and non-GST inward supplies
      </h5>
      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead className="">
            <tr>
              <th>Nature of Supplies</th>
              <th>Inter-State Supplies (₹)</th>
              <th>Intra-State Supplies (₹)</th>
            </tr>
          </thead>
          <tbody>
            {[
              "From a supplier under composition scheme, Exempt and Nil rated supply",
              "Non GST supply",
            ].map((label, idx) => (
              <tr key={`exempt-${idx}`}>
                <td className="text-start">{label}</td>
                {[...Array(2)].map((_, i) => (
                  <td key={i}>
                    <input
                      type="number"
                      className="form-control text-center"
                      placeholder="0.00"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* 5.1 Interest and Late Fee for Previous Tax Period */}
      <h5 className="text-primary fw-bold mt-5 mb-3">
        5.1 Interest and Late fee for previous tax period
      </h5>

      <div className="alert alert-info">
        <i className="bi bi-info-circle-fill me-2"></i>
        Declare interest payable on tax liabilities on supplies attracting
        reverse charge as well as other than reverse charge
      </div>

      <div className="alert alert-danger">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        Late fee for the month includes late fee charged due to delay in filing
        of previous month's GSTR-3B. The computation is based on the formula:
        <strong>
          {" "}
          [Date of Filing − Due date of Filing] × ₹25/day (in case of any
          liability) or ₹10/day (in case of nil liability)]{" "}
        </strong>{" "}
        per Act (CGST/SGST).
      </div>

      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="declareInterest"
          defaultChecked
        />
        <label className="form-check-label" htmlFor="declareInterest">
          Please select the check box if you wish to declare any Interest
          liabilities. Interest amounts declared here under respective heads
          need to be paid in cash in addition to tax liabilities for the month.
          <br />
          <strong>
            GSTR 3B can be filed only after complete payment of all liabilities.
          </strong>
        </label>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead className="">
            <tr>
              <th>Description</th>
              <th>Integrated Tax (₹)</th>
              <th>Central Tax (₹)</th>
              <th>State/UT Tax (₹)</th>
              <th>CESS (₹)</th>
            </tr>
          </thead>
          <tbody>
            {["Interest", "Late Fees"].map((desc, idx) => (
              <tr key={idx}>
                <td className="text-start">{desc}</td>
                {[...Array(4)].map((_, i) => (
                  <td key={i}>
                    <input
                      type="number"
                      className="form-control text-center"
                      placeholder="0.00"
                      disabled={desc === "Late Fees"}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <div className="d-flex gap-2 mt-3">
  <button className="btn btn_redbtn ">SYSTEM GENERATED GSTR-3B</button>
  <button className="btn btn_redbtn">CANCEL</button>
  <button className="btn greenbtn" disabled>CONFIRM</button>
  <button className="btn btnpurple" disabled>RE-COMPUTE INTEREST</button>
</div> */}
      {/* 6.1 Payment of Tax Section */}
      <h5 className="text-primary fw-bold mt-5 mb-3">6.1 Payment of Tax</h5>

      {/* Alert: No pending liability */}
      <div className="alert alert-info py-2">
        <strong>ℹ️</strong> No pending Liabilities to pay.
      </div>

      {/* Alert: Cash and ITC Info */}
      <div className="alert alert-info py-2">
        <strong>ℹ️</strong> The cash available as on date and ITC available
        (considering ITC of current tax period) are shown in this table.
      </div>

      {/* Payment Table */}
      <div style={{ overflowX: "auto", width: "100%" }}>
        <table
          className="table table-bordered text-center align-middle"
          style={{ minWidth: "1000px" }}
        >
          <thead className="">
            <tr>
              <th rowSpan="2">Description</th>
              <th colSpan="5">Cash Ledger Balance</th>
              <th colSpan="5">Credit Ledger (ITC)</th>
            </tr>
            <tr>
              <th>Integrated Tax (₹)</th>
              <th>Central Tax (₹)</th>
              <th>State/UT Tax (₹)</th>
              <th>CESS (₹)</th>
              <th>Total (₹)</th>
              <th>Integrated Tax (₹)</th>
              <th>Central Tax (₹)</th>
              <th>State/UT Tax (₹)</th>
              <th>CESS (₹)</th>
              <th>Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            {["Tax", "Interest", "Late Fees"].map((label, i) => (
              <tr key={i}>
                <td className="text-start">{label}</td>
                {[...Array(10)].map((_, j) => (
                  <td key={j}>
                    <input
                      type="number"
                      className="form-control text-center"
                      defaultValue="0.00"
                      disabled={label === "Late Fees" && j < 5}
                      style={{
                        minWidth: "80px",
                        padding: "0.25rem 0.5rem",
                        fontSize: "0.875rem",
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Info Notes */}
      <div className="alert alert-info small mt-3">
        <strong>ℹ️</strong> The net tax payable has been calculated after
        considering the available balance in negative liability statement.
        System has auto-populated “Tax to be paid through ITC” fields for net
        tax payable with optimum utilization amounts based on provisions of the
        law relating to credit utilization. However, you may edit the ITC
        utilization. As you change ITC utilization, the cash to be paid will
        also get changed. If available cash balance in Electronic cash ledger is
        not sufficient to offset the liabilities, additional cash required for
        paying liability is being reflected in the last column of the Table
        (Addition cash required). You may create challan for that amount
        directly by clicking on the “Create Challan” button
      </div>

      <div className="alert alert-info small">
        <strong>ℹ️</strong> The ITC and Cash utilization information entered
        will only be available for 2 days. After expiry of 2 days, the suggested
        utilization shall be reverted to original system suggested utilization.
      </div>
      <div style={{ overflowX: "auto", maxWidth: "100%" }}>
        <table
          className="table table-bordered text-center align-middle"
          style={{ minWidth: "1300px" }}
        >
          <thead className="">
            <tr>
              <th rowSpan="2">Description</th>
              <th colSpan="2">Net Tax Payable(₹)</th>
              <th colSpan="4">Paid through ITC</th>
              <th rowSpan="2">
                Other than reverse charge Tax to be paid in Cash(₹)
              </th>
              <th rowSpan="2">Reverse charge Tax to be paid in Cash(₹)</th>
              <th rowSpan="2">Interest payable (₹)</th>
              <th rowSpan="2">Interest to be paid in cash (₹)</th>
              <th rowSpan="2">Late Fee Payable (₹)</th>
              <th rowSpan="2">Late Fee to be paid in cash (₹)</th>
              <th rowSpan="2">Utilizable Cash balance(₹)</th>
              <th rowSpan="2">Additional Cash required(₹)</th>
            </tr>
            <tr>
              <th>Reverse charge u/s 9(5)</th>
              <th>Other than reverse charge</th>
              <th>Integrated Tax (₹)</th>
              <th>Central Tax (₹)</th>
              <th>State/UT Tax (₹)</th>
              <th>CESS (₹)</th>
            </tr>
          </thead>
          <tbody>
            {[
              "Integrated Tax (₹)",
              "Central Tax (₹)",
              "State/UT Tax (₹)",
              "CESS (₹)",
            ].map((label, rowIndex) => (
              <tr key={rowIndex}>
                <td className="text-start">{label}</td>
                {[...Array(14)].map((_, colIndex) => (
                  <td key={colIndex}>
                    <input
                      type="number"
                      className="form-control text-center"
                      style={{ minWidth: "80px" }}
                      defaultValue="0.00"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="modal fade" ref={modalRef} tabIndex="-1">
        <div className="modal-dialog challan-modal modal-dialog-centered modal-fullscreen-sm-down mt-3">
          <div className="modal-content  modal-container">
            <div className="challan-header text-center">
              <h2>3.2 Interstate Supplies</h2>
            </div>
            <div
              className="modal-body"
              style={{
                fontSize: "0.85rem",
                overflowX: "auto",
                maxHeight: "75vh",
                overflowY: "auto",
              }}
            >
              <div className="table-responsive">
                <table className="table table-bordered text-center align-middle">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nature of Supply</th>
                      <th>Place of Supply</th>
                      <th>Taxable Value</th>
                      <th>IGST</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {interStateRows.map((row, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{row.type}</td>
                        <td>{row.place}</td>
                        <td>{row.taxableValue}</td>
                        <td>{row.igst}</td>
                        <td>
                          {/* <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(index)}
                          >
                            Delete
                          </button> */}
                          <button
                            className="btn btn-sm greenbtn me-1"
                            onClick={() => handleEdit(index)}
                          >
                            <FaEdit className="me-2" />
                          </button>
                          <button
                            className="btn btn-sm redbtn"
                            onClick={() => handleDelete(index)}
                          >
                            <FaTrash className="me-2" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </div>
  );
};

export default GSTR3B;
