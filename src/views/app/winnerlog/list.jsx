import React, { useState } from 'react';
import { Row } from 'reactstrap';
// import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';

const WinnerLog = () => {
  const [items] = useState([]);
  return (
    <>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <div className="responsive w-100 overflow-x">
            <h1>Winner Logs</h1>

            <table className="w-100 custom-table lighttheme">
              <thead>
                <tr>
                  <th>Player name</th>
                  <th>Country</th>
                  <th>Bid amount</th>
                  <th>Date-time </th>
                </tr>
              </thead>
              <tbody>
                {items.length ? (
                  items.map(() => {
                    // TODO: Have to add different views
                    // if (displayMode === 'thumblist') {
                    return <p key={items.id}>{items}</p>;
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="nodatafound"
                      style={{ borderLeftStyle: 'none' }}
                    >
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Colxx>
      </Row>
    </>
  );
};

export default WinnerLog;
