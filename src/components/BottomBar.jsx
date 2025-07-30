import "../assets/css/BottomBar.css";
import ExportModal from "../components/ExportModal";
import ImportModal from "../components/ImportModal";
import Compare3B from "../components/Compare3B";
import React, { Children, useState } from "react";
import { useNavigate } from "react-router-dom";
import Challan from "../screen/admin/Challan";
import Receiver from "./Receiver";
import Footer from "./Footer";
import CommonModel from "./CommonModel";
const BottomBar = ({ tab, onExport }) => {
  const navigate = useNavigate();

  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showCompare3BModal, setShowCompare3BModal] = useState(false);

  const handleShow = () => setShowExportModal(true);
  const handleClose = () => setShowExportModal(false);

  const handleShowImport = () => setShowImportModal(true);
  const handleCloseImport = () => setShowImportModal(false);

  const handleShowCompare3B = () => setShowCompare3BModal(true);
  const handleCloseCompare3B = () => setShowCompare3BModal(false);

  const [showChallanModal, setShowChallanModal] = useState(false);
  const handleShowChallanModal = () => setShowChallanModal(true);
  const handleCloseChallanModal = () => setShowChallanModal(false);

  const handleReload = () => window.location.reload();
  const handleGoBack = () => navigate(-1);
  const handleHome = () => navigate("/dashboard/home");
  const handleClientListClick = () => navigate("/dashboard/myclients");

  const [showReceiverModal, setShowReceiverModal] = useState(false);
  const handleShowReceiverModal = () => setShowReceiverModal(true);
  const handleCloseReceiverModal = () => setShowReceiverModal(false);

  return (
    <>
      <div className="btn-bar">
        {/* <div><strong>{tab}</strong></div> */}

        {/* MyClients Buttons */}
        {tab === "MyClients" && (
          <>
            <div className="btn-item">
              <button className="btn btn-primary btn-sm" onClick={handleShow}>
                <i className="fas fa-file-export"></i> Export
              </button>
            </div>
            <div className="btn-item">
              <button className="btn btn-primary btn-sm" onClick={handleHome}>
                <i className="fas fa-home"></i> Home
              </button>
            </div>
            <div className="btn-item">
              <button className="btn btn-primary btn-sm" onClick={handleHome}>
                <i className="fas fa-home"></i> Back
              </button>
            </div>
            <div className="btn-item">
              <button className="btn btn-primary btn-sm">
                <i className="fas fa-plus-circle"></i> Add by GSTIN
              </button>
            </div>
            {/* <div className="btn-item">
              <button className="btn btn-primary btn-sm">
                <i className="fas fa-user-plus"></i> New Client
              </button>
            </div> */}
          </>
        )}

        {/* GSTR-01 Buttons */}
        {tab === "GSTR-01" && (
          <>
            <div className="btn-item">
              <button className="btn btn-warning btn-sm" onClick={handleReload}>
                ↻
              </button>
            </div>
            {/* <div className="btn-item">
              <button
                className="btn btn-primary btn-sm d-flex"
                onClick={handleClientListClick}
              >
                <i className="fas fa-table-list text-white"></i>{" "}
                <span className="text-white">Client List</span>
              </button>
            </div> */}
            <div className="btn-item">
              <button className="btn btn-primary btn-sm d-flex">
                JSON <i className="fas fa-caret-down ms-1"></i>
              </button>
            </div>
            <div className="btn-item">
              <button
                className="btn btn-primary btn-sm d-flex"
                onClick={handleShowCompare3B}
              >
                <i className="fas fa-code-compare"></i> Compare with{" "}
                <span className="badge  text-dark ms-1">3B</span>
              </button>
            </div>
            {/*  */}
            <div className="btn-item">
              <button
                className="btn btn-primary btn-sm d-flex"
                onClick={handleShowReceiverModal}
              >
                <i className="fas fa-handshake"></i> Receiver
              </button>
            </div>

            {/* <div className="btn-item">
              <button className="btn btn-primary btn-sm d-flex">
                <i className="fas fa-user"></i> Receiver
              </button>
            </div> */}
            <div className="btn-item">
              <button
                className="btn btn-primary btn-sm d-flex"
                onClick={handleShowImport}
              >
                <i className="fas fa-cloud-arrow-up"></i> Import
              </button>
            </div>
            <div className="btn-item">
              <button
                className="btn btn-primary btn-sm d-flex"
                onClick={handleShow}
              >
                <i className="fas fa-file-export"></i> Export
              </button>
            </div>
            <div className="btn-item">
              <button className="btn btn-primary btn-sm d-flex">
                <i className="fas fa-download"></i> Download
              </button>
            </div>
            <div className="btn-item">
              <button className="btn btn-primary btn-sm d-flex">
                <i className="fas fa-cloud-upload-alt"></i> E-file
              </button>
            </div>
            <div className="btn-item dropdown">
              <button
                className="btn btn-primary btn-sm d-flex dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                <i className="fa-solid fa-globe"></i>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Help
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}

        {/* GSTR-3B Buttons */}
        {tab === "GSTR-3B" && (
          <>
            <div className="btn-item">
              <button className="btn btn-warning btn-sm" onClick={handleReload}>
                ↻
              </button>
            </div>
            {/* <div className="btn-item">
              <button
                className="btn btn-primary btn-sm d-flex"
                onClick={handleClientListClick}
              >
                <i className="fas fa-table-list text-white"></i> Client List
              </button>
            </div> */}
            <div className="btn-item">
              <button className="btn btn-primary btn-sm" onClick={handleShow}>
                <i className="fas fa-file-export"></i> Export
              </button>
            </div>
            <div className="btn-item">
              <button
                onClick={handleShowChallanModal}
                className="btn btn-primary"
              >
                <i className="fas fa-file-invoice-dollar"></i> Challan
              </button>
            </div>

            <div className="btn-item">
              <button
                className="btn btn-primary btn-sm d-flex"
                onClick={handleShowCompare3B}
              >
                <i className="fas fa-code-compare"></i> Compare with R1
              </button>
            </div>
            <div className="btn-item">
              <button className="btn btn-primary btn-sm d-flex">
                <i className="fas fa-download"></i> Download
              </button>
            </div>
            <div className="btn-item">
              <button className="btn btn-primary btn-sm d-flex">
                <i className="fas fa-save"></i> Save
              </button>
            </div>
            <div className="btn-item">
              <button className="btn btn-primary btn-sm d-flex">
                <i className="fas fa-cloud-upload-alt"></i> E-file
              </button>
            </div>
            <div className="btn-item dropdown">
              <button
                className="btn btn-primary btn-sm d-flex dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                <i className="fa-solid fa-globe"></i>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Help
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}

        {/* CMP-08 Buttons */}
        {tab === "CMP-08" && (
          <>
            <div className="btn-item">
              <button className="btn btn-warning btn-sm" onClick={handleReload}>
                ↻
              </button>
            </div>
            {/*  */}
            <div className="btn-item">
              <button className="btn btn-primary btn-sm" onClick={handleShow}>
                <i className="fas fa-file-export"></i> Export
              </button>
            </div>
            <div className="btn-item">
              <button className="btn btn-primary btn-sm">
                <i className="fas fa-wallet"></i> Get Balance
              </button>
            </div>
            <div className="btn-item">
              <button className="btn btn-primary btn-sm" onClick={handleShowChallanModal}>
                <i className="fas fa-file-invoice"></i> Create Challan
              </button>
            </div>
            <div className="btn-item">
              <button className="btn btn-primary btn-sm">
                <i className="fas fa-download"></i> Download
              </button>
            </div>
            <div className="btn-item">
              <button className="btn btn-primary btn-sm">
                <i className="fas fa-save"></i> Save
              </button>
            </div>
            <div className="btn-item">
              <button className="btn btn-primary btn-sm">
                <i className="fas fa-cloud-upload-alt"></i> E-file
              </button>
            </div>
          </>
        )}

        {tab === "GSTR-2A" && (
          <>
            <div className="btn-item">
              <button className="btn btn-primary btn-sm" onClick={handleShow}>
                <i className="fas fa-file-export"></i> Export
              </button>
            </div>

            <div className="btn-item">
              <button className="btn btn-primary btn-sm">
                <i className="fas fa-exchange-alt"></i> Compare
              </button>
            </div>
            <div className="btn-item">
              <button className="btn btn-primary btn-sm">
                <i className="fas fa-download"></i> Download
              </button>
            </div>
            <div className="btn-item">
              <button className="btn btn-primary btn-sm">
                <i className="fas fa-cloud-upload-alt"></i> E-file
              </button>
            </div>
          </>
        )}

        {tab === "GSTR-4A" && (
          <>
            <div className="btn-item">
              <button className="btn btn-primary btn-sm" onClick={onExport}>
                <i className="fas fa-file-export"></i> Export
              </button>
            </div>

            <div className="btn-item">
              <button className="btn btn-primary btn-sm">
                <i className="fas fa-exchange-alt"></i> Compare
              </button>
            </div>
            <div className="btn-item">
              <button className="btn btn-primary btn-sm">
                <i className="fas fa-download"></i> Download
              </button>
            </div>
            {/* <div className="btn-item">
              <button className="btn btn-primary btn-sm">
                <i className="fas fa-cloud-upload-alt"></i> E-file
              </button>
            </div> */}
          </>
        )}
      </div>

      {/* Modals */}
      <ExportModal show={showExportModal} handleClose={handleClose} />
      <ImportModal show={showImportModal} handleClose={handleCloseImport} />
      <Compare3B show={showCompare3BModal} handleClose={handleCloseCompare3B} />
      <Receiver
        show={showReceiverModal}
        handleClose={handleCloseReceiverModal}
      />
      <Challan show={showChallanModal} onClose={handleCloseChallanModal} />
    </>
  );
};

export default BottomBar;
