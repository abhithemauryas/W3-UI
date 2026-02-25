import IntlMessages from 'helpers/IntlMessages';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {
  updateProductConflict,
  getProductConflicts,
} from 'redux/auction/actions.auction';

const EditModal = ({
  id,
  status,
  setModalEdit,
  modalEdit,
  dispatchUpdateProductConflict,
  fetchProductConflicts,
  selectedPageSize,
}) => {
  return (
    <Modal isOpen={modalEdit} toggle={() => setModalEdit(!modalEdit)}>
      <ModalHeader>
        <IntlMessages id="editmodal.edit" /> Product Delivery Conflict
      </ModalHeader>
      <ModalBody>
        <IntlMessages
          id={
            status === 'pending'
              ? 'editmodal.body-resolved'
              : 'editmodal.body-pending'
          }
        />
        {status === 'pending' && <br />}
        {status === 'pending' && <br />}
        {status === 'pending' &&
          `By clicking Yes, conflict will be set to resolved and auction revenue
        will be transferred to the clan owner.`}
      </ModalBody>
      <ModalFooter>
        <Button
          color="success"
          onClick={() => {
            dispatchUpdateProductConflict(
              id,
              { status: status === 'pending' ? 'resolved' : 'pending' },
              () => {
                fetchProductConflicts({
                  limit: selectedPageSize,
                  page: 0,
                });
                setModalEdit(false);
              }
            );
          }}
        >
          <IntlMessages id="editmodal.yes" />
        </Button>{' '}
        <Button color="secondary" onClick={() => setModalEdit(false)}>
          <IntlMessages id="editmodal.no" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ auction }) => {
  const {
    productConflicts,
    metadata,
    message,
    successMesage,
    errorMessage,
    loading,
  } = auction;
  return {
    productConflicts,
    metadata,
    message,
    successMesage,
    errorMessage,
    loading,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    dispatchUpdateProductConflict: (pathParam, data, cb) =>
      dispatch(updateProductConflict(pathParam, data, cb)),
    fetchProductConflicts: (params) =>
      dispatch(getProductConflicts({ ...params })),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(EditModal);
