/* eslint-disable no-unused-vars */
import IntlMessages from 'helpers/IntlMessages';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import AuctionList from '../add/addauction';

const AddAuctioModal = ({ modalOpen, toggleModal, categories }) => {
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
        <AuctionList />
      </ModalBody>
    </Modal>
  );
};

export default AddAuctioModal;
