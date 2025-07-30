import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const CommonModel = ({ 
  show, 
  onClose, 
  title = "Modal Title", 
  children, 
  footer ,
  size
}) => {
  return (
    <Modal 
      show={show} 
      onHide={onClose} 
      size="xl"
      centered 
      backdrop="static" 
      className="challan-modal" 
       
    >
      <Modal.Header closeButton className="modal-header">
        <Modal.Title>{title}==={size}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-0">
        {children}
      </Modal.Body>

      <Modal.Footer>
        {footer ? (
          footer
        ) : (
          <Button variant="danger" onClick={onClose} className="bottom-close-btn">
            Close
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CommonModel;
