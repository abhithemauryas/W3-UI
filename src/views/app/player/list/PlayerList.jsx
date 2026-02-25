import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import {
  Button,
  CustomInput,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Label,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Tooltip,
  UncontrolledDropdown,
  Modal as ReactstrapModal,
} from 'reactstrap';

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { connect } from 'react-redux';
import IntlMessages from 'helpers/IntlMessages';
import { NotificationManager } from 'components/common/react-notifications';
import {
  copyToClipboard,
  displayWalletAddress,
  getCurrentColor,
} from 'helpers/Utils';
import { getAuctionHouse } from 'redux/auctionHouse/actions.auctionHouse';
import Pagination from 'components/table/Pagination';
import { pageSizes } from 'constants/constants';
import {
  blockPlayer,
  expirePlayerBallance,
  getAllPlayers,
  uploadOnboardPlayer,
} from 'redux/user/actions';
import { TOOL_TIP_TEXT } from 'constants/defaultValues';
import { Form, Formik } from 'formik';

const PlayerList = ({
  fetchUsers,
  users,
  metadata,
  blockErrorMessage,
  blockSuccessMessage,
  dispatchBlockUser,
  auctionHouseData,
  loading,
  dispatchUploadFiles,
  dispatchExpirePlays,
  expireBalanceLoading,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [initialLoading, setInitialLoading] = useState(false);
  const [selectedAuctionHouseId, setSelectedAuctionHouseId] = useState('');
  const [selectedPageSize, setSelectedPageSize] = useState(20);
  const [search, setSearch] = useState('');
  const [darktheme, setDarkTheme] = useState(false);
  const [onBoardPlayerModal, setOnBoardPlayerModal] = useState(false);
  const [playsExpireModal, setPlaysExpireModal] = useState(false);
  const [userData, setUserData] = useState({});

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

  const errorHandler = (res) => {
    if (!res.success) NotificationManager.error(res?.message, res?.message);
  };

  const OnBoardModalCallBack = () => {
    fetchUsers(
      {
        limit: selectedPageSize,
        page: currentPage,
        auction_house_id: selectedAuctionHouseId,
      },
      errorHandler
    );
  };

  useEffect(() => {
    let timeout;
    if (search) {
      timeout = setTimeout(() => {
        fetchUsers(
          {
            search: search.trim(),
            limit: selectedPageSize,
            page: currentPage,
          },
          errorHandler
        );
      }, 500);
    } else
      fetchUsers(
        {
          limit: selectedPageSize,
          page: currentPage,
        },
        errorHandler
      );
    return () => clearTimeout(timeout);
  }, [search, selectedPageSize, currentPage, selectedAuctionHouseId]);
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
      <>
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
                onClick={() => setOnBoardPlayerModal(true)}
              >
                <IntlMessages id="pages.onboard-players" />
              </Button>
            </div>
            <div className="float-md-right pt-1">
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
            <div className="responsive w-100 overflow-x-auto">
              <table
                className={`w-100 custom-table  ${
                  !darktheme ? 'lighttheme' : 'darktheme'
                }`}
              >
                <thead>
                  <tr>
                    <th>PlayerId</th>
                    <th>Name</th>
                    <th>Wallet Address</th>
                    <th>Email</th>
                    <th>Telegram</th>
                    <th>Phone Number</th>
                    <th>Total XPs</th>
                    <th>Auctions Participated</th>
                    <th>Auctions Won</th>
                    <th>Country</th>
                    <th>XPs Expire</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="15" className="nodatafound ">
                        <div className="w-100 h-100 position-relative">
                          <div className="loading" />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {users?.length ? (
                        users.map((user) => (
                          <TableData
                            user={user}
                            key={user.id}
                            blockUserHandler={blockUserHandler}
                            expireCallback={(player) => {
                              setPlaysExpireModal(true);
                              setUserData(player);
                            }}
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
                    </>
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

      <OnBoardModal
        isOpen={onBoardPlayerModal}
        toggle={() => setOnBoardPlayerModal(false)}
        dispatchUploadFiles={dispatchUploadFiles}
        callback={OnBoardModalCallBack}
      />
      <ExpirePLaysConfirmModal
        dispatchExpirePlays={dispatchExpirePlays}
        playsExpireModal={playsExpireModal}
        toggle={() => {
          setPlaysExpireModal(false);
          setUserData({});
        }}
        userData={userData}
        expireBalanceLoading={expireBalanceLoading}
      />
    </>
  );
};

const TableData = ({ user, expireCallback }) => {
  const [tooltipOpen, setTooltipOpen] = useState({
    id: false,
    aux_wallet_address: false,
  });
  const [tooltipText, setTooltipText] = useState(TOOL_TIP_TEXT.COPY);

  // const [toggle, setToggle] = useState(user.status);
  // const [status, setStatus] = useState(!user.status);
  // const toggleHandler = () => {
  //   setToggle((changeToggle) => !changeToggle);
  //   setStatus((changeStatus) => !changeStatus);
  // };
  return (
    <tr key={user?.id}>
      <td>
        {user?.id ? displayWalletAddress(user?.id, 4) : '-'}

        <span
          role="presentation"
          className="iconsminds-files ml-1 c-pointer"
          onClick={() => {
            setTooltipText(TOOL_TIP_TEXT.COPIED);
            copyToClipboard(user.id);
          }}
          id={`tooltip_userId_${user.id}`}
        />
        <Tooltip
          placement="top"
          isOpen={tooltipOpen?.id}
          target={`tooltip_userId_${user?.id}`}
          toggle={() => {
            if (!tooltipOpen?.id) setTooltipText(TOOL_TIP_TEXT.COPY);

            setTooltipOpen((prev) => ({
              ...prev,
              id: !prev.id,
            }));
          }}
        >
          {tooltipText}
        </Tooltip>
      </td>
      <td>{[user?.first_name, user?.last_name].join(' ') || '-'}</td>

      <td>
        {user.aux_wallet_address ? (
          <div className="position-relative">
            {displayWalletAddress(user.aux_wallet_address, 4)}
            <span
              role="presentation"
              className="iconsminds-files ml-1 c-pointer"
              onClick={() => {
                setTooltipText(TOOL_TIP_TEXT.COPIED);
                copyToClipboard(user.aux_wallet_address);
              }}
              id={`tooltip_${user.id}`}
            />
            <Tooltip
              placement="top"
              isOpen={tooltipOpen?.aux_wallet_address}
              target={`tooltip_${user?.id}`}
              toggle={() => {
                if (!tooltipOpen?.aux_wallet_address)
                  setTooltipText(TOOL_TIP_TEXT.COPY);
                setTooltipOpen((prev) => ({
                  ...prev,
                  aux_wallet_address: !prev.aux_wallet_address,
                }));
              }}
            >
              {tooltipText}
            </Tooltip>
          </div>
        ) : (
          '-'
        )}
      </td>
      <td>{user?.email || '-'}</td>
      <td>{user?.telegram_id || '-'}</td>
      <td>{user?.mobile_no || '-'}</td>
      <td>{user?.walletBalance >= 0 ? user.walletBalance : '-'}</td>
      <td>{user?.Player_Participated >= 0 ? user.Player_Participated : '-'}</td>
      <td>{user?.Auction_Won >= 0 ? user.Auction_Won : '-'}</td>
      <td>{user?.country || '-'}</td>
      <td>
        <Button
          color="primary text-small m-0 py-1 px-2"
          onClick={() => expireCallback(user)}
        >
          Expire
        </Button>
      </td>
    </tr>
  );
};

const OnBoardModal = ({ isOpen, toggle, dispatchUploadFiles, callback }) => {
  const validationSchema = Yup.object().shape({
    playerList: Yup.mixed()
      .required('Player list is required')
      .test('fileFormat', 'Only .xls and .xlsx files are allowed', (value) => {
        if (value && value.length) {
          const file = value[0];
          const validExtensions = ['.xls', '.xlsx'];
          return validExtensions.some((ext) => file.name.endsWith(ext));
        }
        return false;
      }),
  });

  const handleFileSubmit = (values, { resetForm, setSubmitting }) => {
    const data = new FormData();
    const playerList = values?.playerList || [];
    if (playerList.length === 1) {
      data.append('media', playerList?.[0]);

      dispatchUploadFiles(data, (res) => {
        if (res.success) {
          toggle?.();
          resetForm();
          setSubmitting(false);
          callback();
          NotificationManager.success(res?.message);
        } else {
          console.log(res, 'error<----');
          NotificationManager.error(res?.message);
        }
      });
    }
  };
  return (
    <ReactstrapModal isOpen={isOpen} toggle={() => toggle()}>
      <Formik
        initialValues={{ playerList: '' }}
        validationSchema={validationSchema}
        onSubmit={handleFileSubmit}
      >
        {({
          setFieldTouched,
          errors,
          touched,
          setFieldValue,
          isSubmitting,
        }) => (
          <Form>
            <ModalHeader>
              <IntlMessages id="onboard-modal.title" />
            </ModalHeader>
            <ModalBody>
              <div className="d-flex flex-wrap">
                <div className="d-flex flex-wrap flex-sm-nowrap gap-40 w-100 mb-2">
                  <div className="w-100">
                    <FormGroup>
                      <Label>
                        Player List <span className="text-danger">*</span>
                      </Label>
                      <CustomInput
                        type="file"
                        name="playerList"
                        id="playerList"
                        accept=".xls,.xlsx"
                        className="overflow-hidden"
                        onChange={(e) => {
                          const files = e.target?.files;
                          if (files.length > 0) {
                            setFieldValue('playerList', files);
                            setFieldTouched('playerList', true);
                          } else {
                            setFieldValue('playerList', '');
                          }
                        }}
                        onBlur={() => setFieldTouched('playerList', true)}
                      />

                      {errors.playerList && touched.playerList ? (
                        <div className="position-absolute field-error">
                          {errors.playerList}
                        </div>
                      ) : null}
                    </FormGroup>
                  </div>
                </div>{' '}
              </div>
            </ModalBody>

            <ModalFooter>
              <Button
                className={`btn-multiple-state ${
                  isSubmitting ? 'show-spinner' : ''
                }`}
                disabled={isSubmitting}
                color="primary"
                type="submit"
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                <span className="label">
                  <IntlMessages id="modal.save" />
                </span>
              </Button>
              <Button color="secondary" onClick={() => toggle()}>
                <IntlMessages id="deletemodal.cancel" />
              </Button>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </ReactstrapModal>
  );
};

export const ExpirePLaysConfirmModal = ({
  playsExpireModal,
  toggle,
  userData,
  dispatchExpirePlays,
  expireBalanceLoading,
}) => {
  function getPreferredValue(player) {
    const fullName = `${player?.first_name || ''} ${
      player?.last_name || ''
    }`.trim();

    if (fullName) {
      return fullName;
    }

    if (player?.mobile_no) {
      return player?.mobile_no;
    }

    if (player?.email) {
      return player?.email;
    }

    if (player?.telegram_id) {
      return player?.telegram_id;
    }

    return player?.id;
  }

  return (
    <ReactstrapModal isOpen={playsExpireModal} toggle={toggle}>
      <ModalHeader>
        <IntlMessages id="modal.plays-expiration-confirmation" />
      </ModalHeader>
      <ModalBody>
        <div>
          <p>
            Are you sure you want to expire the remaining XPs for{' '}
            <span className="text-primary">{getPreferredValue(userData)}</span>?
          </p>
          <p>This action is irreversible.</p>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button
          className={`btn-multiple-state ${
            expireBalanceLoading ? 'show-spinner' : ''
          }`}
          disabled={expireBalanceLoading}
          color="primary"
          type="submit"
          onClick={() =>
            dispatchExpirePlays({
              data: { ids: [userData?.id] },
              cb: (res) => {
                if (res?.success) toggle();
                else NotificationManager.error(null, res?.message);
              },
            })
          }
        >
          <span className="spinner d-inline-block">
            <span className="bounce1" />
            <span className="bounce2" />
            <span className="bounce3" />
          </span>
          <span className="label">
            <IntlMessages id="modal.expire" />
          </span>
        </Button>
        <Button color="secondary" onClick={toggle}>
          <IntlMessages id="deletemodal.cancel" />
        </Button>
      </ModalFooter>
    </ReactstrapModal>
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
    fetchUsers: (params, cb) => dispatch(getAllPlayers({ params, cb })),
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

export default connect(mapStateToProps, mapActionsToProps)(PlayerList);
