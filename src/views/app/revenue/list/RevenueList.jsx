import { useEffect, useState } from 'react';
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Tooltip,
  UncontrolledDropdown,
} from 'reactstrap';

// import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { NotificationManager } from 'components/common/react-notifications';
import ReactSelectComponent from 'components/common/ReactSelect';
import Modal from 'components/modals/Modal/Modal';
import { copyToClipboard } from 'helpers/copyToClipboard';
import IntlMessages from 'helpers/IntlMessages';
import {
  findByValue,
  getCurrentColor,
  getFullDateConvert,
} from 'helpers/Utils';
import useFetchAuctionHouse from 'hooks/useFetchAuctionHouse';
import { connect } from 'react-redux';
import { getRevenueList } from 'redux/revenue/actions.revenue';
import { blockUser } from 'redux/user/userBlock/actions.userBlock';
import { orderOptions, pageSizes } from 'constants/constants';
import Pagination from 'components/table/Pagination';

const sortOptions = [
  { column: 'total_plays_consumed', label: 'XPs Consumed' },
  { column: 'revenue', label: 'Revenue' },
  { column: 'product_price', label: 'Product Price' },
  { column: 'net', label: 'Net' },
];

const RevenueList = ({
  errorMessage,
  revenueList,
  metadata,
  fetchRevenueList,
  loading,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'asc',
    label: 'Ascending',
  });
  const [selectedSortOption, setSelectedSortOption] = useState(sortOptions[1]);
  const [selectedAuctionHouseId, setSelectedAuctionHouseId] = useState();

  const [selectedPageSize, setSelectedPageSize] = useState(20);
  const [search, setSearch] = useState('');
  const [darktheme, setDarkTheme] = useState(false);
  const [auctionHouseModal, setAuctionHouseModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const { auctionHouseData, auctionHouseDropdownList } = useFetchAuctionHouse();

  const changeOrderBy = (column) => {
    setSelectedOrderOption(orderOptions.find((x) => x.column === column));
  };

  const changeSortBy = (column) => {
    setSelectedSortOption(sortOptions.find((x) => x.column === column));
  };

  const onSearchKey = (e) => {
    setSearch(e.target.value.toLowerCase());
  };
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

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
    const color = getCurrentColor();
    if (color.includes('dark')) setDarkTheme(true);
    else setDarkTheme(false);
  }, []);

  useEffect(() => {
    let timeout;
    if (selectedAuctionHouseId) {
      if (search) {
        timeout = setTimeout(() => {
          fetchRevenueList(selectedAuctionHouseId, {
            search: search.trim(),
            limit: selectedPageSize,
            page: currentPage,
            _sort: selectedSortOption.column,
            _order: selectedOrderOption.column,
          });
        }, 500);
      } else
        fetchRevenueList(selectedAuctionHouseId, {
          limit: selectedPageSize,
          page: currentPage,
          _sort: selectedSortOption.column,
          _order: selectedOrderOption.column,
        });
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

  useEffect(() => {
    if (errorMessage) NotificationManager.error(null, errorMessage);
  }, [errorMessage]);

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
          <Colxx xxs="12">
            <div className="responsive w-100 overflow-x">
              <table
                className={`w-100 custom-table  ${
                  !darktheme ? 'lighttheme' : 'darktheme'
                }`}
              >
                <thead>
                  <tr>
                    <th>Auction ID</th>
                    <th>Auction Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>XPs Consumed</th>
                    <th>Revenue(In Xp)</th>
                    <th>Product Price</th>
                    <th>Net</th>
                  </tr>
                </thead>

                {loading ? (
                  <div className="loading" />
                ) : (
                  <tbody>
                    {revenueList?.length ? (
                      revenueList.map((revenue, index) => (
                        // TODO: Have to add different views
                        // if (displayMode === 'thumblist') {
                        <TableData
                          key={revenue?.id}
                          revenue={revenue}
                          index={index}
                          iconClassName={iconClassName}
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
                )}
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

      {auctionHouseModal &&
        auctionHouseDropdownList &&
        auctionHouseDropdownList.length > 0 && (
          <Modal
            isOpen={
              auctionHouseModal &&
              auctionHouseDropdownList &&
              auctionHouseDropdownList.length > 0
            }
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
    </>
  );
};

const TableData = ({ revenue, iconClassName, index }) => {
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
    <tr key={revenue?.id}>
      <td>
        <div className="d-flex justify-content-center align-items-center">
          <div className="mr-1" id={`info-tooltip-id${index}`}>
            <span>{`${revenue.auction_id?.slice(0, 7).toUpperCase()}...`}</span>
            <Button
              type="button"
              onClick={() => handleCopyWalletAddress(revenue.auction_id)}
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
              {revenue?.auction_id}
            </Tooltip>
          </div>
        </div>
      </td>
      <td>{revenue?.auction_name}</td>
      <td>
        {revenue.start_date ? getFullDateConvert(revenue.start_date) : '-'}
      </td>
      <td>{revenue.end_date ? getFullDateConvert(revenue.end_date) : '-'}</td>
      <td>{revenue?.total_plays_consumed}</td>
      <td>{`${revenue?.revenue}`}</td>
      <td>{revenue?.product_price}</td>
      <td
        style={{
          color: revenue?.net < 0 ? 'red' : 'green',
          fontWeight: 'bold',
        }}
      >
        {revenue?.net}
      </td>

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

const mapStateToProps = ({ revenue }) => {
  const { successMessage, errorMessage, loading, revenueList, metadata } =
    revenue;

  return {
    successMessage,
    errorMessage,
    loading,
    revenueList,
    metadata,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    fetchRevenueList: (auctionId, params) =>
      dispatch(getRevenueList(auctionId, params)),
    dispatchBlockUser: (params) => dispatch(blockUser(params)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(RevenueList);
