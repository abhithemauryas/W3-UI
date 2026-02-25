import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Modal as ReactModal,
} from 'reactstrap';

const Modal = ({
  isOpen,
  onClose,
  toggle,
  children,
  modalHeader,
  modalFooter,
  onSubmit,
  submitBtnText,
  hideCancelButton = false,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      toggle={onClose}
      centered
      style={{ boxShadow: 'none' }}
    >
      <ModalHeader toggle={toggle}>{modalHeader}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        {submitBtnText && (
          <Button color="primary" className="model-btn" onClick={onSubmit}>
            {submitBtnText}
          </Button>
        )}
        {!hideCancelButton && (
          <Button className="model-btn back-btn" onClick={onClose}>
            Cancel
          </Button>
        )}
        {modalFooter}
      </ModalFooter>
    </ReactModal>
  );
};

export default Modal;
