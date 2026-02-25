/* eslint-disable no-unused-vars */
import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import Addproduct from '../add/addproduct';

const AddProductModal = ({ modalOpen, toggleModal, categories }) => {
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
      size="lg"
      fullscreen="md"
    >
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="pages.add-new-modal-title" />
      </ModalHeader>
      <ModalBody>
        <Addproduct />
      </ModalBody>
    </Modal>
  );
};

export default AddProductModal;
