import React, { useEffect, useRef, useState, useMemo } from "react";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/Challan.css";

const Challan = ({ show, onClose }) => {
  const [reason, setReason] = useState("monthly");
  const [monthlyOption, setMonthlyOption] = useState("35percent");
  const [state, setState] = useState("Rajasthan");
  const [paymentMethod, setPaymentMethod] = useState("epayment");
  const [bank, setBank] = useState("");
  const [taxValues, setTaxValues] = useState({
    IGST: [1, 0, 0, 0, 0],
    CGST: [0, 0, 0, 0, 0],
    SGST: [0, 0, 0, 0, 0],
    CESS: [0, 0, 0, 0, 0],
  });

  const taxes = ["IGST", "CGST", "SGST", "CESS"];
  const fields = ["TAX", "INTEREST", "PENALTY", "FEES", "OTHERS", "TOTAL"];
  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const banks = [
    "AXIS BANK",
    "BANK OF BARODA",
    "BANK OF INDIA",
    "BANK OF JAMMU & KASHMIR",
    "CANARA BANK",
    "CENTRAL BANK OF INDIA",
    "HDFC BANK",
    "ICICI BANK LIMITED",
    "IDBI BANK",
    "INDIAN BANK",
    "INDIAN OVERSEAS BANK",
    "JAMMU AND KASHMIR BANK LIMITED",
    "PUNJAB AND SIND BANK",
    "PUNJAB NATIONAL BANK",
    "STATE BANK OF INDIA",
    "UCO BANK",
    "UNION BANK OF INDIA",
  ];

  const handleTaxChange = (tax, index, value) => {
    const newTaxValues = { ...taxValues };
    newTaxValues[tax][index] = parseFloat(value || 0);
    setTaxValues(newTaxValues);
  };

  const totals = useMemo(() => {
    const calculated = {};
    Object.keys(taxValues).forEach((tax) => {
      calculated[tax] = taxValues[tax].reduce(
        (a, b) => a + parseFloat(b || 0),
        0
      );
    });
    return calculated;
  }, [taxValues]);

  const grandTotal = useMemo(() => {
    return Object.values(totals).reduce((a, b) => a + b, 0);
  }, [totals]);

  const numberToWords = (num) => {
    if (num === 0) return "ZERO";
    if (num === 1) return "ONE";
    return num.toFixed(2);
  };

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
        onClose();
      };

      const modalEl = modalRef.current;
      modalEl.addEventListener("hidden.bs.modal", handleHidden);
      return () => {
        modalEl.removeEventListener("hidden.bs.modal", handleHidden);
      };
    }
  }, [show, onClose]);

  return (
    <div className="modal fade" ref={modalRef} tabIndex="-1">
      <div className="modal-dialog rounded-3 challan-modal modal-dialog-centered modal-fullscreen-sm-down mt-3">
        <div className="modal-content modal-container rounded-3 px-4 py-3 bg-light">
          <div className="challan-header text-center">
            <h2>CREATE CHALLAN</h2>
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
            <div className="table-responsive p-4">
              <div className="challan-wrapper">
                <div className="challan-container">
                  <div>
                    <div className="label pb-3">REASON FOR CHALLAN</div>
                    <label>
                      <input
                        type="radio"
                        name="reason"
                        value="monthly"
                        checked={reason === "monthly"}
                        onChange={() => setReason("monthly")}
                      />{" "}
                      Monthly payment
                    </label>
                    &nbsp;&nbsp;
                    <label>
                      <input
                        type="radio"
                        name="reason"
                        value="other"
                        checked={reason === "other"}
                        onChange={() => setReason("other")}
                      />{" "}
                      Any other payment
                    </label>
                  </div>

                  {reason === "monthly" && (
                    <div className="pt-3">
                      <div className="label pb-2">SELECT PAYMENT TYPE</div>
                      <label>
                        <input
                          type="radio"
                          name="monthlyType"
                          value="35percent"
                          checked={monthlyOption === "35percent"}
                          onChange={() => setMonthlyOption("35percent")}
                        />{" "}
                        35% of Challan
                      </label>
                      &nbsp;&nbsp;
                      <label>
                        <input
                          type="radio"
                          name="monthlyType"
                          value="self"
                          checked={monthlyOption === "self"}
                          onChange={() => setMonthlyOption("self")}
                        />{" "}
                        Self-assessment basis
                      </label>
                    </div>
                  )}

                  <div>
                    <span className="label">STATE</span>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      {states.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="code-display">
                    CODE : <strong>0006</strong>
                  </div>
                </div>

                {(reason === "other" ||
                  (reason === "monthly" && monthlyOption === "self")) && (
                  <>
                    <div className="table-grid">
                      <div className="table-grid-header">
                        <div></div>
                        {fields.slice(0, 5).map((field) => (
                          <div key={field}>{field}</div>
                        ))}
                        <div>{fields[5]}</div>
                      </div>

                      {taxes.map((tax) => (
                        <div key={tax} className="table-grid-row">
                          <div>{tax} (₹)</div>
                          {[...Array(5)].map((_, idx) => (
                            <input
                              key={idx}
                              type="number"
                              placeholder="0.00"
                              value={taxValues[tax][idx]}
                              onChange={(e) =>
                                handleTaxChange(tax, idx, e.target.value)
                              }
                            />
                          ))}
                          <input
                            type="number"
                            value={totals[tax].toFixed(2)}
                            readOnly
                          />
                        </div>
                      ))}
                    </div>

                    <div className="total-row">
                      <div>TOTAL CHALLAN (₹)</div>
                      <input
                        type="text"
                        readOnly
                        value={grandTotal.toFixed(2)}
                      />
                      <div>{numberToWords(grandTotal)} ONLY</div>
                    </div>
                  </>
                )}

                {grandTotal > 0 && (
                  <div className="payment-section">
                    <div className="payment-options">
                      <div>PAYMENT OPTIONS</div>
                      <br />
                      <div className="d-flex">
                        <label>
                          <input
                            type="radio"
                            name="payment"
                            value="epayment"
                            checked={paymentMethod === "epayment"}
                            onChange={() => setPaymentMethod("epayment")}
                          />{" "}
                          E-PAYMENT
                        </label>
                        &nbsp;&nbsp;
                        <label>
                          <input
                            type="radio"
                            name="payment"
                            value="otc"
                            checked={paymentMethod === "otc"}
                            onChange={() => setPaymentMethod("otc")}
                          />{" "}
                          OVER THE COUNTER
                        </label>
                        &nbsp;&nbsp;
                        <label>
                          <input
                            type="radio"
                            name="payment"
                            value="neft"
                            checked={paymentMethod === "neft"}
                            onChange={() => setPaymentMethod("neft")}
                          />{" "}
                          NEFT / RTGS
                        </label>
                      </div>
                    </div>

                    <div className="bank-section">
                      <label>BANK NAME</label>
                      <select
                        className="bank-select"
                        value={bank}
                        onChange={(e) => setBank(e.target.value)}
                      >
                        <option value="">SELECT BANK NAME</option>
                        {banks.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>

                      <label className="terms-checkbox">
                        <input type="checkbox" required /> Terms and Conditions
                        apply.
                      </label>

                      <div>
                        <button className="pay-button">
                          PAY ₹ {grandTotal.toFixed(2)}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              className="btn redbtn btn-sm"
              onClick={() => bsModalRef.current?.hide()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challan;
