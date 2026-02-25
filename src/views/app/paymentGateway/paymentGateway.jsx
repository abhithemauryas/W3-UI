import React, { useEffect, useState } from 'react';
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
  getPaymentOpetions,
  updatePaymentGateway,
} from 'redux/auction/httpCalls.auction';

const PaymentGateway = ({
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
  const [metadata, setMetadata] = useState({ totalRecord: 0, totalPages: 1 });

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
    const params = {
      limit: selectedPageSize,
      page: currentPage + 1,
      type: 'PAYMENT_METHOD_ALLOWED',
    };
    if (search.trim()) {
      params.search = search.trim();
    }
    const fetch = () => {
      getPaymentOpetions(params)
        .then((res) => {
          setUsers(res?.data || []);
          setMetadata(res?.metadata || { totalRecord: 0, totalPages: 1 });
        })
        .catch(() => {
          NotificationManager.error(null, 'Failed to fetch payment options');
        });
    };
    if (search) {
      timeout = setTimeout(fetch, 500);
    } else {
      fetch();
    }
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
            <div className="responsive w-100 overflow-x">
              <table
                className={`w-100 custom-table  ${
                  !darktheme ? 'lighttheme' : 'darktheme'
                }`}
              >
                <thead>
                  <tr>
                    <th>CLAN</th>
                    <th>Payment Gateway</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <div className="w-100 h-100 position-relative">
                      {' '}
                      <div className="loading" />
                    </div>
                  ) : (
                    <>
                      {users?.length ? (
                        users.map((user) => (
                          // TODO: Have to add different views
                          // if (displayMode === 'thumblist') {
                          <TableData
                            user={user}
                            key={user.id}
                            blockUserHandler={blockUserHandler}
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
    </>
  );
};

const TableData = ({ user }) => {
  const [gateways, setGateways] = React.useState({
    blockbolt: !!user?.config?.blockbolt,
    paypal: !!user?.config?.paypal,
    upi: !!user?.config?.upi,
  });
  const [updateLoading, setUpdateLoading] = React.useState(false);

  const handleCheckbox = (key) => {
    setGateways((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleUpdate = () => {
    setUpdateLoading(true);
    updatePaymentGateway({
      auction_house_id: user.id,
      config_type: 'PAYMENT_METHOD_ALLOWED',
      config_value: {
        paypal: gateways.paypal,
        blockbolt: gateways.blockbolt,
        upi: gateways.upi,
      },
    })
      .then((res) => {
        NotificationManager.success(res?.message || 'Updated!');
        setUpdateLoading(false);
      })
      .catch(() => {
        setUpdateLoading(false);
        NotificationManager.error('Update failed!');
      });
  };

  return (
    <tr key={user?.id}>
      <td>{user?.name || '-'}</td>
      <td>
        <div>
          <label htmlFor={`blockbolt-${user.id}`} style={{ marginRight: 12 }}>
            <input
              id={`blockbolt-${user.id}`}
              type="checkbox"
              checked={gateways.blockbolt}
              onClick={() => handleCheckbox('blockbolt')}
            />{' '}
            Crypto
          </label>
          <label htmlFor={`paypal-${user.id}`} style={{ marginRight: 12 }}>
            <input
              id={`paypal-${user.id}`}
              type="checkbox"
              checked={gateways.paypal}
              onClick={() => handleCheckbox('paypal')}
            />{' '}
            Paypal
          </label>
          <label htmlFor={`upi-${user.id}`}>
            <input
              id={`upi-${user.id}`}
              type="checkbox"
              checked={gateways.upi}
              onClick={() => handleCheckbox('upi')}
            />{' '}
            UPI
          </label>
        </div>
      </td>
      <td>
        <Button color="primary" onClick={handleUpdate} disabled={updateLoading}>
          {updateLoading && <span className="loading" style={{ marginRight: 8 }} />}
          Update
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

export default connect(mapStateToProps, mapActionsToProps)(PaymentGateway);
