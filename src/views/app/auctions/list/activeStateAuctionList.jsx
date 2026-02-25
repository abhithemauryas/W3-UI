/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { getFullDateConvert } from 'helpers/Utils';
import { copyToClipboard } from 'helpers/copyToClipboard';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { injectIntl } from 'react-intl';
import { Button, Tooltip } from 'reactstrap';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { adminRoot } from 'constants/defaultValues';

const today = new Date();
today.setHours(0, 0, 0, 0);

const ActiveStateAuctionList = (props) => {
  const {
    darktheme,
    setId,
    setModalDelete,
    loading,
    items,
    intl,
    dispatchStartAuctionHandler,
    dispatchCancelHandler,
    setItem,
    activeTab,
    setForceStopConfirmModal,
  } = props;

  const onSubmitHandel = (auctionId, startDate) => {
    dispatchStartAuctionHandler(auctionId, startDate);
  };
  const { messages } = intl;
  // const selectedAuctionHouseData = selectedAuctionHouse ?? 'BigDeal';
  // const acitveFilterdTab = !auctionHouseModal ? 'upcoming' : activeTab;
  const iconClassName = darktheme ? 'icon-white' : 'icon-black';
  return loading ? (
    <div className="loading" />
  ) : (
    <div className="responsive w-100 overflow-x-auto">
      <table
        className={`w-100 custom-table ${
          !darktheme ? 'lighttheme' : 'darktheme'
        }`}
      >
        <thead>
          <tr>
            <th>Auction ID</th>
            <th>Title</th>
            <th>Auction Type</th>
            <th>Product Name</th>
            <th>Registration</th>

            {(activeTab === 'live' || activeTab === 'completed') && (
              <th>Bids/XP</th>
            )}
            {activeTab === 'completed' && <th>Participants</th>}
            <th>Registration Fee</th>
            {activeTab !== 'cancelled' && <th>Start Date</th>}
            {/* //TODO remove d-none and add api endpoint when api available from backend */}
            {activeTab === 'live' && <th className="d-none">Force Stop</th>}
            {activeTab === 'cancelled' && <th>Cancelled Date</th>}
            {activeTab === 'completed' && <th>End Date</th>}
            {activeTab === 'cancelled' && <th>Remarks</th>}
          </tr>
        </thead>
        <tbody>
          {items?.length ? (
            items.map((auction, index) => {
              return (
                <TableData
                  auction={auction}
                  key={auction.id}
                  index={index}
                  messages={messages}
                  setId={setId}
                  setModalDelete={setModalDelete}
                  onSubmitHandel={onSubmitHandel}
                  loading={loading}
                  dispatchCancelHandler={dispatchCancelHandler}
                  setItem={setItem}
                  activeTab={activeTab}
                  iconClassName={iconClassName}
                  setForceStopConfirmModal={setForceStopConfirmModal}
                />
              );
            })
          ) : (
            <tr>
              <td colSpan="15" className="nodatafound">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const TableData = ({
  auction,
  activeTab,
  index,
  iconClassName,
  setForceStopConfirmModal,
}) => {
  const [regTooltipOpen, setRegTooltipOpen] = useState(false);
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
    <tr>
      <td>
        <div className="d-flex justify-content-center align-items-center">
          <div className="mr-1" id={`info-tooltip-id${index}`}>
            <span>{`${auction.id?.slice(0, 7).toUpperCase()}...`}</span>
            <Button
              type="button"
              onClick={() => handleCopyWalletAddress(auction.id)}
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
              {auction.id}
            </Tooltip>
          </div>
        </div>
      </td>
      <td style={{ width: '120px' }}>
        {['upcoming', 'completed', 'live'].includes(activeTab) ? (
          <RouterNavLink
            to={`${adminRoot}/auctions/${auction.id}`}
            className="p-0 cursor-pointer"
          >
            {auction.title}
          </RouterNavLink>
        ) : (
          auction.title
        )}
      </td>
      <td>{auction?.auctionCategory?.title}</td>
      <td>{auction?.products?.title}</td>
      <td>
        <div className="d-flex justify-content-center align-items-center">
          <span className="mr-1">
            {auction?._count?.PlayerAuctionRegister &&
            auction?.registeration_count
              ? `${auction?._count?.PlayerAuctionRegister}/${auction?.registeration_count}`
              : 'N/A'}
          </span>
          <div
            className="glyph-icon simple-icon-info ml-1"
            id={`info-tooltip-${index}`}
          />
          <Tooltip
            placement="top"
            isOpen={regTooltipOpen}
            target={`info-tooltip-${index}`}
            toggle={() => setRegTooltipOpen(!regTooltipOpen)}
          >
            {auction?._count?.PlayerAuctionRegister ? (
              <>
                <div>
                  Registered Players:
                  {auction?._count?.PlayerAuctionRegister}
                </div>
                <div>
                  Required Players:
                  {auction?.registeration_count}
                </div>
              </>
            ) : (
              <div>
                This auction operates on an open basis, eliminating the need for
                registration.
              </div>
            )}
          </Tooltip>
        </div>
      </td>
      {/* <td>{`${auction.id?.slice(0, 7).toUpperCase()}...`}</td> */}

      {(activeTab === 'live' || activeTab === 'completed') && (
        <td>{auction.plays_consumed_on_bid}</td>
      )}
      {activeTab === 'completed' && <td>{auction?._count?.PlayerAuctionRegister}</td>}
      <td>
        {auction.registeration_fees
          ? `${auction.registeration_fees} $Aux`
          : 'N/A'}
      </td>
      {activeTab !== 'cancelled' && (
      <td style={{ width: '150px', padding: '10px' }}>
        {auction.start_date ? getFullDateConvert(auction.start_date) : '-'}
      </td>
      )}
      {/* //TODO remove d-none and add api endpoint when api available from backend */}
      {activeTab === 'live' && (
        <td>
          <Button
            color="primary"
            className="px-2 py-1 d-none"
            onClick={() =>
              setForceStopConfirmModal({ isOpen: true, data: auction.id })
            }
          >
            Stop
          </Button>
        </td>
      )}
      {activeTab === 'cancelled' && (
        <td>
          {auction.updated_at
            ? getFullDateConvert(auction.updated_at)
            : '-'}
        </td>
      )}
      {activeTab === 'completed' && <td> {getFullDateConvert(auction.updated_at)}</td>}
      {activeTab === 'cancelled' && <td>{auction.remarks}</td>}
    </tr>
  );
};

export default injectIntl(ActiveStateAuctionList);
