/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import AnalyticsDoughnut from 'components/analyticsDoughnut';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { NotificationManager } from 'components/common/react-notifications';
import IntlMessages from 'helpers/IntlMessages';
import { formatDate, getCurrentColor } from 'helpers/Utils';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';
import { getAnalyticsList } from 'redux/analytics/actions.analytics';
import { getGlobalAnalytics } from 'redux/globalAnalytics/actions.globalAnalytics';

const pageSizes = [20, 40, 60, 80, 100];

const Aanalytics = (props) => {
  const {
    successMessage,
    errorMessage,
    fetchAnalytics,
    metadata,
    analyticsList,
    fetchGlobalAnalytics,
    // globalAnalyticsData,
    successMsg,
    errorMsg,
    loading,
    // globalLoading,
  } = props;
  const numberLimit = 5;
  const firstIsActive = true;
  const lastIsActive = true;
  let startPoint = 1;
  let endPoint = numberLimit;

  const [darktheme, setDarkTheme] = useState(false);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'title',
    label: 'Product Name',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(20);
  const [search, setSearch] = useState('');
  const [totalPage, setTotalPage] = useState(1);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [initialLoading, setInitialLoading] = useState(false);
  const onSearchKey = (e) => {
    setSearch(e.target.value.toLowerCase());
  };
  useEffect(() => {
    setTotalPage(metadata.totalPage);
    // TODO: Activate List of the big deal
    setTotalItemCount(metadata.recordCount);
  }, [metadata]);
  const orderOptions = [
    { column: 'title', label: 'Product Name' },
    { column: 'category', label: 'Category' },
    { column: 'status', label: 'Status' },
  ];
  const changeOrderBy = (column) => {
    setSelectedOrderOption(orderOptions.find((x) => x.column === column));
  };
  const firstPageButtonClassName = currentPage <= 1 ? 'disabled' : '';
  const lastPageButtonClassName = currentPage >= totalPage ? 'disabled' : '';
  const prevPageButtonClassName = currentPage <= 1 ? 'disabled' : '';
  const nextPageButtonClassName = currentPage >= totalPage ? 'disabled' : '';

  const endIndex = currentPage * selectedPageSize;

  if (numberLimit > totalPage) {
    startPoint = 1;
    endPoint = totalPage;
  } else if (currentPage <= parseInt(numberLimit / 2, 10)) {
    startPoint = 1;
    endPoint = numberLimit;
  } else if (currentPage + parseInt(numberLimit / 2, 10) <= totalPage) {
    startPoint = currentPage - parseInt(numberLimit / 2, 10);
    endPoint = currentPage + parseInt(numberLimit / 2, 10);
  } else {
    startPoint = totalPage - (numberLimit - 1);
    endPoint = totalPage;
  }
  startPoint = startPoint === 0 ? 1 : startPoint;
  const points = [];
  for (let i = startPoint; i <= endPoint; i += 1) {
    points.push(i);
  }

  useEffect(() => {
    const color = getCurrentColor();
    if (color.includes('dark')) setDarkTheme(true);
    else setDarkTheme(false);
  }, []);

  useEffect(() => {
    if (initialLoading) {
      if (successMessage) {
        // NotificationManager.success(null, successMessage);
      } else if (errorMessage) NotificationManager.error(null, errorMessage);
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    if (initialLoading) {
      if (successMsg) {
        // NotificationManager.success(null, successMsg);
      } else if (errorMessage) NotificationManager.error(null, errorMsg);
    }
  }, [successMsg, errorMsg]);

  useEffect(() => {
    setInitialLoading(true);
    if (search) {
      fetchAnalytics({
        page: currentPage - 1,
        limit: selectedPageSize,
        search,
      });
    } else {
      fetchAnalytics({ page: currentPage - 1, limit: selectedPageSize });
    }
  }, [currentPage, selectedPageSize, search]);

  useEffect(() => {
    fetchGlobalAnalytics();
  }, []);

  return (
    <>
      {/* //TODO: this is not needed this time */}
      {/* <div className=" d-flex justify-content-around ">
        {!globalLoading ? (
          <>
            {globalAnalyticsData?.total_sum_plays_live_consumed_auction ? (
              <>
                <AnalyticsDoughnut
                  title="Global Analytics "
                  height={250}
                  width={500}
                  playsInAuction={
                    globalAnalyticsData?.total_sum_plays_live_consumed_auction
                  }
                  playRefunded={
                    globalAnalyticsData?.total_sum_play_consumed_refund_after_buy_now
                  }
                  playInRegistration={
                    globalAnalyticsData?.total_sum_play_consumed_preregister
                  }
                  profitInCurrency={
                    globalAnalyticsData.total_profit_currency
                      ? globalAnalyticsData.total_profit_currency
                      : 0
                  }
                  profitInPlays={
                    globalAnalyticsData.total_profit_plays
                      ? globalAnalyticsData.total_profit_plays
                      : 0
                  }
                  currencyCode={globalAnalyticsData?.currency_code}
                />
              </>
            ) : (
              <div />
            )}
          </>
        ) : (
          <i className="loading" />
        )}
      </div> */}
      {!loading ? (
        <>
          <Row>
            <Colxx xxs="12">
              <div className="mb-2 ">
                <Button
                  color="empty"
                  className="pt-0 pl-0 d-inline-block d-md-none"
                  onClick={() => setDisplayOptionsIsOpen(!displayOptionsIsOpen)}
                >
                  <IntlMessages id="pages.display-options" />{' '}
                  <i className="simple-icon-arrow-down align-middle" />
                </Button>
                <Collapse
                  isOpen={displayOptionsIsOpen}
                  className="d-md-block"
                  id="displayOptions"
                >
                  <div className="d-block d-md-inline-block pt-1 mb-4">
                    <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1 d-md-none ">
                      <DropdownToggle caret color="outline-dark" size="xs">
                        <IntlMessages id="pages.orderby" />
                        {selectedOrderOption.label}
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
                    <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top d-md-none">
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
                      {currentPage}-
                      {currentPage >= endIndex ? endIndex : totalItemCount}
                      {metadata.totalPage}
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
                </Collapse>
              </div>
              <Separator className="mb-5" />
            </Colxx>
          </Row>
          <div className="responsive w-100 overflow-x">
            <table
              className={`w-100 custom-table ${
                !darktheme ? 'lighttheme' : 'darktheme'
              }`}
            >
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Auction Type</th>
                  <th>Product Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {analyticsList.length ? (
                  analyticsList.map((analytics) => {
                    // TODO: Have to add different views
                    // if (displayMode === 'thumblist') {
                    return (
                      <TableData
                        analytics={analytics}
                        key={analytics.auction_id}
                      />
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="9" className="nodatafound">
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Row>
            {/* Pagination starts here */}
            {totalPage > 1 ? (
              <Colxx xxs="12" className="mt-3 mb-3">
                <Nav className="pagination justify-content-center">
                  {firstIsActive && (
                    <NavItem
                      className={`page-item ${firstPageButtonClassName}`}
                    >
                      <NavLink
                        className="page-link first c-pointer"
                        onClick={() => setCurrentPage(1)}
                      >
                        <i className="simple-icon-control-start" />
                      </NavLink>
                    </NavItem>
                  )}

                  <NavItem className={`page-item ${prevPageButtonClassName}`}>
                    <NavLink
                      className="page-link prev c-pointer"
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      <i className="simple-icon-arrow-left" />
                    </NavLink>
                  </NavItem>
                  {points.map((i) => {
                    return (
                      <NavItem
                        key={i}
                        className={`page-item ${currentPage === i && 'active'}`}
                      >
                        <NavLink
                          className="page-link c-pointer"
                          onClick={() => setCurrentPage(i)}
                        >
                          {i}
                        </NavLink>
                      </NavItem>
                    );
                  })}
                  <NavItem className={`page-item ${nextPageButtonClassName}`}>
                    <NavLink
                      className="page-link next c-pointer"
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      <i className="simple-icon-arrow-right" />
                    </NavLink>
                  </NavItem>
                  {lastIsActive && (
                    <NavItem className={`page-item ${lastPageButtonClassName}`}>
                      <NavLink
                        className="page-link last c-pointer"
                        onClick={() => setCurrentPage(totalPage)}
                      >
                        <i className="simple-icon-control-end" />
                      </NavLink>
                    </NavItem>
                  )}
                </Nav>
              </Colxx>
            ) : (
              <Colxx xxs="12" className="mt-2" />
            )}

            {/* End Pagination */}
          </Row>
        </>
      ) : null}
    </>
  );
};

const TableData = ({ analytics }) => {
  const [collapse, setCollapse] = useState(false);

  return (
    <tr>
      <td colSpan="6 c">
        <Row>
          <Colxx xxs="12">
            <Card className="p-0">
              <CardBody className="pt-0 pb-0">
                <table
                  className="w-100 custom-table"
                  onClick={() => setCollapse(!collapse)}
                  onKeyDown={() => {}}
                >
                  <tr style={{ cursor: 'pointer' }}>
                    <td style={{ width: '160px' }}>{analytics.auction_name}</td>
                    <td>{analytics?.auction_category_name}</td>
                    <td>{analytics?.product_title}</td>

                    <td>{formatDate(analytics?.auction_start_date)}</td>
                    <td style={{ width: '160px', maxWidth: '160px' }}>
                      {formatDate(analytics?.updated_at)}{' '}
                    </td>
                    <td>
                      <div className="custom-control custom-checkbox pl-1 align-self-center d-flex justify-content-center align-items-center font-20 gap-20 c-pointer">
                        <i
                          className={`${
                            collapse ? 'arrow-rotate' : ''
                          }  simple-icon-arrow-down arrow-transition `}
                          role="button"
                          tabIndex={0}
                          onClick={() => setCollapse(!collapse)}
                          onKeyDown={() => {}}
                        />
                      </div>
                    </td>
                  </tr>
                </table>

                <Collapse isOpen={collapse}>
                  <div className="py-2 d-flex justify-content-around align-items-center">
                    <AnalyticsDoughnut
                      title={analytics?.auction_name}
                      height={200}
                      width={400}
                      playsInAuction={
                        analytics?.total_plays_live_consumed_auction
                      }
                      playRefunded={
                        analytics?.total_play_consumed_refund_after_buy_now
                      }
                      playInRegistration={
                        analytics?.total_play_consumed_preregister
                      }
                      profitInCurrency={
                        analytics.total_profit_currency
                          ? analytics.total_profit_currency
                          : 0
                      }
                      profitInPlays={
                        analytics.total_profit_plays
                          ? analytics.total_profit_plays
                          : 0
                      }
                      currencyCode={analytics?.currency_code}
                    />
                  </div>
                </Collapse>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </td>
    </tr>
  );
};
const mapStateToProps = ({ analytics, globalAnalytics }) => {
  const {
    successMessage: successMsg,
    errorMessage: errorMsg,
    globalAnalyticsData,
    loading: globalLoading,
  } = globalAnalytics;
  const { successMessage, errorMessage, analyticsList, loading, metadata } =
    analytics;
  return {
    successMessage,
    errorMessage,
    analyticsList,
    loading,
    metadata,
    globalAnalyticsData,
    successMsg,
    errorMsg,
    globalLoading,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    fetchAnalytics: (params) => dispatch(getAnalyticsList({ ...params })),
    fetchGlobalAnalytics: () => dispatch(getGlobalAnalytics()),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Aanalytics);
