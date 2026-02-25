/* eslint-disable no-unused-expressions */
import classnames from 'classnames';
import { Colxx } from 'components/common/CustomBootstrap';
import { NotificationManager } from 'components/common/react-notifications';
import ReactSelectComponent from 'components/common/ReactSelect';
import DeleteModal from 'components/modals/DeleteModal';
import Modal from 'components/modals/Modal/Modal';
import ListHeading from 'components/table/ListHeading';
import { auctionsList } from 'data/admin';
import {
  convertToDropdownData,
  findByValue,
  getCurrentColor,
} from 'helpers/Utils';
import useMousetrap from 'hooks/use-mousetrap';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Modal as ReactModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap';
import {
  addAuctionStart,
  deleteAuction,
  getAuctions,
  updateAuction,
} from 'redux/auction/actions.auction';
import {
  forceStopAuction,
  getAuctionHouse,
} from 'redux/auctionHouse/actions.auctionHouse';
import { orderOptions, pageSizes } from 'constants/constants';
import Pagination from 'components/table/Pagination';
import IntlMessages from 'helpers/IntlMessages';
import ActiveStateAuctionList from './activeStateAuctionList';

const sortOptions = [
  { column: 'title', label: 'Title' },
  { column: 'auctiontype', label: 'Auction Type' },
  { column: 'startdate', label: 'Start Date' },
];

const AuctionList = ({
  fetchAuctionHouses,
  fetchAuctions,
  dispatchDeleteauction,
  successMesage,
  errorMessage,
  loading,
  metadata,
  auctions,
  match,
  dispatchStartAuction,
  dispatchUpdateAuction,
  auctionHouseData,
  dispatchForceStop,
}) => {
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPageSize, setSelectedPageSize] = useState(20);
  const [selectedOrderOption, setSelectedOrderOption] = useState(
    orderOptions[0]
  );
  const [selectedSortOption, setSelectedSortOption] = useState(sortOptions[0]);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [darktheme, setDarkTheme] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [id, setId] = useState('');
  const [item, setItem] = useState('');
  const [initalloading, setIndtialLoading] = useState(false);
  const [auctionHouseModal, setAuctionHouseModal] = useState(false);
  const [selectedAuctionHouseId, setSelectedAuctionHouseId] = useState();
  const [activeFirstTab, setActiveFirstTab] = useState('upcoming');
  const [selectedValue, setSelectedValue] = useState('');
  const [forceStopConfirmModal, setForceStopConfirmModal] = useState({
    show: false,
    data: null,
  });

  const auctionHouseDropdownList = convertToDropdownData(
    auctionHouseData,
    'name',
    'id'
  );

  useEffect(() => {
    fetchAuctionHouses({ limit: 100, page: currentPage });
    setIndtialLoading(true);
  }, []);

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

  // Fetch Data over here
  useEffect(() => {
    const color = getCurrentColor();
    if (color.includes('dark')) setDarkTheme(true);
    else setDarkTheme(false);
    let timeout;
    if (selectedAuctionHouseId) {
      if (search) {
        timeout = setTimeout(() => {
          fetchAuctions(selectedAuctionHouseId, {
            limit: selectedPageSize,
            page: currentPage,
            state: activeFirstTab,
            _sort: selectedSortOption.column,
            _order: selectedOrderOption.column,
            search: search.trim(),
          });
        }, 500);
      } else {
        fetchAuctions(selectedAuctionHouseId, {
          limit: selectedPageSize,
          page: currentPage,
          state: activeFirstTab,
          _sort: selectedSortOption.column,
          _order: selectedOrderOption.column,
        });
      }
    }
    setSelectedItems([]);
    return () => clearTimeout(timeout);
  }, [
    selectedPageSize,
    currentPage,
    selectedOrderOption,
    selectedSortOption,
    search,
    activeFirstTab,
    selectedAuctionHouseId,
  ]);

  useEffect(() => {
    if (initalloading) {
      if (successMesage) NotificationManager.success(null, successMesage);
      else if (errorMessage) NotificationManager.error(null, errorMessage);
    }
  }, [successMesage, errorMessage]);

  useEffect(() => {
    // TODO: Activate List of the big deal
    setItems(auctions);
  }, [auctions, dispatchDeleteauction]);

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedPageSize, selectedOrderOption]);

  useEffect(() => {
    setItems([]);
    selectedAuctionHouseId &&
      fetchAuctions(selectedAuctionHouseId, {
        limit: selectedPageSize,
        page: currentPage,
        state: activeFirstTab,
      });
  }, [activeFirstTab]);

  const onSearchKey = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const changeOrderBy = (column) => {
    setSelectedOrderOption(orderOptions.find((x) => x.column === column));
  };

  const changeSortBy = (column) => {
    setSelectedSortOption(sortOptions.find((x) => x.column === column));
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

  const handleChangeSelectAll = (isToggle) => {
    if (selectedItems.length >= items.length) {
      if (isToggle) {
        setSelectedItems([]);
      }
    } else {
      // eslint-disable-next-line no-underscore-dangle
      setSelectedItems(items.map((x) => x._id));
    }
    document.activeElement.blur();
    return false;
  };

  useMousetrap(['ctrl+a', 'command+a'], () => {
    handleChangeSelectAll(false);
  });

  useMousetrap(['ctrl+d', 'command+d'], () => {
    setSelectedItems([]);
    return false;
  });

  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  const dispatchStartAuctionHandler = (auctionId, date) => {
    dispatchStartAuction({ auction_id: auctionId, start_date: date }, () =>
      fetchAuctions(selectedAuctionHouseId, {
        limit: selectedPageSize,
        page: currentPage,
        state: activeFirstTab,
      })
    );
  };
  const dispatchCancelHandler = (res) => {
    const data = {
      title: res.title,
      description: res.description,
      play_consumed: res.plays_consumed_on_bid,
      pre_register_count: res.pre_register_count,
      terms_condition: res.terms_condition,
      product_id: res.product_id,
      auction_category_id: res.auction_category_id,
      auction_state: 'cancelled',
    };
    dispatchUpdateAuction(res.id, data, () => {
      fetchAuctions({
        limit: selectedPageSize,
        page: currentPage,
        state: activeFirstTab,
      });
    });
  };

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

  const auctionHouseToggleClick = () => {
    setAuctionHouseModal(true);
  };

  return (
    <>
      {modalDelete && (
        <DeleteModal
          from="auction"
          id={id}
          setItems={setItems}
          setModalDelete={setModalDelete}
          modalDelete={modalDelete}
          setCurrentPage={setCurrentPage}
          selectedPageSize={selectedPageSize}
          currentPage={currentPage}
          activeFirstTab={activeFirstTab}
          item={item}
        />
      )}
      <div className="disable-text-selection">
        {/* ListHeading Starts */}
        <ListHeading
          match={match}
          setDisplayOptionsIsOpen={setDisplayOptionsIsOpen}
          displayOptionsIsOpen={displayOptionsIsOpen}
          displayMode={displayMode}
          setDisplayMode={setDisplayMode}
          selectedOrderOption={selectedOrderOption}
          selectedSortOption={selectedSortOption}
          orderOptions={orderOptions}
          sortOptions={sortOptions}
          changeOrderBy={changeOrderBy}
          changeSortBy={changeSortBy}
          startIndex={currentPage}
          totalItemCount={metadata?.totalRecord}
          selectedPageSize={selectedPageSize}
          pageSizes={pageSizes}
          onSearchKey={onSearchKey}
          setSelectedPageSize={setSelectedPageSize}
          setCurrentPage={setCurrentPage}
          endPoint={metadata?.totalPages}
          selectedAuctionHouseId={selectedAuctionHouseId}
          auctionHouseDropdownList={auctionHouseDropdownList}
          onAuctionHouseSelectChange={onAuctionHouseSelectChange}
          auctionHouseToggleClick={auctionHouseToggleClick}
        />
        {/* List heading Ends */}

        <Colxx>
          <CardHeader>
            <Nav tabs className="card-header-tabs ">
              <NavItem>
                <NavLink
                  to="#"
                  location={{}}
                  className={classnames({
                    active: activeFirstTab === 'upcoming',
                    'nav-link': true,
                  })}
                  onClick={() => {
                    setActiveFirstTab('upcoming');
                    setCurrentPage(0);
                  }}
                >
                  Upcoming
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="#"
                  location={{}}
                  className={classnames({
                    active: activeFirstTab === 'live',
                    'nav-link': true,
                  })}
                  onClick={() => {
                    setActiveFirstTab('live');
                    setCurrentPage(0);
                  }}
                >
                  Live
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="#"
                  location={{}}
                  className={classnames({
                    active: activeFirstTab === 'completed',
                    'nav-link': true,
                  })}
                  onClick={() => {
                    setActiveFirstTab('completed');
                    setCurrentPage(0);
                  }}
                >
                  Completed
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="#"
                  location={{}}
                  className={classnames({
                    active: activeFirstTab === 'cancelled',
                    'nav-link': true,
                  })}
                  onClick={() => {
                    setActiveFirstTab('cancelled');
                    setCurrentPage(0);
                  }}
                >
                  Cancelled
                </NavLink>
              </NavItem>
            </Nav>
          </CardHeader>

          <TabContent activeTab={activeFirstTab}>
            <TabPane tabId={activeFirstTab}>
              <ActiveStateAuctionList
                dispatchDeleteauction={dispatchDeleteauction}
                darktheme={darktheme}
                items={auctions}
                setId={setId}
                setModalDelete={setModalDelete}
                loading={loading}
                auction={auctions}
                dispatchStartAuctionHandler={dispatchStartAuctionHandler}
                dispatchCancelHandler={dispatchCancelHandler}
                setItem={setItem}
                activeTab={activeFirstTab}
                tempData={auctionsList}
                selectedAuctionHouse={selectedAuctionHouseId}
                auctionHouseModal={auctionHouseModal}
                setForceStopConfirmModal={setForceStopConfirmModal}
              />
            </TabPane>
            {/* <TabPane tabId="Publish">
              <ActiveAuctionList
                setTotalItemCount={setTotalItemCount}
                dispatchDeleteauction={dispatchDeleteauction}
                darktheme={darktheme}
                items={items}
                setId={setId}
                setModalDelete={setModalDelete}
                loading={loading}
              />
            </TabPane>
            <TabPane tabId="Cancel">
              <ClosedAuctionList
                items={items}
                dispatchDeleteauction={dispatchDeleteauction}
                setTotalItemCount={setTotalItemCount}
                darktheme={darktheme}
                setId={setId}
                setModalDelete={setModalDelete}
                loading={loading}
              />
            </TabPane> */}
          </TabContent>
        </Colxx>

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

        {auctionHouseModal && auctionHouseDropdownList?.length > 0 && (
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
        {/* //TODO add action for integrate */}
        <ReactModal
          isOpen={forceStopConfirmModal?.isOpen}
          toggle={() => setForceStopConfirmModal({ isOpen: false, data: null })}
        >
          <ModalHeader>Confirm Force Stop Auction</ModalHeader>
          <ModalBody>
            Are you sure you want to force stop this auction? This action cannot
            be undone and may impact ongoing bids
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() =>
                dispatchForceStop(forceStopConfirmModal?.data, (res) => {
                  if (res?.success)
                    setForceStopConfirmModal({ isOpen: false, data: null });
                  else NotificationManager.error(null, res?.message);
                })
              }
            >
              <IntlMessages id="auction.stop" />
            </Button>{' '}
            <Button
              color="secondary"
              onClick={() =>
                setForceStopConfirmModal({ isOpen: false, data: null })
              }
            >
              <IntlMessages id="deletemodal.cancel" />
            </Button>
          </ModalFooter>
        </ReactModal>
        {/* List view ends */}
      </div>
    </>
  );
};

const mapStateToProps = ({ auction, auctionHouses }) => {
  const { auctions, metadata, message, successMesage, errorMessage, loading } =
    auction;
  const { auctionHouseData } = auctionHouses;
  return {
    auctions,
    metadata,
    message,
    successMesage,
    errorMessage,
    loading,
    auctionHouseData,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    fetchAuctionHouses: (params) => dispatch(getAuctionHouse({ ...params })),
    fetchAuctions: (auctionId, params) =>
      dispatch(getAuctions(auctionId, { ...params })),
    dispatchDeleteauction: (params, cb) => dispatch(deleteAuction(params, cb)),
    dispatchStartAuction: (data, cb) => dispatch(addAuctionStart(data, cb)),
    dispatchUpdateAuction: (pathParam, data, cb) =>
      dispatch(updateAuction(pathParam, data, cb)),
    dispatchForceStop: (data, cb) => dispatch(forceStopAuction({ data, cb })),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(AuctionList);
