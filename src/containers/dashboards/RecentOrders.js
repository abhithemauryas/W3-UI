/* eslint-disable react/no-array-index-key */
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, CardBody, CardTitle } from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import { auctionHouseData } from 'data/products';

const RecentOrders = () => {
  return (
    <Card>
      <div className="position-absolute card-top-buttons">
        <button type="button" className="btn btn-header-light icon-button">
          <i className="simple-icon-refresh" />
        </button>
      </div>
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboards.auction-house" />
        </CardTitle>
        <div className="scroll dashboard-list-with-thumbs">
          <PerfectScrollbar
            options={{ suppressScrollX: true, wheelPropagation: false }}
          >
            {auctionHouseData.slice(0, 6).map((order, index) => {
              return (
                <div key={index} className="d-flex flex-row mb-2">
                  <div className="d-block position-relative">
                    <img
                      src={order.img}
                      alt={order.title}
                      className="list-thumbnail border-0"
                    />
                  </div>

                  <div className="pl-3 pt-2 pr-2">
                    <p className="list-item-heading mb-1">{order.title}</p>
                    <ul className="mb-0">
                      <li className="text-muted text-small">
                        Auctions Launched : {order.auctionLaunched}
                      </li>
                      <li className="text-muted text-small">
                        Total Bidders : {order.totalBidders}
                      </li>
                      <li className="text-muted text-small">
                        $AuX earned by AH : {order.earnedByAh}
                      </li>
                      <li className="text-muted text-small">
                        $AuX gas fees paid to AX : {order.gasFees}
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </PerfectScrollbar>
        </div>
      </CardBody>
    </Card>
  );
};
export default RecentOrders;
