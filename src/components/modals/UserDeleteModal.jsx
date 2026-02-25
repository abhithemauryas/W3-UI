import IntlMessages from 'helpers/IntlMessages';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { deleteUser, getUsers } from 'redux/user/actions';

const DeleteModal = ({
  id,
  setModalDelete,
  modalDelete,
  dispatchDeleteuser,
  fetchUsers,
  setCurrentPage,
  selectedPageSize,
}) => {
  return (
    <Modal isOpen={modalDelete} toggle={() => setModalDelete(!modalDelete)}>
      <ModalHeader>
        <IntlMessages id="deletemodal.title" /> User
      </ModalHeader>
      <ModalBody>
        <IntlMessages id="deletemodal.body" /> User ?
      </ModalBody>
      <ModalFooter>
        <Button
          color="danger"
          onClick={() => {
            dispatchDeleteuser(id, () => {
              fetchUsers({
                limit: selectedPageSize,
                page: 0,
              });
              setCurrentPage(1);
            });
            setModalDelete(false);
          }}
        >
          <IntlMessages id="deletemodal.delete" />
        </Button>{' '}
        <Button color="secondary" onClick={() => setModalDelete(false)}>
          <IntlMessages id="deletemodal.cancel" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ user }) => {
  const { successMesage, errorMessage } = user;
  return { successMesage, errorMessage };
};

const mapActionsToProps = (dispatch) => {
  return {
    fetchUsers: (params) => dispatch(getUsers({ ...params })),
    dispatchDeleteuser: (params, cb) => dispatch(deleteUser(params, cb)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(DeleteModal);
