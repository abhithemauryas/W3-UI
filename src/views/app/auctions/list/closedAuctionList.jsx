import { adminRoot } from 'constants/defaultValues';
import { getFullDate } from 'helpers/Utils';
import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';

const ClosedAuctionlist = (props) => {
  const { darktheme, items, loading } = props;

  return loading ? (
    <div className="loading" />
  ) : (
    <>
      <div className="responsive w-100 overflow-x">
        <table
          className={`w-100 custom-table ${
            !darktheme ? 'lighttheme' : 'darktheme'
          }`}
        >
          <thead>
            <tr>
              <th style={{ width: '80px' }}>Image</th>
              <th>Title</th>
              <th>Auction Type</th>
              <th>Product Name</th>
              <th>Register Count</th>
              <th>Bid Value</th>
              <th>Start date</th>
              <th>End date</th>
            </tr>
          </thead>
          <tbody>
            {items.length ? (
              items.map((auction) => {
                // TODO: Have to add different views
                // if (displayMode === 'thumblist') {
                return (
                  <tr key={auction['_id']}>
                    <td className="text-align-end">
                      <RouterNavLink
                        to={`${adminRoot}/auctions/${auction['_id']}`}
                        className="p-0 cursor-pointer"
                      >
                        <img
                          alt="not found"
                          src={`${process.env.REACT_APP_NODE_SERVER_API_BASE_URL}/${auction.bannerImage}`}
                          className="min-max-150 list-thumbnail responsive border-0 card-img-left"
                        />
                      </RouterNavLink>
                    </td>
                    <td>
                      <RouterNavLink
                        to={`${adminRoot}/auctions/${auction['_id']}`}
                        className="p-0 cursor-pointer"
                      >
                        {auction.title}
                      </RouterNavLink>
                    </td>
                    <td>{auction.AuctionCategory.name}</td>
                    <td>
                      {auction?.Product?.title
                        ? auction.Product.title
                        : 'Not Available'}
                    </td>
                    <td>{auction.noNewBidderLimit}</td>
                    <td>{auction.noOfPlayConsumed}</td>
                    <td>{getFullDate(auction.startDate, 'dd-mm-yyyy')}</td>
                    <td>{getFullDate(auction.endDate, 'dd-mm-yyyy')}</td>
                    {/* TODO: Temporary commented actions from Closed auction */}
                    {/* <td>
                        <div className="custom-control custom-checkbox pl-1 align-self-center d-flex justify-content-center align-items-center font-20 gap-20">
                          <div
                            className="simple-icon-trash text-danger cursor-pointer"
                            role="button"
                            tabIndex={0}
                            onClick={() => {
                              setId(auction['_id']);
                              setModalDelete(true)
                            }}
                            onKeyPress={(e) => console.log(e)}
                          />
                          <RouterNavLink
                            to={`${adminRoot}/auctions/${auction['_id']}/edit`}
                            className="p-0 cursor-pointer"
                          >
                            <div
                              tabIndex={0}
                              className="iconsminds-file-edit text-success cursor-pointer"
                              role="button"
                              onKeyPress={(e) => console.log(e)}
                            />
                          </RouterNavLink>
                        </div>
                      </td> */}
                  </tr>
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
    </>
  );
};

export default ClosedAuctionlist;
