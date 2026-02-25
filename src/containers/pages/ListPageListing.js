import React, { useState } from 'react';
import { Nav, NavItem, NavLink, Row, Card, CustomInput } from 'reactstrap';
import classnames from 'classnames';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';
import Switch from 'rc-switch';
import DataListView from './DataListView';
import iphone14 from '../../assets/img/iphone14.jpg';
import ImageListView from './ImageListView';

function collect(props) {
  return { data: props.data };
}

const ListPageListing = ({
  items,
  displayMode,
  selectedItems,
  onCheckItem,
  currentPage,
  totalPage,
  onContextMenuClick,
  onContextMenu,
  onChangePage,
}) => {
  const numberLimit = 5;
  const firstIsActive = true;
  const lastIsActive = true;
  let startPoint = 1;
  let endPoint = numberLimit;
  const [checkedSecondaryInverse, setCheckedSecondaryInverse] = useState(false);

  if (numberLimit > totalPage) {
    startPoint = 1;
    endPoint = totalPage;
  } else if (currentPage <= parseInt(numberLimit / 2, 10)) {
    startPoint = 1;
    endPoint = numberLimit;
  } else if (currentPage + parseInt(numberLimit / 2, 10) <= totalPage) {
    startPoint = currentPage - parseInt(numberLimit / 2, 10);
    endPoint = currentPage + parseInt(numberLimit / 2, 10);
  } else {
    startPoint = totalPage - (numberLimit - 1);
    endPoint = totalPage;
  }
  startPoint = startPoint === 0 ? 1 : startPoint;
  const points = [];
  for (let i = startPoint; i <= endPoint; i += 1) {
    points.push(i);
  }

  const firstPageButtonClassName = currentPage <= 1 ? 'disabled' : '';
  const lastPageButtonClassName = currentPage >= totalPage ? 'disabled' : '';
  const prevPageButtonClassName = currentPage <= 1 ? 'disabled' : '';
  const nextPageButtonClassName = currentPage >= totalPage ? 'disabled' : '';

  return (
    <Row>
      {items.map((product) => {
        if (displayMode === 'imagelist') {
          return (
            <ImageListView
              key={product.id}
              product={product}
              isSelect={selectedItems.includes(product.id)}
              collect={collect}
              onCheckItem={onCheckItem}
            />
          );
        }
        if (displayMode === 'thumblist') {
          return (
            // Thumb view
            <>
              {/* <ThumbListView
              key={product.id}
              product={product}
              isSelect={selectedItems.includes(product.id)}
              collect={collect}
              onCheckItem={onCheckItem}
            /> */}

              <Colxx xxs="12" key={product.id} className="mb-3">
                <ContextMenuTrigger
                  id="menu_id"
                  data={product.id}
                  collect={collect}
                >
                  <Card
                    onClick={(event) => onCheckItem(event, product.id)}
                    className={classnames('d-flex flex-row', {
                      active: selectedItems.includes(product.id),
                    })}
                  >
                    <NavLink to={`?p=${product.id}`} className="d-flex">
                      <img
                        alt="iphone"
                        src={iphone14}
                        className="list-thumbnail responsive border-0 card-img-left"
                      />
                    </NavLink>
                    <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                      <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                        <NavLink
                          to={`?p=${product['_id']}`}
                          className="w-sm-100"
                        >
                          <div className="list-item-heading mb-1 min-max-150 truncate">
                            {product.title}
                          </div>
                        </NavLink>
                        <div className="ml-3 mb-1 text-muted text-small w-15 w-sm-100">
                          {product.purchasePrice}
                        </div>
                        <div className="mb-1 text-muted text-small w-15 w-sm-100">
                          {product.sellingPrice}
                        </div>
                        <div className="mb-1 text-muted text-small w-15 w-sm-100">
                          {product.quantity}
                        </div>
                        <div className="mb-1 text-muted text-small w-15 w-sm-100">
                          {product.overHeadCost}
                        </div>
                        <div className="mb-1 text-muted text-small w-15 w-sm-100">
                          {product.date}
                        </div>
                        <div className="w-15 w-sm-100">
                          <Switch
                            className="custom-switch custom-switch-secondary-inverse"
                            checked={checkedSecondaryInverse}
                            onChange={(secondaryInverse) =>
                              setCheckedSecondaryInverse(secondaryInverse)
                            }
                          />
                          {/* <Badge color='danger' pill>
                        {`${product.status}`} 
                      </Badge> */}
                        </div>
                      </div>
                      <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                        <CustomInput
                          className="item-check mb-0"
                          type="checkbox"
                          id={`check_${product.id}`}
                          checked={selectedItems.includes(product.id)}
                          onChange={() => {}}
                          label=""
                        />
                      </div>
                    </div>
                  </Card>
                </ContextMenuTrigger>
              </Colxx>
            </>
            // End thumb view
          );
        }
        return (
          <DataListView
            key={product.id}
            product={product}
            isSelect={selectedItems.includes(product.id)}
            onCheckItem={onCheckItem}
            collect={collect}
          />
        );
      })}

      {/* Pagination starts here */}
      {totalPage > 1 ? (
        <Colxx xxs="12" className="mt-3 mb-3">
          <Nav className="pagination justify-content-center">
            {firstIsActive && (
              <NavItem className={`page-item ${firstPageButtonClassName}`}>
                <NavLink
                  className="page-link first c-pointer"
                  onClick={() => onChangePage(1)}
                >
                  <i className="simple-icon-control-start" />
                </NavLink>
              </NavItem>
            )}

            <NavItem className={`page-item ${prevPageButtonClassName}`}>
              <NavLink
                className="page-link prev c-pointer"
                onClick={() => onChangePage(currentPage - 1)}
              >
                <i className="simple-icon-arrow-left" />
              </NavLink>
            </NavItem>
            {points.map((i) => {
              return (
                <NavItem
                  key={i}
                  className={`page-item ${currentPage === i && 'active'}`}
                >
                  <NavLink
                    className="page-link c-pointer"
                    onClick={() => onChangePage(i)}
                  >
                    {i}
                  </NavLink>
                </NavItem>
              );
            })}
            <NavItem className={`page-item ${nextPageButtonClassName}`}>
              <NavLink
                className="page-link next c-pointer"
                onClick={() => onChangePage(currentPage + 1)}
              >
                <i className="simple-icon-arrow-right" />
              </NavLink>
            </NavItem>
            {lastIsActive && (
              <NavItem className={`page-item ${lastPageButtonClassName}`}>
                <NavLink
                  className="page-link last c-pointer"
                  onClick={() => onChangePage(totalPage)}
                >
                  <i className="simple-icon-control-end" />
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Colxx>
      ) : (
        <Colxx xxs="12" className="mt-2" />
      )}

      {/* End Pagination */}

      {/* Context Menu */}
      <ContextMenu id="menu_id" onShow={(e) => onContextMenu(e, e.detail.data)}>
        <MenuItem onClick={onContextMenuClick} data={{ action: 'copy' }}>
          <i className="simple-icon-docs" /> <span>Copy</span>
        </MenuItem>
        <MenuItem onClick={onContextMenuClick} data={{ action: 'move' }}>
          <i className="simple-icon-drawer" /> <span>Move to archive</span>
        </MenuItem>
        <MenuItem onClick={onContextMenuClick} data={{ action: 'delete' }}>
          <i className="simple-icon-trash" /> <span>Delete</span>
        </MenuItem>
      </ContextMenu>
    </Row>
  );
};

export default React.memo(ListPageListing);
