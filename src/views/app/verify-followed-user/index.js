import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Row,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import classnames from 'classnames';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { NotificationManager } from 'components/common/react-notifications';
import {
  getUnverifiedXUsers,
  verifyXUsers,
  rejectXUsers,
} from 'redux/xVerification/httpCalls.xVerification';
import Pagination from 'components/table/Pagination';
import { pageSizes } from 'constants/constants';

const TABS = [
  { id: 'x', label: 'X', iconClass: 'simple-icon-social-twitter' },
];

const VerifyFollowedUser = () => {
  const [activeTab, setActiveTab] = useState('x');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPageSize, setSelectedPageSize] = useState(10);
  const [metadata, setMetadata] = useState({
    totalRecord: 0,
    totalPages: 0,
    currentPage: 0,
  });

  const isAllSelected =
    users.length > 0 && selectedUserIds.length === users.length;

  const fetchXUsers = async () => {
    setLoading(true);
    try {
      const res = await getUnverifiedXUsers({
        page: currentPage + 1, // API expects 1-based, but we use 0-based internally
        limit: selectedPageSize,
      });
      if (res?.success && Array.isArray(res?.data?.users)) {
        setUsers(res.data.users || []);
        // Update metadata from response pagination
        const pagination = res?.data?.pagination || {};
        setMetadata({
          totalRecord: pagination.totalItems || 0,
          totalPages: pagination.totalPages || 0,
          currentPage: pagination.currentPage ? pagination.currentPage - 1 : currentPage, // Convert 1-based to 0-based
        });
        // Don't show success notification on every fetch - only errors
      } else {
        setUsers([]);
        setMetadata({ totalRecord: 0, totalPages: 0, currentPage: 0 });
        NotificationManager.error(
          null,
          res?.message || 'Failed to fetch unverified X users'
        );
      }
    } catch (err) {
      setUsers([]);
      setMetadata({ totalRecord: 0, totalPages: 0, currentPage: 0 });
      NotificationManager.error(
        null,
        err?.message || 'Failed to fetch unverified X users'
      );
    } finally {
      setLoading(false);
      setSelectedUserIds([]);
    }
  };


  useEffect(() => {
    if (activeTab === 'x') {
      fetchXUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, currentPage, selectedPageSize]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleToggleAll = () => {
    if (isAllSelected) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(users.map((u) => u.id));
    }
  };

  const handleToggleOne = (userId) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const performAction = async (type) => {
    if (!selectedUserIds.length) {
      NotificationManager.warning(null, 'Please select at least one user');
      return;
    }
    setActionLoading(true);
    try {
      let apiFn;
      let fetchFn;
      if (activeTab === 'x') {
        apiFn = type === 'accept' ? verifyXUsers : rejectXUsers;
        fetchFn = fetchXUsers;
      } else {
        NotificationManager.error(null, 'Invalid tab selected');
        return;
      }
      const res = await apiFn(selectedUserIds);
      if (res?.success) {
        NotificationManager.success(
          null,
          res?.message || 'Action completed successfully'
        );
        await fetchFn();
      } else {
        NotificationManager.error(null, res?.message || 'Action failed');
      }
    } catch (err) {
      NotificationManager.error(null, err?.message || 'Action failed');
    } finally {
      setActionLoading(false);
    }
  };

  const renderTableBody = () => {
    const colSpan = 3;
    if (loading) {
      return (
        <tr>
          <td colSpan={colSpan} className="nodatafound">
            <div className="w-100 h-100 position-relative">
              <div className="loading" />
            </div>
          </td>
        </tr>
      );
    }

    if (!users?.length) {
      return (
        <tr>
          <td colSpan={colSpan} className="nodatafound">
            No Data Found
          </td>
        </tr>
      );
    }

    return users.map((user) => (
      <tr key={user.id}>
        <td>
          <input
            type="checkbox"
            className="cursor-pointer"
            checked={selectedUserIds.includes(user.id)}
            onClick={() => handleToggleOne(user.id)}
          />
        </td>
        {activeTab === 'x' && (
          <>
            <td style={{ color: '#000' }}>{user.x_user_name || '-'}</td>
            <td style={{ color: '#000' }}>{user.x_name || '-'}</td>
          </>
        )}
        {activeTab === 'instagram' && (
          <td style={{ color: '#000' }} colSpan="2">
            {user.insta_user_name || '-'}
          </td>
        )}
        {activeTab === 'facebook' && (
          <td style={{ color: '#000' }} colSpan="2">
            {user.fb_user_name || user.facebook_user_name || '-'}
          </td>
        )}
      </tr>
    ));
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Verify Followed User</h2>
            <div>
              <Button
                color="success"
                className="mr-2"
                disabled={
                  actionLoading ||
                  !selectedUserIds.length ||
                  activeTab !== 'x'
                }
                onClick={() => performAction('accept')}
              >
                {actionLoading ? 'Processing...' : 'Accept'}
              </Button>
              <Button
                color="danger"
                disabled={
                  actionLoading ||
                  !selectedUserIds.length ||
                  activeTab !== 'x'
                }
                onClick={() => performAction('reject')}
              >
                {actionLoading ? 'Processing...' : 'Reject'}
              </Button>
            </div>
          </div>
          <Separator className="mb-3" />
        </Colxx>
      </Row>

      <Row>
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <div className="mb-3">
                <Nav tabs className="separator-tabs ml-0">
                  {TABS.map((tab) => (
                    <NavItem key={tab.id}>
                      <NavLink
                        to="#"
                        location={{}}
                        className={classnames({
                          active: activeTab === tab.id,
                          'nav-link': true,
                        })}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setSelectedUserIds([]);
                          setCurrentPage(0);
                        }}
                      >
                        <i className={`${tab.iconClass} mr-1`} />
                        {tab.label}
                      </NavLink>
                    </NavItem>
                  ))}
                </Nav>
              </div>

              {activeTab === 'x' && (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted text-small">
                      Viewing{' '}
                      {users.length > 0
                        ? currentPage * selectedPageSize + 1
                        : 0}
                      -
                      {Math.min(
                        (currentPage + 1) * selectedPageSize,
                        metadata.totalRecord
                      )}{' '}
                      | Total: {metadata.totalRecord}
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
                  <div className="responsive w-100 overflow-x-auto">
                    <table className="w-100 custom-table lighttheme">
                      <thead>
                        <tr>
                          <th>
                            <input
                              type="checkbox"
                              className="cursor-pointer"
                              checked={isAllSelected}
                              onClick={handleToggleAll}
                            />
                          </th>
                          <th style={{ color: '#000' }}>X Username</th>
                          <th style={{ color: '#000' }}>X Name</th>
                        </tr>
                      </thead>
                      <tbody>{renderTableBody()}</tbody>
                    </table>
                  </div>
                  {!loading && metadata?.totalPages > 1 && (
                    <Row className="mt-3">
                      <Colxx xxs="12">
                        <Pagination
                          totalPage={metadata.totalPages}
                          currentPage={currentPage}
                          handlePageClick={handlePageClick}
                        />
                      </Colxx>
                    </Row>
                  )}
                </>
              )}
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default VerifyFollowedUser;


