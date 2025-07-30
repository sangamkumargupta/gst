import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";
import { FaTimesCircle, FaTelegramPlane } from "react-icons/fa";
import * as XLSX from "xlsx";

const ExportModal = ({ show, handleClose }) => {
  const [selectedFormat, setSelectedFormat] = useState("Select format");
  const [filingType, setFilingType] = useState("Quarterly");
  const [formType, setFormType] = useState("");
  const [year, setYear] = useState("2022-2023");
  const [period, setPeriod] = useState("");
  const modalRef = useRef(null);
  const bsModalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      if (show) {
        bsModalRef.current = new bootstrap.Modal(modalRef.current, {
          backdrop: "static",
          keyboard: false,
        });
        bsModalRef.current.show();
      } else {
        bsModalRef.current?.hide();
      }

      const handleHidden = () => {
        handleClose();
      };

      modalRef.current.addEventListener("hidden.bs.modal", handleHidden);

      return () => {
        modalRef.current?.removeEventListener("hidden.bs.modal", handleHidden);
      };
    }
  }, [show]);

  const getPeriodOptions = () => {
    switch (filingType) {
      case "Quarterly":
        return [
          "April - June (Q1)",
          "July - September (Q2)",
          "October - December (Q3)",
          "January - March (Q4)",
        ];
      case "Monthly":
        return [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
      case "Half Yearly":
        return ["April - September (H1)", "October - March (H2)"];
      case "Yearly":
        return ["Full Year"];
      default:
        return [];
    }
  };

  const handleProceed = () => {
    if (
      selectedFormat === "Select format" ||
      formType === "" ||
      period === ""
    ) {
      alert("Please select all required fields.");
      return;
    }

    const data = [
      {
        Company: "GODAWARI CONSTRUCTION COMPANY",
        ReturnForm: formType,
        Year: year,
        FilingType: filingType,
        Period: period,
        Format: selectedFormat,
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "GST Export");

    XLSX.writeFile(workbook, `GST_${formType}_${period}.xlsx`);
    bsModalRef.current?.hide();
  };

  return (
    <div className="modal fade" ref={modalRef} tabIndex="-1" aria-hidden="true">
      <div
        className="modal-dialog mt-5 modal-lg modal-dialog-scrollable"
        style={{ maxWidth: "700px" }}
      >
        <div className="modal-content  modal-container rounded-3  p-3 rounded-3">
          <div className="modal-header">
            <h5 className="modal-title w-100 text-center">Excel Export</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body mt-3">
            <div className="container-fluid">
              <div className="row g-3">
                <div className="col-12 col-md-8">
                  <input
                    type="text"
                    className="form-control"
                    value="GODAWARI CONSTRUCTION COMPANY"
                    disabled
                  />
                </div>
                <div className="col-12 col-md-4">
                  <select
                    className="form-select"
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                  >
                    <option disabled value="">
                      Select Form
                    </option>
                    <option>GSTR-1</option>
                    <option>GSTR-3B</option>
                    <option>GSTR-2A</option>
                    <option>GSTR-2B</option>
                  </select>
                </div>
              </div>

              <div className="row g-2 mt-2">
                <div className="col-6 col-md-3">
                  <select
                    className="form-select"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    <option>2022-2023</option>
                    <option>2021-2022</option>
                  </select>
                </div>
                <div className="col-6 col-md-3">
                  <select
                    className="form-select"
                    value={filingType}
                    onChange={(e) => setFilingType(e.target.value)}
                  >
                    <option disabled>Select Type</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Half Yearly">Half Yearly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
                <div className="col-6 col-md-3">
                  <select
                    className="form-select"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                  >
                    <option disabled value="">
                      Select
                    </option>
                    {getPeriodOptions().map((p, i) => (
                      <option key={i} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-6 col-md-3">
                  <select
                    className="form-select"
                    value={selectedFormat}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                  >
                    <option disabled value="Select format">
                      Select format
                    </option>
                    <option value="Government Excel">Government Excel</option>
                    <option value="ATL Excel">ATL Excel</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer border-0 pt-0">
            <button
              type="button"
              className="btn redbtn"
              onClick={() => bsModalRef.current?.hide()}
            >
              CLOSE <FaTimesCircle />
            </button>
            <button
              type="button"
              className="btn greenbtn"
              onClick={handleProceed}
            >
              PROCEED <FaTelegramPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
