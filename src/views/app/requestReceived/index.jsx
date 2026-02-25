import { useEffect, useState } from 'react';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
  Button,
  Input,
} from 'reactstrap';
import Select from 'react-select';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import ReactSelectComponent from 'components/common/ReactSelect';
import CustomSelectInput from 'components/common/CustomSelectInput';
import Modal from 'components/modals/Modal/Modal';
import IntlMessages from 'helpers/IntlMessages';
import { findByValue, getCurrentColor } from 'helpers/Utils';
import useFetchAuctionHouse from 'hooks/useFetchAuctionHouse';
import { connect } from 'react-redux';

import { NotificationManager } from 'components/common/react-notifications';
import { getAuctionPlayConsumed } from 'redux/auctionPlayConsumed/actions.auctionPlayConsumed';
import { blockUser } from 'redux/user/userBlock/actions.userBlock';
import { pageSizes } from 'constants/constants';
import Pagination from 'components/table/Pagination';
import {
  getRequestList,
  updateRequestList,
} from '../../../redux/auctionHouse/httpCalls.auctionHouse';

const RequestReceived = ({ fetchConsumedAuctionPlays, users, loading }) => {
  const [pendingStatusChanges, setPendingStatusChanges] = useState({});
  const [activeTab, setActiveTab] = useState('pending');
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAuctionHouseId, setSelectedAuctionHouseId] = useState();
  const [auctionHouseModal, setAuctionHouseModal] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [selectedPageSize, setSelectedPageSize] = useState(20);
  const [search, setSearch] = useState('');
  const [darktheme, setDarkTheme] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [requests, setRequests] = useState([]);
  const [metadata, setMetadata] = useState({
    limit: 20,
    page: 1,
    totalRecord: 0,
    totalPage: 1,
  });
  const [selectedAmounts, setSelectedAmounts] = useState({});

  const fetchRequests = async (limit, page) => {
    try {
      const res = await getRequestList({ params: { limit, page, search } });
      setRequests(res.data || []);
      if (res.metadata) {
        setMetadata(res.metadata);
      }
    } catch (err) {
      NotificationManager.error(null, 'Failed to fetch requests');
    }
    setUpdateLoading(false);
  };

  const statusOptions = [
    { label: 'Request Received', value: 'request_received' },
    { label: 'Verified', value: 'verified' },
    { label: 'Payment Done', value: 'completed' },
    { label: 'Talk to Admin', value: 'talk_to_admin' },
  ];

  const startPoint = 1;
  const endPoint = metadata.totalPage;
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  const onSearchKey = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const { auctionHouseData, auctionHouseDropdownList } = useFetchAuctionHouse();

  useEffect(() => {
    fetchRequests(selectedPageSize, currentPage + 1);
  }, [search, currentPage, selectedPageSize]);

  const handleTransactionIdChange = (playerId, value) => {
    setSelectedAmounts((prev) => {
      const updated = { ...prev };
      updated[playerId] = updated[playerId] || [];
      updated[playerId].transactionId = value;
      return updated;
    });
  };

  const handleAmountCheckbox = (playerId, recId, amt) => {
    setSelectedAmounts((prev) => {
      const prevSelected = prev[playerId] || [];
      const keyObj = { id: recId, amount: amt };
      const exists = prevSelected.some(
        (obj) => obj.id === recId && obj.amount === amt
      );
      let updatedArr;
      if (exists) {
        updatedArr = prevSelected.filter(
          (obj) => !(obj.id === recId && obj.amount === amt)
        );
      } else {
        updatedArr = [...prevSelected, keyObj];
      }
      // Preserve transactionId if present
      if (prev[playerId] && prev[playerId].transactionId) {
        updatedArr.transactionId = prev[playerId].transactionId;
      }
      return { ...prev, [playerId]: updatedArr };
    });
  };

  const handleStatusChange = (playerId, value) => {
    setPendingStatusChanges((prev) => ({ ...prev, [playerId]: value }));
  };

  function getTabStatus(records, activeTabStatus) {
    if (activeTabStatus === 'pending') {
      return (
        records.find((r) => r.status === 'request_received')?.status ||
        'request_received'
      );
    }
    if (activeTabStatus === 'verified') {
      return records.find((r) => r.status === 'verified')?.status || 'verified';
    }
    if (activeTabStatus === 'completed') {
      return (
        records.find((r) => r.status === 'completed')?.status || 'completed'
      );
    }
    if (activeTabStatus === 'failed') {
      return (
        records.find((r) => r.status === 'talk_to_admin')?.status ||
        'talk_to_admin'
      );
    }
    return records[0].status;
  }

  const handleSubmit = (id) => {
    const playerRequests = requests.filter((r) => r.player_id === id);
    if (!playerRequests.length) {
      NotificationManager.error(null, 'Request not found.');
      return;
    }
    const statusToSubmit =
      pendingStatusChanges[id] !== undefined
        ? pendingStatusChanges[id]
        : getTabStatus(playerRequests, activeTab);

    if (activeTab === 'pending' && statusToSubmit === 'request_received') {
      NotificationManager.error(null, 'Please change the status.');
      return;
    }
    if (activeTab === 'verified' && statusToSubmit === 'verified') {
      NotificationManager.error(null, 'Please change the status.');
      return;
    }
    if (activeTab === 'failed' && statusToSubmit === 'talk_to_admin') {
      NotificationManager.error(null, 'Please change the status.');
      return;
    }
    if (!selectedAmounts[id] || selectedAmounts[id].length === 0) {
      NotificationManager.error(null, 'Please select at least one amount.');
      return;
    }
    if (
      statusToSubmit === 'talk_to_admin' ||
      statusToSubmit === 'verified' ||
      statusToSubmit === 'request_received'
    ) {
    setUpdateLoading(true);
      updateRequestList({
        status: statusToSubmit,
        wallet_txn_ids: (selectedAmounts[id] || []).map((obj) => obj.id),
      }).then((res) => {
        NotificationManager.success(
          res?.message || 'Clan owner redeem status updated successfully!'
        );
        fetchRequests(selectedPageSize, currentPage + 1);
        setPendingStatusChanges((prev) => {
          const copy = { ...prev };
          delete copy[id];
          return copy;
        });
        setSelectedAmounts((prev) => {
          const copy = { ...prev };
          if (copy[id]) {
            copy[id].transactionId = '';
          }
          return copy;
        });
      });
      return;
    }
    if (
      !selectedAmounts[id]?.transactionId ||
      selectedAmounts[id].transactionId.trim() === ''
    ) {
      NotificationManager.error(null, 'Transaction ID is required.');
      return;
    }
    setUpdateLoading(true);
    updateRequestList({
      status: statusToSubmit,
      payment_reference_id: selectedAmounts[id].transactionId,
      wallet_txn_ids: (selectedAmounts[id] || []).map((obj) => obj.id),
    }).then((res) => {
      NotificationManager.success(
        res?.message || 'Clan owner redeem status updated successfully!'
      );
      fetchRequests(selectedPageSize, currentPage + 1);
      setPendingStatusChanges((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      setSelectedAmounts((prev) => {
        const copy = { ...prev };
        if (copy[id]) {
          copy[id].transactionId = '';
        }
        return copy;
      });
    });
  };

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
          });
        }, 500);
      } else
        fetchConsumedAuctionPlays(selectedAuctionHouseId, {
          limit: selectedPageSize,
          page: currentPage,
        });
    }
    return () => clearTimeout(timeout);
  }, [search, selectedPageSize, currentPage, selectedAuctionHouseId]);

  const points = [];
  for (let i = startPoint; i <= endPoint; i += 1) {
    points.push(i);
  }

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

  useEffect(() => {
    setSelectedAmounts({});
    setPendingStatusChanges({});
  }, [activeTab]);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="d-block d-md-inline-block pt-1">
            <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
              <input
                type="text"
                name="keyword"
                id="search"
                placeholder="Search"
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
                {pageSizes.map((size) => (
                  <DropdownItem
                    key={size}
                    onClick={() => setSelectedPageSize(size)}
                  >
                    {size}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <Separator className="mb-5" />
        </Colxx>
        <Colxx xxs="12" className="mb-3">
          <div className="custom-tabs">
            <Button
              color={activeTab === 'pending' ? 'primary' : 'light'}
              onClick={() => setActiveTab('pending')}
              className="mr-2"
            >
              Pending Request
            </Button>
            <Button
              color={activeTab === 'verified' ? 'primary' : 'light'}
              onClick={() => setActiveTab('verified')}
              className="mr-2"
            >
              Verified Request
            </Button>
            <Button
              color={activeTab === 'completed' ? 'primary' : 'light'}
              onClick={() => setActiveTab('completed')}
              className="mr-2"
            >
              Completed Request
            </Button>
            <Button
              color={activeTab === 'failed' ? 'primary' : 'light'}
              onClick={() => setActiveTab('failed')}
            >
              Failed Request
            </Button>
          </div>
        </Colxx>
        <Colxx xxs="12" className="mb-4">
          <div
            className="responsive w-100 overflow-x"
            style={{ overflow: 'visible' }}
          >
            <table
              className={`w-100 custom-table  ${
                !darktheme ? 'lighttheme' : 'darktheme'
              }`}
            >
              <thead>
                {(activeTab === 'pending' || activeTab === 'verified') && (
                  <tr>
                    <th>Auction House Name</th>
                    <th>Date</th>
                    <th>Request Amount</th>
                    <th>Total Amount</th>
                    <th>Transaction ID</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                )}
                {activeTab === 'completed' && (
                  <tr>
                    <th>Auction House Name</th>
                    <th>Date</th>
                    <th>Request Amount</th>
                    <th>Transaction ID</th>
                    <th>Status</th>
                  </tr>
                )}
                {activeTab === 'failed' && (
                  <tr>
                    <th>Auction House Name</th>
                    <th>Date</th>
                    <th>Request Amount</th>
                    <th>Transaction ID</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                )}
              </thead>
              {loading ? (
                <div className="loading" />
              ) : (
                <tbody>
                  {(() => {
                    // Group records by player_id
                    const grouped = {};
                    (Array.isArray(requests) ? requests : []).forEach((rec) => {
                      if (!grouped[rec.player_id]) grouped[rec.player_id] = [];
                      grouped[rec.player_id].push(rec);
                    });
                    // Filter records by tab
                    let filteredEntries = Object.entries(grouped);
                    if (activeTab === 'pending') {
                      filteredEntries = filteredEntries.filter((entry) =>
                        entry[1].some(
                          (r) =>
                            r.status === 'request_received' || r.status === null
                        )
                      );
                    } else if (activeTab === 'verified') {
                      filteredEntries = filteredEntries.filter((entry) =>
                        entry[1].some((r) => r.status === 'verified')
                      );
                    } else if (activeTab === 'completed') {
                      filteredEntries = filteredEntries.filter((entry) =>
                        entry[1].some((r) => r.status === 'completed')
                      );
                    } else if (activeTab === 'failed') {
                      filteredEntries = filteredEntries.filter((entry) =>
                        entry[1].some((r) => r.status === 'talk_to_admin')
                      );
                    }
                    return filteredEntries.map(([playerId, records]) => {
                      // For completed tab, only show records with status === 'completed'
                      let showRecords = records;
                      if (activeTab === 'pending') {
                        showRecords = records.filter(
                          (r) =>
                            r.status === 'request_received' || r.status === null
                        );
                      } else if (activeTab === 'verified') {
                        showRecords = records.filter(
                          (r) => r.status === 'verified'
                        );
                      } else if (activeTab === 'completed') {
                        showRecords = records.filter(
                          (r) => r.status === 'completed'
                        );
                      } else if (activeTab === 'failed') {
                        showRecords = records.filter(
                          (r) => r.status === 'talk_to_admin'
                        );
                      }
                      return (
                        <tr key={playerId}>
                          <td>{records[0]?.auction_house_name || playerId}</td>
                          <td>
                            {showRecords.map((rec) => (
                              <div key={rec.id}>
                                {activeTab === 'pending'
                                  ? new Date(rec.created_at).toLocaleString()
                                  : new Date(rec.updated_at).toLocaleString()}
                              </div>
                            ))}
                          </td>
                          <td>
                            {showRecords.map((rec) => {
                              if (
                                activeTab === 'pending' ||
                                activeTab === 'verified' ||
                                activeTab === 'failed'
                              ) {
                                return (
                                  <div
                                    key={rec.id}
                                    style={{
                                      marginBottom: '4px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={
                                        selectedAmounts[playerId]?.some(
                                          (obj) =>
                                            obj.id === rec.id &&
                                            obj.amount === rec.amount
                                        ) || false
                                      }
                                      onClick={() =>
                                        handleAmountCheckbox(
                                          playerId,
                                          rec.id,
                                          rec.amount
                                        )
                                      }
                                      style={{
                                        marginRight: 8,
                                        cursor: 'pointer',
                                      }}
                                      disabled={activeTab === 'completed'}
                                    />
                                    <span>{rec.amount}</span>
                                  </div>
                                );
                              }
                              return <div key={rec.id}>{rec.amount}</div>;
                            })}
                          </td>
                          {(activeTab === 'pending' ||
                            activeTab === 'verified') && (
                            <td>
                              {selectedAmounts[playerId]?.length
                                ? selectedAmounts[playerId].reduce(
                                    (sum, obj) => sum + obj.amount,
                                    0
                                  )
                                : 0}
                            </td>
                          )}
                          {activeTab !== 'completed' && (
                            <td>
                              <Input
                                type="text"
                                value={
                                  selectedAmounts[playerId]?.transactionId || ''
                                }
                                onChange={(e) =>
                                  handleTransactionIdChange(
                                    playerId,
                                    e.target.value
                                  )
                                }
                                placeholder="Enter Transaction ID"
                              />
                            </td>
                          )}
                          {activeTab === 'completed' && (
                            <td>
                              {showRecords.map((rec) => (
                                <div key={rec.id}>
                                  {rec.payment_reference_id}
                                </div>
                              ))}
                            </td>
                          )}
                          <td>
                            {activeTab === 'completed' ? (
                              'Completed'
                            ) : (
                              <Select
                                components={{ Input: CustomSelectInput }}
                                className="react-select"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                options={statusOptions}
                                value={
                                  statusOptions.find(
                                    (opt) =>
                                      opt.value ===
                                      (pendingStatusChanges[playerId] !==
                                      undefined
                                        ? pendingStatusChanges[playerId]
                                        : getTabStatus(records, activeTab))
                                  ) || statusOptions[0]
                                }
                                onChange={(option) =>
                                  handleStatusChange(playerId, option.value)
                                }
                                styles={{
                                  menu: (provided) => ({
                                    ...provided,
                                    zIndex: 9999,
                                    position: 'absolute',
                                  }),
                                }}
                              />
                            )}
                          </td>
                          {activeTab !== 'completed' && (
                            <td>
                              <Button
                                color="primary"
                                onClick={() => handleSubmit(playerId)}
                              >
                               {updateLoading && <div className="loading" />} Submit
                              </Button>
                            </td>
                          )}
                        </tr>
                      );
                    });
                  })()}
                </tbody>
              )}
            </table>
          </div>
        </Colxx>
      </Row>
      {!loading && metadata?.totalPage > 1 ? (
        <Pagination
          totalPage={metadata?.totalPage}
          currentPage={currentPage}
          handlePageClick={handlePageClick}
        />
      ) : (
        <Colxx xxs="12" className="mt-2" />
      )}
      {auctionHouseModal &&
      auctionHouseDropdownList &&
      auctionHouseDropdownList.length > 0 ? (
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
              isSearchable
              className="custom-select-container"
              classNamePrefix="custom-select"
            />
          )}
        </Modal>
      ) : null}
    </>
  );
};

const mapStateToProps = ({ auctionPlayConsumed }) => {
  const { successMessage, errorMessage, loading, metadata } =
    auctionPlayConsumed;

  return {
    successMessage,
    errorMessage,
    loading,
    metadata,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    fetchConsumedAuctionPlays: (auctionId, params) =>
      dispatch(getAuctionPlayConsumed(auctionId, params)),
    dispatchBlockUser: (params) => dispatch(blockUser(params)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(RequestReceived);
