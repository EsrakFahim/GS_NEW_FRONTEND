import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";

const ConfirmationModal = ({
      show,
      onClose,
      onConfirm,
      loading,
      title = "Confirm Action",
      body = "Are you sure you want to proceed?",
      confirmButtonText = "Confirm",
      cancelButtonText = "Cancel"
}) => {
      return (
            <Modal show={show} onHide={onClose}>
                  <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                        {loading ? (
                              <div className="text-center">
                                    <Spinner animation="border" role="status" />
                                    <p>Processing...</p>
                              </div>
                        ) : (
                              <p>{body}</p>
                        )}
                  </Modal.Body>
                  {!loading && (
                        <Modal.Footer>
                              <Button variant="secondary" onClick={onClose}>
                                    {cancelButtonText}
                              </Button>
                              <Button variant="danger" onClick={onConfirm}>
                                    {confirmButtonText}
                              </Button>
                        </Modal.Footer>
                  )}
            </Modal>
      );
};

export default ConfirmationModal;
