import React, { useEffect, useRef, useState } from "react";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginModal from "../components/LoginModal"; // Make sure this path is correct


const Receiver = ({ show, handleClose, receivers = [] }) => {
  const modalRef = useRef(null);
  const bsModalRef = useRef(null);
  const [activeTab, setActiveTab] = useState("list"); // 'list' or 'form'
  const [showLogin, setShowLogin] = useState(false);

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

      const handleHidden = () => handleClose();
      modalRef.current.addEventListener("hidden.bs.modal", handleHidden);

      return () => {
        modalRef.current?.removeEventListener("hidden.bs.modal", handleHidden);
      };
    }
  }, [show]);

  return (
    <>
      <div className="modal fade" ref={modalRef} tabIndex="-1">
        <div
          className="modal-dialog modal-dialog-centered"
          style={{ maxWidth: "90vw", width: "90vw" }}
        >
          <div className="modal-content  modal-container ">
            {/* Tab Navigation */}
            <div
              style={{
                background: "#fff",
                padding: "8px 16px",
                borderBottom: "1px solid #dee2e6",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setActiveTab("list")}
                  style={{
                    padding: "6px 14px",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                    border: "none",
                    outline: "none",
                    background: activeTab === "list" ? "#f4f2ff" : "#fff",
                    color: activeTab === "list" ? "#6f42c1" : "#333",
                    borderRight: "1px solid #ddd",
                    minWidth: "140px",
                    textAlign: "center",
                    boxShadow: activeTab === "list" ? "inset 0 -3px 0 #6f42c1" : "none",
                  }}
                >
                  <i className="fas fa-table me-1"></i> Receiver List
                </button>

                <button
                  onClick={() => setActiveTab("form")}
                  style={{
                    padding: "6px 14px",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                    border: "none",
                    outline: "none",
                    background: activeTab === "form" ? "#f4f2ff" : "#fff",
                    color: activeTab === "form" ? "#6f42c1" : "#333",
                    minWidth: "140px",
                    textAlign: "center",
                    boxShadow: activeTab === "form" ? "inset 0 -3px 0 #6f42c1" : "none",
                  }}
                >
                  <i className="fas fa-plus me-1"></i> Add Receiver
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div
              className="modal-body"
              style={{
                fontSize: "0.85rem",
                overflowX: "auto",
                maxHeight: "75vh",
                overflowY: "auto",
              }}
            >
              {/* List View */}
              {activeTab === "list" && (
                <div className="table-responsive p-4">
                  <table className="table table-bordered table-sm text-center align-middle btnpurple">
                    <thead className="table-secondary">
                      <tr>
                        <th>No.</th>
                        <th>Receiver Name</th>
                        <th>GSTIN</th>
                        <th>Country</th>
                        <th>State</th>
                        <th>E-Mail</th>
                        <th>Contact</th>
                        <th>Show/Hide</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {receivers.map((receiver, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{receiver.name}</td>
                          <td>{receiver.gstin}</td>
                          <td>{receiver.country}</td>
                          <td>{receiver.state}</td>
                          <td>{receiver.email}</td>
                          <td>{receiver.contact}</td>
                          <td>
                            <i className="fas fa-eye-slash"></i>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-1">
                              <i className="fas fa-pen"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-danger">
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Form View */}
              {activeTab === "form" && (
                <div className="p-4">
                  <form>
                    <div className="row mb-2">
                      <div className="col-md-6">
                        <label className="form-label">* Receiver Name</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">* GSTIN</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>

                    <div className="mb-2">
                      <label className="form-label">* Address</label>
                      <textarea className="form-control" rows={2}></textarea>
                    </div>

                    <div className="row mb-2">
                      <div className="col-md-4">
                        <label className="form-label">* Country</label>
                        <select className="form-select">
                          <option>India</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">* State</label>
                        <select className="form-select">
                          <option>Select State</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">* City</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>

                    <div className="row mb-2">
                      <div className="col-md-4">
                        <label className="form-label">* Pin Code</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">* E-mail</label>
                        <input type="email" className="form-control" />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">* Mobile Number</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <div>
                        <input type="checkbox" id="ecomm" />
                        <label htmlFor="ecomm" className="ms-1">
                          E-comm Transaction
                        </label>
                      </div>
                      <button type="button" className="btn btn-sm btn-primary">
                        <i className="fas fa-upload me-1"></i> Import
                      </button>
                    </div>

                    <div className="mt-4">
                      <button type="button" className="btn btn-outline-dark btn-sm me-2">
                        New
                      </button>
                      <button
                        type="button"
                        className="btn btnpurple btn-sm me-2"
                        
                      >
                        Save
                      </button>
                      <button type="button" className="btn greenbtn btn-sm me-2 text-white" onClick={() => setShowLogin(true)}>
                        Update
                      </button>
                      <button type="button" className="btn redbtn btn-sm">
                        Reset
                      </button>
                    </div>
                  </form>
                </div>
              )}
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

      {/* Login Modal Triggered on Save */}
      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
    </>
  );
};

export default Receiver;