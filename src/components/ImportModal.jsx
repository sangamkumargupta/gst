import React, { useEffect, useRef, useState } from "react";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCloudUploadAlt } from "react-icons/fa";
const ImportModal = ({ show, handleClose }) => {
  const modalRef = useRef(null);
  const bsModal = useRef(null);
  const dropAreaRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (modalRef.current) {
      bsModal.current = new bootstrap.Modal(modalRef.current, {
        backdrop: "static",
        keyboard: false,
      });

      if (show) {
        bsModal.current.show();
      } else {
        bsModal.current.hide();
      }

      modalRef.current.addEventListener("hidden.bs.modal", handleClose);
    }

    return () => {
      if (modalRef.current) {
        modalRef.current.removeEventListener("hidden.bs.modal", handleClose);
      }
    };
  }, [show]);

  // Drag and Drop handlers
  useEffect(() => {
    const dropArea = dropAreaRef.current;

    const handleDragOver = (e) => {
      e.preventDefault();
      dropArea.classList.add("border-primary");
    };

    const handleDragLeave = () => {
      dropArea.classList.remove("border-primary");
    };

    const handleDrop = (e) => {
      e.preventDefault();
      dropArea.classList.remove("border-primary");

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        setSelectedFile(file);
        e.dataTransfer.clearData();
      }
    };

    if (dropArea) {
      dropArea.addEventListener("dragover", handleDragOver);
      dropArea.addEventListener("dragleave", handleDragLeave);
      dropArea.addEventListener("drop", handleDrop);
    }

    return () => {
      if (dropArea) {
        dropArea.removeEventListener("dragover", handleDragOver);
        dropArea.removeEventListener("dragleave", handleDragLeave);
        dropArea.removeEventListener("drop", handleDrop);
      }
    };
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error("Please select a file first.");
      return;
    }

    // Upload logic here (e.g., send to backend using FormData)
    console.log("Uploading:", selectedFile.name);
    toast.success(`File uploaded: ${selectedFile.name}`);
    setSelectedFile(null);
    bsModal.current.hide();
  };

  return (
    <>
      <div
        className="modal fade"
        ref={modalRef}
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content  modal-container rounded-3 px-4 py-3 ">
            <div className="modal-header border-bottom-0">
              <h5 className="modal-title">Import Excel File</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body text-center">
              {/* Drag & Drop Area */}
              <div
                ref={dropAreaRef}
                className="border border-success rounded p-5  ms-3 me-3 mb-3"
                style={{
                  minHeight: "150px",
                  cursor: "pointer",
                }}
              >
                {selectedFile ? (
                  <p className="mb-0 fw-bold text-success">
                    {selectedFile.name}
                  </p>
                ) : (
                  <p className="mb-0 text-muted">
                    Drag & drop your Excel file here.
                  </p>
                )}
              </div>

              <p className="mb-3">OR</p>

              {/* File Upload: Choose + Upload on same row */}
              <div className="row justify-content-center align-items-center mb-3 gx-2">
                <div className="col-md-6 col-sm-12 mb-2 mb-md-0">
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="col-md-3 col-sm-12">
                  <button
                    className="btn btnpurple w-100"
                    onClick={handleUpload}
                  >
                    Upload <FaCloudUploadAlt />
                  </button>
                </div>
              </div>

              {/* Note */}
              <p
                className="mt-3 p-2 text-danger"
                style={{ fontSize: "12px", lineHeight: "1.5" }}
              >
                * Note: Special characters allowed in file name are <br />
                [space, dot, underscore, dash, backslash (\\), colon (:) ] only.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
};

export default ImportModal;
