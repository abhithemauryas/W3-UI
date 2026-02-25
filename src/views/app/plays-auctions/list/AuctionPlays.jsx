import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Tooltip,
  UncontrolledDropdown,
} from 'reactstrap';

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { NotificationManager } from 'components/common/react-notifications';
import ReactSelectComponent from 'components/common/ReactSelect';
import Modal from 'components/modals/Modal/Modal';
import { copyToClipboard } from 'helpers/copyToClipboard';
import IntlMessages from 'helpers/IntlMessages';
import { findByValue, getCurrentColor } from 'helpers/Utils';
import useFetchAuctionHouse from 'hooks/useFetchAuctionHouse';
import { connect } from 'react-redux';

import { getAuctionPlayConsumed } from 'redux/auctionPlayConsumed/actions.auctionPlayConsumed';
import { blockUser } from 'redux/user/userBlock/actions.userBlock';
import Pagination from 'components/table/Pagination';
import { pageSizes } from 'constants/constants';
import { getXpRecordsClanWise } from 'redux/auctionHouse/actions.auctionHouse';

const sortOptions = [{ column: 'total_plays_consumed', label: 'XPs Consumed' }];
const orderOptions = [
  { column: 'asc', label: 'Ascending' },
  { column: 'desc', label: 'Descending' },
];

const AuctionPlays = ({
  fetchConsumedAuctionPlays,
  users,
  metadata,
  errorMessage,
  dispatchBlockUser,
  auctionPlayConsumedList,
  xpRecordsClanWise,
  dispatchGetXpRecordsClanWise,
  loading,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [initialLoading, setInitialLoading] = useState(false);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'desc',
    label: 'Descending',
  });
  const [selectedSortOption, setSelectedSortOption] = useState(sortOptions[0]);
  const [selectedAuctionHouseId, setSelectedAuctionHouseId] = useState();
  const [auctionHouseModal, setAuctionHouseModal] = useState(false);
  const [selectedPageSize, setSelectedPageSize] = useState(20);
  const [search, setSearch] = useState('');
  const [darktheme, setDarkTheme] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [xpRecordsModal, setXpRecordsModal] = useState(false);

  const startPoint = 1;
  const endPoint = metadata.totalPage;
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  const changeOrderBy = (column) => {
    setSelectedOrderOption(orderOptions.find((x) => x.column === column));
  };
  const changeSortBy = (column) => {
    setSelectedSortOption(sortOptions.find((x) => x.column === column));
  };

  const onSearchKey = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const { auctionHouseData, auctionHouseDropdownList } = useFetchAuctionHouse();

  useEffect(() => {
    const color = getCurrentColor();
    if (color.includes('dark')) setDarkTheme(true);
    else setDarkTheme(false);
  }, [users]);

  useEffect(() => {
    setSelectedAuctionHouseId(auctionHouseData[0]?.id);
  }, [auctionHouseData]);

  useEffect(() => {
    const initialSelectedValue = findByValue(
      auctionHouseDropdownList,
      selectedAuctionHouseId
    );
    setSelectedValue(initialSelectedValue);
  }, [selectedAuctionHouseId]);

  useEffect(() => {
    let timeout;
    if (selectedAuctionHouseId) {
      if (search) {
        timeout = setTimeout(() => {
          fetchConsumedAuctionPlays(selectedAuctionHouseId, {
            search: search.trim(),
            limit: selectedPageSize,
            page: currentPage,
            _sort: selectedSortOption.column,
            _order: selectedOrderOption.column,
          });
          dispatchGetXpRecordsClanWise(selectedAuctionHouseId);
        }, 500);
      } else {
        fetchConsumedAuctionPlays(selectedAuctionHouseId, {
          limit: selectedPageSize,
          page: currentPage,
          _sort: selectedSortOption.column,
          _order: selectedOrderOption.column,
        });
        dispatchGetXpRecordsClanWise(selectedAuctionHouseId);
      }
    }
    return () => clearTimeout(timeout);
  }, [
    search,
    selectedPageSize,
    currentPage,
    selectedSortOption,
    selectedOrderOption,
    selectedAuctionHouseId,
  ]);
  const points = [];
  for (let i = startPoint; i <= endPoint; i += 1) {
    points.push(i);
  }
  useEffect(() => {
    if (initialLoading) {
      if (errorMessage) NotificationManager.error(null, errorMessage);
    }
  }, [errorMessage]);

  const blockUserHandler = (status, userId, toggleHandler) => {
    setInitialLoading(true);
    dispatchBlockUser({
      userId,
      data: { status },
      cb: () => {
        toggleHandler();
      },
    });
  };

  const selectedAuctionHouse = auctionHouseDropdownList?.find(
    (option) => option.value === selectedAuctionHouseId
  );

  const toggleAuctionHouseModal = () => {
    if (
      Array.isArray(auctionHouseDropdownList) &&
      auctionHouseDropdownList.length > 0
    ) {
      const aucObj = findByValue(
        auctionHouseDropdownList,
        selectedAuctionHouseId
      );
      setSelectedValue(aucObj);
    }
    setAuctionHouseModal(!auctionHouseModal);
  };

  const onAuctionHouseSelectChange = (option) => {
    setSelectedValue(option);
  };

  const onAuctionHouseClickOnView = () => {
    if (selectedValue && selectedValue?.value) {
      setSelectedAuctionHouseId(selectedValue.value);
      setAuctionHouseModal(false);
    }
  };

  const iconClassName = darktheme ? 'icon-white' : 'icon-black';

  return (
    <>
      <>
        <Row>
          <Colxx xxs="12">
            {/* <Breadcrumb heading="menu.list" match={match} /> */}
            <div className="d-block d-md-inline-block pt-1">
              <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                <DropdownToggle
                  caret
                  color="outline-dark"
                  size="xs"
                  onClick={() => setAuctionHouseModal(true)}
                >
                  <IntlMessages id="CLAN" />:{' '}
                  {selectedAuctionHouse?.label ??
                    auctionHouseDropdownList[0]?.label}
                </DropdownToggle>
              </UncontrolledDropdown>
              <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                <DropdownToggle caret color="outline-dark" size="xs">
                  <IntlMessages id="pages.sort" />
                  {selectedSortOption?.label}
                </DropdownToggle>
                <DropdownMenu>
                  {sortOptions.map((sort, index) => {
                    return (
                      <DropdownItem
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        onClick={() => changeSortBy(sort.column)}
                      >
                        {sort.label}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                <DropdownToggle caret color="outline-dark" size="xs">
                  <IntlMessages id="pages.orderby" />
                  {selectedOrderOption?.label}
                </DropdownToggle>
                <DropdownMenu>
                  {orderOptions.map((order, index) => {
                    return (
                      <DropdownItem
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        onClick={() => changeOrderBy(order.column)}
                      >
                        {order.label}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
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
                className="d-inline-block float-md-left mr-1 mb-1 align-top"
                color="outline-info"
                size="xs"
                onClick={() => setXpRecordsModal(true)}
                style={{ height: '28px', marginLeft: '50px' }}
              >
                <i className="simple-icon-chart mr-1" />
                XP Records
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
                        onClick={() => setSelectedPageSize(size)}
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
                    <th>Sr No.</th>
                    <th>Auction ID</th>
                    <th>Auction Type</th>
                    <th>Auction Name</th>
                    <th>Product Name</th>
                    <th>XPs Consumed</th>
                  </tr>
                </thead>

                {loading ? (
                  <div className="loading" />
                ) : (
                  <tbody>
                    {auctionPlayConsumedList?.length > 0 ? (
                      auctionPlayConsumedList?.map((item, index) => (
                        // TODO: Have to add different views
                        // if (displayMode === 'thumblist') {
                        <TableData
                          auctionConsumedPlaysData={item}
                          key={item.id}
                          blockUserHandler={blockUserHandler}
                          index={index}
                          iconClassName={iconClassName}
                        />
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="9"
                          className="nodatafound "
                          style={{ borderLeftStyle: 'none' }}
                        >
                          No Data Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                )}
              </table>
            </div>
          </Colxx>
        </Row>
        {!loading && metadata?.totalPages > 1 ? (
          <Pagination
            totalPage={metadata?.totalPages}
            currentPage={currentPage}
            handlePageClick={handlePageClick}
          />
        ) : (
          <Colxx xxs="12" className="mt-2" />
        )}
      </>

      {auctionHouseModal &&
        auctionHouseDropdownList &&
        auctionHouseDropdownList.length > 0 && (
          <Modal
            isOpen={auctionHouseModal}
            onClose={toggleAuctionHouseModal}
            modalHeader="Select CLAN"
            onSubmit={onAuctionHouseClickOnView}
            submitBtnText="View"
          >
            {selectedValue && (
              <ReactSelectComponent
                placeholder="Select a CLAN"
                defaultValue={selectedValue}
                value={selectedValue}
                onChange={onAuctionHouseSelectChange}
                options={auctionHouseDropdownList}
                isSearchable // Enable the search option
                className="custom-select-container"
                classNamePrefix="custom-select"
              />
            )}
          </Modal>
        )}

      <XpRecordsModal
        isOpen={xpRecordsModal}
        onClose={() => setXpRecordsModal(false)}
        toggle={() => setXpRecordsModal(!xpRecordsModal)}
        xpRecords={xpRecordsClanWise?.data?.[0] || {}}
        darktheme={darktheme}
      />
    </>
  );
};

const XpRecordsModal = ({ isOpen, onClose, toggle, xpRecords, darktheme }) => {
  const totalFreeXp =
    Number(xpRecords?.joining_bonus ?? 0) +
    Number(xpRecords?.referral_bonus ?? 0) +
    Number(xpRecords?.daily_claim ?? 0) +
    Number(xpRecords?.first_deposit ?? 0) +
    Number(xpRecords?.first_deposit_from_referred_user ?? 0);

  const totalXpBought = Number(xpRecords?.bought ?? 0);
  const totalXpInMarket =
    Number(totalFreeXp ?? 0) + Number(xpRecords?.bought ?? 0);
  const totalXpSpent =
    Number(xpRecords?.spent_on_bid ?? 0) +
    Number(xpRecords?.product_claim ?? 0);
  const totalXpRemaining = totalXpInMarket - totalXpSpent;

  // Calculate utilization percentage
  const xpPercentage =
    totalXpInMarket > 0
      ? `${Math.round((totalXpSpent / totalXpInMarket) * 100)}%`
      : '0%';

  const summaryCards = [
    {
      title: 'Total Free XP',
      value: totalFreeXp,
      icon: 'iconsminds-coins',
      color: 'success',
    },
    {
      title: 'Total XP Bought',
      icon: 'iconsminds-add-cart',
      value: totalXpBought || '0',
    },
    {
      title: 'Total XP in Market',
      value: totalXpInMarket,
      icon: 'iconsminds-shop',
      color: 'primary',
    },
    {
      title: 'Total XP Spent',
      value: totalXpSpent,
      icon: 'iconsminds-arrow-refresh',
      color: 'warning',
    },
    {
      title: 'Total XP Remaining',
      value: totalXpRemaining,
      icon: 'iconsminds-basket-coins',
      color: 'info',
    },
    {
      title: 'Utilization',
      value: xpPercentage,
      icon: 'iconsminds-pie-chart',
      color: 'secondary',
    },
  ];
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      toggle={toggle}
      modalHeader="XP Records Overview"
      onSubmit={onClose}
      submitBtnText="Close"
      hideCancelButton={() => true}
    >
      <div className={`xp-records-modal ${darktheme ? 'dark-theme' : ''}`}>
        {xpRecords?.uuid_id ? (
          <Row className="mb-4">
            {summaryCards.map((card, index) => (
              <Colxx
                key={`summary-${index + 1}`}
                xs="12"
                sm="6"
                lg="4"
                className="mb-3"
              >
                <Card className="h-100">
                  <CardBody className="text-center">
                    <i
                      className={`${card.icon} mb-2`}
                      style={{ fontSize: '2rem' }}
                    />
                    <h6 className="mb-1">{card.title}</h6>
                    <h4 className={`mb-0 text-${card.color}`}>{card.value}</h4>
                  </CardBody>
                </Card>
              </Colxx>
            ))}
          </Row>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted">No XP records available</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

const TableData = ({ auctionConsumedPlaysData, index, iconClassName }) => {
  const [auctionIDTooltipOpen, setAuctionIDTooltipOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyWalletAddress = (walletAddress) => {
    copyToClipboard(walletAddress);
    setIsCopied(true); // Set tooltip to open after copying
    setTimeout(() => {
      setIsCopied(false); // Close tooltip after a certain duration
    }, 2000); // Adjust the duration as needed
  };
  return (
    <tr key={auctionConsumedPlaysData.id}>
      <td>{index + 1}</td>
      <td>
        <div className="d-flex justify-content-center align-items-center">
          <div className="mr-1" id={`info-tooltip-id${index}`}>
            <span>{`${auctionConsumedPlaysData.auction_id
              ?.slice(0, 7)
              .toUpperCase()}...`}</span>
            <Button
              type="button"
              onClick={() =>
                handleCopyWalletAddress(auctionConsumedPlaysData.auction_id)
              }
              style={{
                padding: 0,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer', // Optional: Add pointer cursor for better UX
              }}
            >
              <span className={`iconsminds-files ml-1 ${iconClassName}`} />
              {isCopied && (
                <Tooltip
                  placement="top"
                  isOpen={isCopied}
                  target={`info-tooltip-id${index}`}
                  toggle={() => setIsCopied(!isCopied)}
                >
                  Copied
                </Tooltip>
              )}
            </Button>

            <Tooltip
              placement="top"
              isOpen={auctionIDTooltipOpen && !isCopied}
              target={`info-tooltip-id${index}`}
              toggle={() => setAuctionIDTooltipOpen(!auctionIDTooltipOpen)}
            >
              {auctionConsumedPlaysData.auction_id}
            </Tooltip>
          </div>
        </div>
      </td>
      <td>{auctionConsumedPlaysData.auction_type ?? '-'}</td>
      <td>{auctionConsumedPlaysData.auction_name}</td>
      <td>{auctionConsumedPlaysData.product_name}</td>
      <td>{auctionConsumedPlaysData.total_plays_consumed}</td>

      {/* <td>{user.auction_won >= 0 ? user.auction_won : '-'}</td> */}
      {/* <td>
        <div className="w-100 d-flex justify-content-center ">
          <Switch
            id="tooltip_switch"
            className={`custom-switch custom-switch-small ${'custom-switch-primary'}`}
            checked={toggle}
            onClick={() => blockUserHandler(status, user.id, toggleHandler)}
          />
        </div>
      </td> */}
    </tr>
  );
};

const mapStateToProps = ({ auctionPlayConsumed, auctionHouses }) => {
  const {
    successMessage,
    errorMessage,
    loading,
    auctionPlayConsumedList,
    auctionHouseDropdownData,
    metadata,
  } = auctionPlayConsumed;

  const { xpRecordsClanWise } = auctionHouses;

  return {
    successMessage,
    errorMessage,
    loading,
    xpRecordsClanWise,
    auctionPlayConsumedList,
    auctionHouseDropdownData,
    metadata,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    fetchConsumedAuctionPlays: (auctionId, params) =>
      dispatch(getAuctionPlayConsumed(auctionId, params)),
    dispatchBlockUser: (params) => dispatch(blockUser(params)),
    dispatchGetXpRecordsClanWise: (id) =>
      dispatch(getXpRecordsClanWise({ id })),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(AuctionPlays);
