import React, { useState } from 'react';
import { Card, CustomInput } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';
import iphone14 from 'assets/img/iphone14.jpg';

const ThumbListView = ({ product, isSelect, collect, onCheckItem }) => {
  const [checkedSecondaryInverse, setCheckedSecondaryInverse] = useState(false);

  return (
    <Colxx xxs="12" key={product.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={product.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, product.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
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
              <NavLink to={`?p=${product['_id']}`} className="w-sm-100">
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
                checked={isSelect}
                onChange={() => {}}
                label=""
              />
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ThumbListView);
