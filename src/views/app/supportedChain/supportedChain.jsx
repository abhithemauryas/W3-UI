import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  FormFeedback,
  Nav,
  NavItem,
  NavLink,
  FormGroup,
} from 'reactstrap';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
  Button,
} from 'reactstrap';

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { connect } from 'react-redux';
import IntlMessages from 'helpers/IntlMessages';
import { NotificationManager } from 'components/common/react-notifications';
import { getCurrentColor } from 'helpers/Utils';
import { getAuctionHouse } from 'redux/auctionHouse/actions.auctionHouse';
import Pagination from 'components/table/Pagination';
import { pageSizes } from 'constants/constants';
import {
  blockPlayer,
  expirePlayerBallance,
  uploadOnboardPlayer,
} from 'redux/user/actions';
import {
  getChainList,
  addChain,
  updateChain,
} from 'redux/auction/httpCalls.auction';

const SupportedChain = ({
  blockErrorMessage,
  blockSuccessMessage,
  dispatchBlockUser,
  auctionHouseData,
  loading,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [initialLoading, setInitialLoading] = useState(false);
  const [selectedAuctionHouseId, setSelectedAuctionHouseId] = useState('');
  const [selectedPageSize, setSelectedPageSize] = useState(20);
  const [search, setSearch] = useState('');
  const [darktheme, setDarkTheme] = useState(false);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('active');
  const [statusLoading, setStatusLoading] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [metadata, setMetadata] = useState({ totalRecord: 0, totalPages: 1 });
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [formValues, setFormValues] = useState({
    name: '',
    rpc_url: '',
    chain_id: '',
    auction_contract_address: '',
    explorer_url: '',
  });
  const [formErrors, setFormErrors] = useState({});

  // Open modal for add
  const openAddModal = () => {
    setModalMode('add');
    setFormValues({
      name: '',
      rpc_url: '',
      chain_id: '',
      auction_contract_address: '',
      explorer_url: '',
    });
    setFormErrors({});
    setModalOpen(true);
  };
  // Open modal for edit
  const openEditModal = (user) => {
    setModalMode('edit');
    setFormValues({
      id: user?.id, // include id for update
      name: user?.name || '',
      rpc_url: user?.rpc_url || '',
      chain_id: user?.chain_id || '',
      auction_contract_address: user?.auction_contract_address || '',
      explorer_url: user?.explorer_url || '',
    });
    setFormErrors({});
    setModalOpen(true);
  };
  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formValues.name.trim()) errors.name = 'Name of chain is required';
    if (!formValues.rpc_url.trim()) errors.rpc_url = 'RPC URL is required';
    if (!formValues.chain_id.trim()) errors.chain_id = 'Chain ID is required';
    if (!formValues.auction_contract_address.trim())
      errors.auction_contract_address = 'Auction Contract Address is required';
    if (!formValues.explorer_url.trim())
      errors.explorer_url = 'Chain Explorer URL is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  // Handle form submit
  const handleModalSave = async () => {
    if (!validateForm()) return;
    try {
      if (modalMode === 'add') {
        await addChain({
          ...formValues,
          explorer_url: formValues.explorer_url,
        });
        setModalOpen(false);
        NotificationManager.success('Chain added successfully!');
      } else if (modalMode === 'edit') {
        await updateChain(formValues.id, {
          name: formValues.name,
          rpc_url: formValues.rpc_url,
          chain_id: formValues.chain_id,
          auction_contract_address: formValues.auction_contract_address,
          explorer_url: formValues.explorer_url,
        });
        setModalOpen(false);
        NotificationManager.success('Chain updated successfully!');
      }
      // Refresh the chain list
      const params = {
        limit: selectedPageSize,
        page: currentPage + 1,
      };
      if (search.trim()) {
        params.search = search.trim();
      }
      const res = await getChainList(params);
      setUsers(res?.data || []);
      setMetadata(res?.metadata || { totalRecord: 0, totalPages: 1 });
    } catch (err) {
      NotificationManager.error('Failed to save chain');
    }
  };

  const onSearchKey = (e) => {
    setSearch(e.target.value.toLowerCase());
    setCurrentPage(0);
  };
  const handlePageClick = ({ selected }) => setCurrentPage(selected);
  useEffect(() => {
    const color = getCurrentColor();
    if (color.includes('dark')) setDarkTheme(true);
    else setDarkTheme(false);
  }, []);

  useEffect(() => {
    let timeout;
    setGlobalLoading(true);
    const params = {
      limit: selectedPageSize,
      page: currentPage + 1,
    };
    if (search.trim()) {
      params.search = search.trim();
    }
    const fetch = () => {
      getChainList(params)
        .then((res) => {
          setUsers(res?.data || []);
          setMetadata(res?.metadata || { totalRecord: 0, totalPages: 1 });
        })
        .catch(() => {
          NotificationManager.error(null, 'Failed to fetch payment options');
        })
        .finally(() => setGlobalLoading(false));
    };
    if (search) {
      timeout = setTimeout(fetch, 500);
    } else {
      fetch();
    }
    return () => clearTimeout(timeout);
  }, [
    search,
    selectedPageSize,
    currentPage,
    selectedAuctionHouseId,
    activeTab,
  ]);

  useEffect(() => {
    setSelectedAuctionHouseId(auctionHouseData[0]?.id);
  }, [auctionHouseData]);

  useEffect(() => {
    if (initialLoading) {
      if (blockSuccessMessage)
        NotificationManager.success(null, blockSuccessMessage);
      if (blockErrorMessage) NotificationManager.error(null, blockErrorMessage);
    }
  }, [blockErrorMessage, blockSuccessMessage]);

  const blockUserHandler = (status, userId, toggleHandler) => {
    setInitialLoading(true);
    dispatchBlockUser({
      userId,
      data: { status },
      cb: (res) => {
        if (res?.success) {
          toggleHandler();
          NotificationManager.success(res?.message);
        } else NotificationManager.error(res?.message);
      },
    });
  };

  return (
    <>
      {globalLoading && (
        <div className="global-loading-overlay">
          <div className="loading" />
        </div>
      )}
      <Row>
        <Colxx xxs="12">
          {/* <Breadcrumb heading="menu.list" match={match} /> */}
          <div className="d-block d-md-inline-block pt-1">
            <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
              <input
                type="text"
                name="keyword"
                id="search"
                placeholder="Search" // TODO: provide intl props
                onChange={(e) => onSearchKey(e)}
              />
            </div>
            <Button
              color="primary"
              size="lg"
              className="top-right-button pb-1  pt-1 text-white"
              onClick={openAddModal}
            >
              <IntlMessages id="pages.supported-chain" />
            </Button>
          </div>
          <div className="float-md-right pt-1 d-flex align-items-center">
            <span className="text-muted text-small mr-1">
              <IntlMessages id="pages.viewing" />
              {currentPage * selectedPageSize + 1}-{' '}
              {(currentPage + 1) * selectedPageSize > metadata.totalRecord
                ? metadata.totalRecord
                : (currentPage + 1) * selectedPageSize}
              {` | `}
              <IntlMessages id="pages.total" />
              {metadata.totalRecord}
            </span>
            <UncontrolledDropdown className="d-inline-block">
              <DropdownToggle caret color="outline-dark" size="xs">
                {selectedPageSize}
              </DropdownToggle>
              <DropdownMenu right>
                {pageSizes.map((size, index) => {
                  return (
                    <DropdownItem
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      onClick={() => {
                        setSelectedPageSize(size);
                        setCurrentPage(0);
                      }}
                    >
                      {size}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <Separator className="mb-5" />
        </Colxx>
        <Colxx xxs="12" className="mb-4">
          <div className="responsive w-100 overflow-x">
            {/* Tabs for Active/Inactive */}
            <div className="mb-3">
              <Nav tabs className="separator-tabs ml-0">
                <NavItem>
                  <NavLink
                    to="#"
                    location={{}}
                    className={classnames({
                      active: activeTab === 'active',
                      'nav-link': true,
                    })}
                    onClick={() => {
                      setActiveTab('active');
                      setCurrentPage(0);
                    }}
                  >
                    Active
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="#"
                    location={{}}
                    className={classnames({
                      active: activeTab === 'inactive',
                      'nav-link': true,
                    })}
                    onClick={() => {
                      setActiveTab('inactive');
                      setCurrentPage(0);
                    }}
                  >
                    Inactive
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            <table
              className={`w-100 custom-table  ${
                !darktheme ? 'lighttheme' : 'darktheme'
              }`}
              style={
                globalLoading ? { opacity: 0.5, pointerEvents: 'none' } : {}
              }
            >
              <thead>
                <tr>
                  <th>Chain Name</th>
                  <th>RPC URL</th>
                  <th>Chain Id</th>
                  <th>Auction Contract Address</th>
                  <th>Chain Explorer URL</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users?.filter((u) =>
                  activeTab === 'active'
                    ? u.is_deleted === false
                    : u.is_deleted === true
                ).length ? (
                  users
                    .filter((u) =>
                      activeTab === 'active'
                        ? u.is_deleted === false
                        : u.is_deleted === true
                    )
                    .map((user) => (
                      <TableData
                        user={user}
                        key={user.id}
                        blockUserHandler={blockUserHandler}
                        onEdit={() => openEditModal(user)}
                        onStatusToggle={async (checked) => {
                          if (statusLoading) return;
                          if (
                            window.confirm(
                              'Are you sure you want to change the status?'
                            )
                          ) {
                            setStatusLoading(true);
                            try {
                              await updateChain(user.id, {
                                is_deleted: checked,
                              });
                              NotificationManager.success(
                                'Status updated successfully!'
                              );
                              // Refresh list
                              const params = {
                                limit: selectedPageSize,
                                page: currentPage + 1,
                              };
                              if (search.trim()) params.search = search.trim();
                              const res = await getChainList(params);
                              setUsers(res?.data || []);
                              setMetadata(
                                res?.metadata || {
                                  totalRecord: 0,
                                  totalPages: 1,
                                }
                              );
                            } catch (err) {
                              NotificationManager.error(
                                'Failed to update status'
                              );
                            } finally {
                              setStatusLoading(false);
                            }
                          }
                        }}
                        statusLoading={statusLoading}
                      />
                    ))
                ) : (
                  <tr>
                    <td
                      colSpan="15"
                      className="nodatafound "
                      style={{ borderLeftStyle: 'none' }}
                    >
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* Add/Edit Supported Chain Modal */}
            <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
              <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
                {modalMode === 'add'
                  ? 'Add Supported Chain'
                  : 'Edit Supported Chain'}
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label for="chain-name">Name Of Chain</Label>
                  <Input
                    id="chain-name"
                    value={formValues.name}
                    onChange={(e) =>
                      setFormValues((v) => ({ ...v, name: e.target.value }))
                    }
                    onFocus={() =>
                      formErrors.name &&
                      setFormErrors((f) => ({ ...f, name: undefined }))
                    }
                    invalid={!!formErrors.name}
                    placeholder="Enter chain name"
                  />
                  {formErrors.name && (
                    <FormFeedback>{formErrors.name}</FormFeedback>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label for="rpc-url">RPC URL</Label>
                  <Input
                    id="rpc-url"
                    value={formValues.rpc_url}
                    onChange={(e) =>
                      setFormValues((v) => ({
                        ...v,
                        rpc_url: e.target.value,
                      }))
                    }
                    onFocus={() =>
                      formErrors.rpc_url &&
                      setFormErrors((f) => ({ ...f, rpc_url: undefined }))
                    }
                    invalid={!!formErrors.rpc_url}
                    placeholder="Enter RPC URL"
                  />
                  {formErrors.rpc_url && (
                    <FormFeedback>{formErrors.rpc_url}</FormFeedback>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label for="chain-id">Chain ID</Label>
                  <Input
                    id="chain-id"
                    value={formValues.chain_id}
                    onChange={(e) =>
                      setFormValues((v) => ({
                        ...v,
                        chain_id: e.target.value,
                      }))
                    }
                    onFocus={() =>
                      formErrors.chain_id &&
                      setFormErrors((f) => ({ ...f, chain_id: undefined }))
                    }
                    invalid={!!formErrors.chain_id}
                    placeholder="Enter Chain ID"
                  />
                  {formErrors.chain_id && (
                    <FormFeedback>{formErrors.chain_id}</FormFeedback>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label for="auction-address">Auction Contract Address</Label>
                  <Input
                    id="auction-address"
                    value={formValues.auction_contract_address}
                    onChange={(e) =>
                      setFormValues((v) => ({
                        ...v,
                        auction_contract_address: e.target.value,
                      }))
                    }
                    onFocus={() =>
                      formErrors.auction_contract_address &&
                      setFormErrors((f) => ({
                        ...f,
                        auction_contract_address: undefined,
                      }))
                    }
                    invalid={!!formErrors.auction_contract_address}
                    placeholder="Enter Auction Contract Address"
                  />
                  {formErrors.auction_contract_address && (
                    <FormFeedback>
                      {formErrors.auction_contract_address}
                    </FormFeedback>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label for="explorer-url">Chain Explorer URL</Label>
                  <Input
                    id="explorer-url"
                    value={formValues.explorer_url}
                    onChange={(e) =>
                      setFormValues((v) => ({
                        ...v,
                        explorer_url: e.target.value,
                      }))
                    }
                    onFocus={() =>
                      formErrors.explorer_url &&
                      setFormErrors((f) => ({ ...f, explorer_url: undefined }))
                    }
                    invalid={!!formErrors.explorer_url}
                    placeholder="Enter Chain Explorer URL"
                  />
                  {formErrors.explorer_url && (
                    <FormFeedback>{formErrors.explorer_url}</FormFeedback>
                  )}
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={handleModalSave}>
                  Save
                </Button>{' '}
                <Button color="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </Colxx>
      </Row>
      <Row>
        {/* Pagination starts here */}
        {!loading && metadata?.totalPages > 1 ? (
          <Pagination
            totalPage={metadata?.totalPages}
            currentPage={currentPage}
            handlePageClick={handlePageClick}
          />
        ) : (
          <Colxx xxs="12" className="mt-2" />
        )}
      </Row>
    </>
  );
};

const TableData = ({ user, onEdit, onStatusToggle, statusLoading }) => {
  // const [updateLoading, setUpdateLoading] = React.useState(false);

  // const handleUpdate = () => {
  //   setUpdateLoading(true);
  //   updatePaymentGateway({
  //     auction_house_id: user.id,
  //     config_type: 'PAYMENT_METHOD_ALLOWED',
  //   })
  //     .then((res) => {
  //       NotificationManager.success(res?.message || 'Updated!');
  //       setUpdateLoading(false);
  //     })
  //     .catch(() => {
  //       setUpdateLoading(false);
  //       NotificationManager.error('Update failed!');
  //     });
  // };

  return (
    <tr key={user?.id}>
      <td>{user?.name || '-'}</td>
      <td
        className="break-address"
        style={{ wordBreak: 'break-all', maxWidth: 120 }}
      >
        {user?.rpc_url || '-'}
      </td>
      <td>{user?.chain_id || '-'}</td>
      <td
        className="break-address"
        style={{ wordBreak: 'break-all', maxWidth: 120 }}
      >
        {user?.auction_contract_address || '-'}
      </td>
      <td
        className="break-address"
        style={{
          wordBreak: 'break-all',
          maxWidth: 80,
        }}
        title={user?.explorer_url || ''}
      >
        {user?.explorer_url ? (
          <button
            type="button"
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              margin: 0,
              color: '#007bff',
              textDecoration: 'underline',
              cursor: 'pointer',
              font: 'inherit',
            }}
            onClick={() => window.open(user.explorer_url, '_blank', 'noopener,noreferrer')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                window.open(user.explorer_url, '_blank', 'noopener,noreferrer');
              }
            }}
            tabIndex={0}
            aria-label={`Open explorer URL: ${user.explorer_url}`}
            title={user.explorer_url}
          >
            {`${user.explorer_url.slice(0, 6)}...${user.explorer_url.slice(-6)}`}
          </button>
        ) : (
          '-'
        )}
      </td>
      <td>
        <button
          type="button"
          className={`toggle-btn${user?.is_deleted ? ' off' : ' on'}${
            statusLoading ? ' disabled' : ''
          }`}
          aria-pressed={!user?.is_deleted}
          aria-label="Toggle status"
          disabled={statusLoading}
          onClick={() => !statusLoading && onStatusToggle(!user?.is_deleted)}
          style={{
            minWidth: 48,
            minHeight: 28,
            border: 'none',
            background: 'none',
            padding: 0,
            cursor: statusLoading ? 'not-allowed' : 'pointer',
          }}
        >
          <span
            className="toggle-slider"
            style={{
              display: 'inline-block',
              width: 40,
              height: 22,
              borderRadius: 12,
              background: user?.is_deleted ? '#ccc' : '#4caf50',
              position: 'relative',
              transition: 'background 0.2s',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: user?.is_deleted ? 2 : 20,
                top: 2,
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: '#fff',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                transition: 'left 0.2s',
              }}
            />
          </span>
        </button>
      </td>
      <td>
        <Button color="primary" onClick={onEdit}>
          Edit
        </Button>
      </td>
    </tr>
  );
};

const mapStateToProps = ({ user, userBlock, auctionHouses }) => {
  const {
    successMessage: blockSuccessMessage,
    errorMessage: blockErrorMessage,
  } = userBlock;
  const {
    count,
    currentUser,
    error,
    successMesage,
    errorMessage,
    loading,
    users,
    metadata,
    expireBalanceLoading,
  } = user;

  const { auctionHouseData } = auctionHouses;
  return {
    count,
    currentUser,
    error,
    successMesage,
    errorMessage,
    loading,
    users,
    metadata,
    blockErrorMessage,
    blockSuccessMessage,
    auctionHouseData,
    expireBalanceLoading,
  };
};
const mapActionsToProps = (dispatch) => {
  return {
    dispatchBlockUser: (params) => dispatch(blockPlayer(params)),
    fetchAuctionHouses: (params) => dispatch(getAuctionHouse({ ...params })),
    dispatchUploadFiles: (data, cb) => {
      dispatch(uploadOnboardPlayer({ data, cb }));
    },

    dispatchExpirePlays: (params) => {
      dispatch(expirePlayerBallance(params));
    },
  };
};

export default connect(mapStateToProps, mapActionsToProps)(SupportedChain);
