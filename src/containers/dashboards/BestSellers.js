/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-key */
import React from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import { Card, CardBody, CardTitle } from 'reactstrap'; //
import IntlMessages from 'helpers/IntlMessages';

import { bestSellerData } from 'data/products';

function Table({ columns, data }) {
  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, page } =
    useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0, pageSize: 7 },
      },
      useSortBy,
      usePagination
    );

  return (
    <table {...getTableProps()} className="r-table table">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, columnIndex) => (
              <th
                key={`th_${columnIndex}`}
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className={
                  column.isSorted
                    ? column.isSortedDesc
                      ? 'sorted-desc'
                      : 'sorted-asc'
                    : ''
                }
              >
                {column.render('Header')}
                <span />
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell, cellIndex) => (
                <td
                  key={`td_${cellIndex}`}
                  {...cell.getCellProps({
                    className: cell.column.cellClass,
                  })}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const BestSellers = () => {
  const cols = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'title',
        cellClass: 'text-muted w-50',
        Cell: (props) => <>{props.value}</>,
        sortType: 'basic',
      },
      {
        Header: 'Bids',
        accessor: 'bids',
        cellClass: 'text-muted w-25',
        Cell: (props) => <>{props.value}</>,
        sortType: 'basic',
      },
      {
        Header: 'BuyNows',
        accessor: 'buyNows',
        cellClass: 'text-muted w-25',
        Cell: (props) => <>{props.value}</>,
        sortType: 'basic',
      },
    ],
    []
  );

  return (
    <Card className="h-100">
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboards.popular-auction-assets" />
        </CardTitle>
        <Table columns={cols} data={bestSellerData} />
      </CardBody>
    </Card>
  );
};

export default BestSellers;
