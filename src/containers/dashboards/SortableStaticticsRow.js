import React from 'react';

import { Colxx } from 'components/common/CustomBootstrap';
import { Card, CardBody, Row } from 'reactstrap';

const SortableStaticticsRow = () => {
  const data = [
    {
      key: 1,
      title: 'Current Live Auctions',
      value: 362,
    },
    {
      key: 2,
      title: 'Auctions Completed',
      value: 182,
    },
    {
      key: 3,
      title: 'Auction Asset value',
      value: '$4,78,309',
    },
    {
      key: 4,
      title: 'Stable coin transfers',
      value: '$16,798',
    },
  ];

  return (
    <Row>
      {data.map((x) => {
        return (
          <Colxx xl="3" lg="6" className="mb-4" key={x.key}>
            <Card>
              <CardBody className="d-flex justify-content-between align-items-center">
                <div className="mb-0">{x.title}</div>
                <div>{x.value}</div>
              </CardBody>
            </Card>
          </Colxx>
        );
      })}
    </Row>
  );
};
export default SortableStaticticsRow;
