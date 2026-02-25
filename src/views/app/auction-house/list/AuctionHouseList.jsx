import { useEffect, useRef, useState } from 'react';
import {
  Button,
  CustomInput,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Tooltip,
  UncontrolledDropdown,
} from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { NotificationManager } from 'components/common/react-notifications';
import IntlMessages from 'helpers/IntlMessages';
import {
  formatDate,
  formatWalletAddress,
  generateImageUrl,
  getCurrentColor,
} from 'helpers/Utils';
import { copyToClipboard } from 'helpers/copyToClipboard';
import Switch from 'rc-switch';
import { connect } from 'react-redux';
import {
  deleteAuctionHouse,
  getAuctionCategoryList,
  getAuctionCategoryPermission,
  getAuctionHouse,
  updateAuctionCategoryPermission,
} from 'redux/auctionHouse/actions.auctionHouse';
import { blockUser } from 'redux/user/userBlock/actions.userBlock';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { adminRoot } from 'constants/defaultValues';
import { pageSizes } from 'constants/constants';
import Pagination from 'components/table/Pagination';
import ImageNotFound from '../../../../assets/img/notfound.png';

const initialState = {
  show: false,
  houseDetails: null,
};

const AuctionHouseList = ({
  fetchAuctionHouses,
  users,
  metadata,
  // blockErrorMessage,
  blockSuccessMessage,
  dispatchBlockUser,
  auctionHouseData,
  dispatchDeleteAuctionHouse,
  deleteAuctionLoading,
  fetchAuctionCategoryList,
  auctionCategoryList,
  fetchAuctionCategory,
  updateAuctionCategory,
  loading,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [initialLoading, setInitialLoading] = useState(false);
  const [auctionProps, setAuctionProps] = useState();
  const savedCallback = useRef();

  const [selectedPageSize, setSelectedPageSize] = useState(pageSizes[0]);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [darktheme, setDarkTheme] = useState(false);
  const [auctionCategoryModal, setAuctionCategoryModal] =
    useState(initialState);
  const [deleteIds, setDeleteIds] = useState([]);
  const [showAuctionDeleteModal, setShowAuctionDeleteModal] = useState(false);

  const handlePageClick = ({ selected }) => setCurrentPage(selected);
  useEffect(() => {
    const color = getCurrentColor();
    if (color.includes('dark')) setDarkTheme(true);
    else setDarkTheme(false);
  }, [users]);

  useEffect(() => {
    fetchAuctionHouses({
      limit: selectedPageSize,
      page: currentPage,
      // _sort: selectedSortOption.column,
      // _order: selectedOrderOption.column,
    });
  }, [selectedPageSize, currentPage]);

  useEffect(() => {
    if (initialLoading) {
      if (blockSuccessMessage)
        NotificationManager.success(null, blockSuccessMessage);
      // if (blockErrorMessage) NotificationManager.error(null, blockErrorMessage);
    }
  }, [blockSuccessMessage]);

  const blockUserHandler = (status, userId, toggleHandler) => {
    savedCallback.current = toggleHandler;
    setAuctionProps({ status, userId, toggleHandler });
    if (!status) {
      setConfirmationModal(true);
    } else {
      setInitialLoading(true);
      dispatchBlockUser({
        userId,
        data: { status },
        cb: () => {
          toggleHandler();
        },
      });
    }
  };

  const onClose = () => {
    setConfirmationModal(false);
  };

  const handleConfirmation = () => {
    setInitialLoading(true);
    dispatchBlockUser({
      userId: auctionProps?.userId,
      data: { status: auctionProps?.status },
      cb: () => {
        savedCallback.current();
      },
    });

    setConfirmationModal(false);
  };

  useEffect(() => {
    fetchAuctionCategoryList({
      cb: (res) => {
        if (!res?.success) NotificationManager.error(null, res?.message);
      },
    });
  }, []);

  return (
    <>
      <>
        <Row>
          <Colxx xxs="12">
            <div className="float-md-right pt-1">
              <div>
                {/* <button
                  type="button"
                  className="btn btn-outline-dark text-small auction-house-delete-btn"
                  onClick={() => {
                    setShowAuctionDeleteModal(true);
                  }}
                  // TODO: disable this button for this functionality
                  disabled={!deleteIds?.length}
                >
                  <span className="text-danger">
                    Delete {`(${deleteIds?.length || 0})`}{' '}
                  </span>
                  <i className="simple-icon-trash text-danger pl-1" />
                </button>{' '} */}
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
            </div>
            <Separator className="mb-5" />
          </Colxx>
          <Colxx xxs="12" className="mb-4">
            <div className="responsive w-100 overflow-x">
              <table
                className={`w-100 auction-house-table custom-table  ${
                  !darktheme ? 'lighttheme' : 'darktheme'
                }`}
              >
                <thead>
                  <tr>
                    {/* <th> </th> */}
                    <th>Sr No.</th>
                    <th>CLAN</th>
                    {/* <th>Email</th> */}
                    <th>CLAN ID</th>
                    <th>Analytics</th>
                    <th>Registration Date</th>
                    <th>Wallet Address</th>
                    <th>Owner Info</th>
                    <th>Logo</th>
                    <th>Configuration</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {auctionHouseData?.length ? (
                    auctionHouseData?.map((auctionHouseItem, index) => (
                      <TableData
                        darktheme={darktheme}
                        auctionHouse={auctionHouseItem}
                        key={auctionHouseItem.id}
                        index={index}
                        blockUserHandler={blockUserHandler}
                        setDeleteIds={setDeleteIds}
                        deleteIds={deleteIds}
                        setAuctionCategoryModal={setAuctionCategoryModal}
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
      <Modal isOpen={confirmationModal} toggle={() => onClose()}>
        <ModalHeader>Block CLAN</ModalHeader>
        <ModalBody>
          This will disable the login/access to the admin panel of the auction
          house. The ongoing auctions will continue. New auctions cannot be
          created.
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => handleConfirmation()}>
            <IntlMessages id="deletemodal.delete" />
          </Button>{' '}
          <Button color="secondary" onClick={() => onClose()}>
            <IntlMessages id="deletemodal.cancel" />
          </Button>
        </ModalFooter>
      </Modal>

      {/* Delete auction house modal */}
      <DeleteAuctionHouseModal
        deleteAction={() => {
          dispatchDeleteAuctionHouse(deleteIds, (res) => {
            if (res.success) {
              fetchAuctionHouses({
                limit: selectedPageSize,
                page: 0,
              });
              setDeleteIds([]);
              setShowAuctionDeleteModal(false);
              NotificationManager.success(
                null,
                res?.message || 'CLAN deleted successfully'
              );
            } else {
              NotificationManager.error(
                null,
                res?.message || 'Something went wrong'
              );
            }
          });
        }}
        modalDelete={showAuctionDeleteModal}
        setModalDelete={setShowAuctionDeleteModal}
        isLoading={deleteAuctionLoading}
        content="Are you sure you want to delete CLAN?"
      />
      <SetAuctionCategoryModal
        modal={auctionCategoryModal}
        setModal={setAuctionCategoryModal}
        auctionCategoryList={auctionCategoryList}
        fetchAuctionCategory={fetchAuctionCategory}
        updateAuctionCategory={updateAuctionCategory}
      />
    </>
  );
};

const TableData = ({
  auctionHouse,
  blockUserHandler,
  index,
  darktheme,
  // setDeleteIds,
  // deleteIds,
}) => {
  console.log('========>', auctionHouse);
  const { wallet_address, status, created_at } =
    auctionHouse && auctionHouse?.admin;
  const [toggle, setToggle] = useState(status);
  const [toggleStatus, setToggleStatus] = useState(!status);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [showOwnerInfoModal, setShowOwnerInfoModal] = useState(false);
  const [isCopied, setIsCopied] = useState({
    walletCopy: false,
    auctionHouseIdCopy: false,
  });
  const toggleHandler = () => {
    setToggle((changeToggle) => !changeToggle);
    setToggleStatus((changeStatus) => !changeStatus);
  };

  const handleCopyWalletAddress = (walletAddress, field) => {
    copyToClipboard(walletAddress);
    setIsCopied({
      ...isCopied,
      [field]: true,
    }); // Set tooltip to open after copying
    setTimeout(() => {
      setIsCopied({
        ...isCopied,
        [field]: false,
      }); // Close tooltip after a certain duration
    }, 2000); // Adjust the duration as needed
  };

  const iconClassName = darktheme ? 'icon-white' : 'icon-black';
  return (
    <tr key={auctionHouse.id}>
      {/* <td>
        <input
          type="checkbox"
          className="cursor-pointer"
          name="select"
          id="select"
          value={deleteIds?.includes?.(auctionHouse?.id)}
          onChange={() => {
            setDeleteIds((prev) => {
              if (!auctionHouse?.id) {
                return prev;
              }
              if (deleteIds?.includes?.(auctionHouse?.id)) {
                return prev.filter((o) => o !== auctionHouse?.id);
              }
              if (prev?.length) {
                return [...prev, auctionHouse.id];
              }
              return [auctionHouse.id];
            });
          }}
        />
      </td> */}
      <td>{index + 1}</td>
      <td>
        <a
          href={`https://${auctionHouse.url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {auctionHouse.name}
        </a>
      </td>
      <td>{auctionHouse.readableId}</td>

      <td>
        {' '}
        <RouterNavLink
          to={`${adminRoot}/auction-house/${auctionHouse.id}`}
          className="p-0 cursor-pointer"
        >
          click here
        </RouterNavLink>
      </td>
      <td>{formatDate(created_at, true)}</td>
      <td>
        <div className="d-flex justify-content-center align-items-center">
          <div className="mr-1" id={`info-tooltip-${index}`}>
            <span>{formatWalletAddress(wallet_address)}</span>
            <Button
              type="button"
              onClick={() =>
                handleCopyWalletAddress(wallet_address, 'walletCopy')
              }
              style={{
                padding: 0,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer', // Optional: Add pointer cursor for better UX
              }}
            >
              <span className={`iconsminds-files ml-1 ${iconClassName}`} />
              {isCopied.walletCopy && (
                <Tooltip
                  placement="top"
                  isOpen={isCopied}
                  target={`info-tooltip-${index}`}
                  toggle={() =>
                    setIsCopied({
                      ...isCopied,
                      walletCopy: !isCopied.walletCopy,
                    })
                  }
                >
                  Copied
                </Tooltip>
              )}
            </Button>

            <Tooltip
              placement="top"
              isOpen={tooltipOpen && !isCopied.walletCopy}
              target={`info-tooltip-${index}`}
              toggle={() => setTooltipOpen(!tooltipOpen)}
            >
              {wallet_address}
            </Tooltip>
          </div>
        </div>
      </td>
      <td>
        <Button
          type="button"
          onClick={() => setShowOwnerInfoModal(true)}
          style={{
            padding: 0,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <i
            className={`simple-icon-info ${iconClassName}`}
            style={{ fontSize: '18px' }}
          />
        </Button>
        <OwnerInfoModal
          isOpen={showOwnerInfoModal}
          toggle={() => setShowOwnerInfoModal(false)}
          admin={auctionHouse?.admin}
        />
      </td>
      <td>
        <img
          src={generateImageUrl(auctionHouse?.medias?.local_path)}
          alt="CLAN Logo"
          width="130"
          {...(!auctionHouse?.medias?.local_path ? { height: 80 } : {})}
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop in case the dummy image also fails
            e.target.src = ImageNotFound; // Fallback to dummy image if main image fails
          }}
        />
      </td>

      <td>
        <RouterNavLink
          to={`${adminRoot}/auction-house/${auctionHouse.id}/config`}
          className="p-0 cursor-pointer"
        >
          Config
        </RouterNavLink>
      </td>
      <td>
        <div className="w-100 d-flex justify-content-center ">
          <Switch
            id="tooltip_switch"
            className={`custom-switch custom-switch-small ${'custom-switch-primary'}`}
            checked={toggle}
            onClick={() =>
              blockUserHandler(
                toggleStatus,
                auctionHouse?.admin?.id,
                toggleHandler
              )
            }
          />
        </div>
      </td>
    </tr>
  );
};

const DeleteAuctionHouseModal = ({
  setModalDelete,
  modalDelete,
  deleteAction,
  content,
  isLoading,
}) => {
  return (
    <Modal
      isOpen={modalDelete}
      toggle={() => setModalDelete(!modalDelete)}
      backdrop="static"
    >
      <ModalHeader toggle={() => setModalDelete(!modalDelete)}>
        <IntlMessages id="deletemodal.title" /> CLAN
      </ModalHeader>
      <ModalBody>{content}</ModalBody>
      <ModalFooter>
        <Button
          type="submit"
          color="danger"
          disabled={isLoading}
          className={`btn-multiple-state   ${isLoading ? 'show-spinner' : ''}`}
          onClick={() => {
            deleteAction();
          }}
        >
          <span className="spinner d-inline-block ">
            <span className="bounce1" />
            <span className="bounce2 " />
            <span className="bounce3" />
          </span>
          <span className="label">
            <IntlMessages id="deletemodal.delete" />
          </span>
        </Button>
        <Button
          color="secondary"
          disabled={isLoading}
          onClick={() => setModalDelete(false)}
        >
          <IntlMessages id="deletemodal.cancel" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const SetAuctionCategoryModal = ({
  setModal,
  modal,
  isLoading,
  auctionCategoryList,
  fetchAuctionCategory,
  updateAuctionCategory,
}) => {
  const [auctionCategoryPermission, setAuctionCategoryPermission] = useState(
    []
  );

  const [auctionCategoryLoading, setAuctionCategoryLoading] = useState(false);

  const closeModal = () => setModal(initialState);
  // auction_house_id, auctionCategoryIds
  const submitHandler = () => {
    setAuctionCategoryLoading(true);
    updateAuctionCategory({
      params: {
        auction_house_id: modal?.houseDetails?.id,
        auctionCategoryIds: auctionCategoryPermission,
      },

      cb: (res) => {
        if (res?.success) {
          closeModal();
          NotificationManager.success(null, res?.message);
        } else NotificationManager.error(null, res?.message);
        setAuctionCategoryLoading(false);
      },
    });
  };

  useEffect(() => {
    if (modal?.houseDetails?.id) {
      setAuctionCategoryLoading(true);
      fetchAuctionCategory({
        params: modal?.houseDetails?.id,
        cb: (res) => {
          if (res?.success) {
            setAuctionCategoryPermission(res?.data);
          } else NotificationManager.error(null, res?.message);
          setAuctionCategoryLoading(false);
        },
      });
    }
  }, [modal?.houseDetails?.id]);
  return (
    <Modal isOpen={modal?.show} toggle={closeModal} backdrop="static">
      <ModalHeader toggle={closeModal}>Auction Category</ModalHeader>
      <ModalBody>
        <div className="row mx-1">
          {auctionCategoryList?.length ? (
            auctionCategoryList?.map((category) => (
              <div className="col-6" key={category?.id}>
                <CustomInput
                  type="checkbox"
                  id={category?.id}
                  label={category?.title}
                  onClick={(e) => {
                    if (!e.target?.checked) {
                      setAuctionCategoryPermission((prev) => [
                        ...prev,
                        category?.id,
                      ]);
                    } else
                      setAuctionCategoryPermission((prev) =>
                        prev.filter((ids) => ids !== category?.id)
                      );
                  }}
                  htmlFor={category?.id}
                  value={auctionCategoryPermission.includes(category?.id)}
                  checked={auctionCategoryPermission.includes(category?.id)}
                />
              </div>
            ))
          ) : (
            <div className="col-12 d-flex justify-content-center align-items-center">
              Data Not Found
            </div>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          type="submit"
          color="primary"
          disabled={auctionCategoryLoading}
          className={`btn-multiple-state   ${
            auctionCategoryLoading ? 'show-spinner' : ''
          }`}
          onClick={submitHandler}
        >
          <span className="spinner d-inline-block ">
            <span className="bounce1" />
            <span className="bounce2 " />
            <span className="bounce3" />
          </span>
          <span className="label">
            <IntlMessages id="modal.save" />
          </span>
        </Button>
        <Button color="secondary" disabled={isLoading} onClick={closeModal}>
          <IntlMessages id="deletemodal.cancel" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const OwnerInfoModal = ({ isOpen, toggle, admin }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} backdrop="static">
      <ModalHeader toggle={toggle}>Owner Information</ModalHeader>
      <ModalBody>
        {admin ? (
          <div className="owner-info-details">
            <div className="mb-3">
              <strong>Name : </strong> <span>{admin.first_name || 'N/A'}</span>
            </div>
            <div className="mb-3">
              <strong>Mobile Number : </strong>
              <span>{admin.mobile_no || 'N/A'}</span>
            </div>
            <div className="mb-3">
              <strong>Email : </strong> <span>{admin.email || 'N/A'}</span>
            </div>
            <div className="mb-3">
              <strong>Country : </strong> <span>{admin.country || 'N/A'}</span>
            </div>
            <div className="mb-5">
              <strong>Zip Code : </strong>
              <span>{admin.zipcode || 'N/A'}</span>
            </div>
            <div className="mb-5">
              <strong>Profile Photo : </strong>
              <span className="ml-5">
                <img
                  src={generateImageUrl(admin?.avatar)}
                  alt="Owner Profile"
                  width="130"
                  {...(!admin?.avatar ? { height: 80 } : {})}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = ImageNotFound;
                  }}
                />
              </span>
            </div>
            <div className="mb-3">
              <strong>ID Proof : </strong>
              <span className="ml-5">
                <img
                  src={generateImageUrl(admin?.id_proof)}
                  alt="ID Proof"
                  width="130"
                  {...(!admin?.id_proof ? { height: 80 } : {})}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = ImageNotFound;
                  }}
                />
              </span>
            </div>
          </div>
        ) : (
          <div>No owner information available</div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ auctionHouses, userBlock }) => {
  const {
    successMessage: blockSuccessMessage,
    // errorMessage: blockErrorMessage,
  } = userBlock;
  const {
    successMesage,
    errorMessage,
    loading,
    auctionHouseData,
    metadata,
    deleteAuctionLoading,
    auctionCategoryList,
  } = auctionHouses;

  return {
    auctionHouseData,
    successMesage,
    errorMessage,
    loading,
    metadata,
    // blockErrorMessage,
    blockSuccessMessage,
    deleteAuctionLoading,
    auctionCategoryList,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    fetchAuctionHouses: (params) => dispatch(getAuctionHouse({ ...params })),
    dispatchBlockUser: (params) => dispatch(blockUser(params)),
    dispatchDeleteAuctionHouse: (params, cb) =>
      dispatch(deleteAuctionHouse(params, cb)),
    fetchAuctionCategoryList: (params) =>
      dispatch(getAuctionCategoryList(params)),
    fetchAuctionCategory: (params) =>
      dispatch(getAuctionCategoryPermission(params)),
    updateAuctionCategory: (params) =>
      dispatch(updateAuctionCategoryPermission(params)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(AuctionHouseList);
