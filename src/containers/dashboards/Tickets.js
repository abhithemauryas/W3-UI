/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, CardBody, CardTitle } from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import data from 'data/tickets';

const Tickets = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboards.governance-proposals" />
        </CardTitle>
        <div className="dashboard-list-with-user">
          <PerfectScrollbar
            options={{ suppressScrollX: true, wheelPropagation: false }}
          >
            {data.map((ticket, index) => {
              return (
                <div
                  key={index}
                  className="d-flex flex-row mb-3 pb-3 border-bottom"
                >
                  <div className="mt-1">
                    <img
                      src={ticket.thumb}
                      alt={ticket.title}
                      className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
                    />
                  </div>

                  <div className="pl-3 pr-2">
                    <div>
                      <p className="font-weight-medium mb-0 ">{ticket.title}</p>
                      <p className="text-small  mb-1 link-blue">BIP 2087</p>
                      <p className="text-muted mb-0 text-small">
                        {ticket.detail}
                      </p>
                    </div>
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
export default Tickets;
