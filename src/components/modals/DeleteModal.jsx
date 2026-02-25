import IntlMessages from 'helpers/IntlMessages';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {
  cancelAuction,
  deleteAuction,
  getAuctions,
  deleteProductConflict,
  getProductConflicts,
} from 'redux/auction/actions.auction';

const DeleteModal = ({
  id,
  setModalDelete,
  modalDelete,
  from,
  dispatchDeleteProductConflict,
  fetchAuctions,
  // setCurrentPage,
  setItems,
  selectedPageSize,
  activeFirstTab,
  item,
  dispatchCancelAuction,
  fetchProductConflicts,
}) => {
  return (
    <Modal isOpen={modalDelete} toggle={() => setModalDelete(!modalDelete)}>
      <ModalHeader>
        <IntlMessages
          id={from === 'auction' ? 'deletemodal.cancel' : 'deletemodal.delete'}
        />{' '}
        {from === 'auction' ? 'Auction' : 'Product Delivery Conflict'}
      </ModalHeader>
      <ModalBody>
        <IntlMessages
          id={
            from === 'auction'
              ? 'deletemodal.body-cancel'
              : 'deletemodal.body-delete'
          }
        />{' '}
        {item} ?
      </ModalBody>
      <ModalFooter>
        <Button
          color="danger"
          // onClick={() => {
          //   dispatchDeleteauction(id, () => {
          //     setItems([]);
          //     setCurrentPage(1);
          //     fetchAuctions({
          //       limit: selectedPageSize,
          //       page: 0,
          //       state: activeFirstTab,
          //     });
          //   });
          //   setModalDelete(false);
          // }}
          onClick={() => {
            if (from === 'auction') {
              dispatchCancelAuction(id, (res) => {
                if (res.success) {
                  fetchAuctions({
                    limit: selectedPageSize,
                    page: 0,
                    state: activeFirstTab,
                  });
                }
                setModalDelete(false);
                setItems([]);
              });
            } else {
              dispatchDeleteProductConflict(id, (res) => {
                setModalDelete(false);
                if (res?.success) {
                  fetchProductConflicts({
                    limit: selectedPageSize,
                    page: 0,
                  });
                }
              });
            }
          }}
        >
          <IntlMessages id="deletemodal.yes" />
        </Button>{' '}
        <Button color="secondary" onClick={() => setModalDelete(false)}>
          <IntlMessages id="deletemodal.no" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ auction }) => {
  const {
    auctions,
    productConflicts,
    metadata,
    message,
    successMesage,
    errorMessage,
    loading,
  } = auction;
  return {
    auctions,
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
    fetchAuctions: (params) => dispatch(getAuctions({ ...params })),
    dispatchDeleteauction: (params, cb) => dispatch(deleteAuction(params, cb)),
    dispatchCancelAuction: (params, cb) => dispatch(cancelAuction(params, cb)),
    dispatchDeleteProductConflict: (params, cb) =>
      dispatch(deleteProductConflict(params, cb)),
    fetchProductConflicts: (params) =>
      dispatch(getProductConflicts({ ...params })),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(DeleteModal);
