import { Colxx, Separator } from 'components/common/CustomBootstrap';
// import { DataListIcon, ImageListIcon, ThumbListIcon } from 'components/svg';
// import BreadcrumbContainer from 'containers/navs/Breadcrumb';
import IntlMessages from 'helpers/IntlMessages';

import {
  Button,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';

const ListHeading = ({
  from,
  // match,
  setDisplayOptionsIsOpen,
  onSearchKey,
  // displayMode,
  // setDisplayMode,
  auctionHouseDropdownList = [],
  selectedOrderOption,
  displayOptionsIsOpen,
  changeOrderBy,
  selectedSortOption,
  orderOptions,
  sortOptions = [],
  changeSortBy,
  startIndex,
  pageSizes,
  totalItemCount,
  setSelectedPageSize,
  selectedPageSize,

  selectedAuctionHouseId,
  auctionHouseToggleClick,
  // onAuctionHouseSelectChange,
}) => {
  const selectedAuctionHouse = auctionHouseDropdownList?.find(
    (option) => option.value === selectedAuctionHouseId
  );

  const handleOpenAuctionHouseModel = () => {
    if (auctionHouseToggleClick) {
      auctionHouseToggleClick();
    }
  };

  return (
    <>
      {/* List Heading starts */}
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <Button
              color="empty"
              className="pt-0 pl-0 d-inline-block d-md-none"
              onClick={() => setDisplayOptionsIsOpen(!displayOptionsIsOpen)}
            >
              <IntlMessages id="pages.display-options" />{' '}
              <i className="simple-icon-arrow-down align-middle" />
            </Button>
            <Collapse
              isOpen={displayOptionsIsOpen}
              className="d-md-block"
              id="displayOptions"
            >
              <div className="d-block d-md-inline-block pt-1">
                {from !== 'product-delivery-conflicts' && (
                  <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                    <DropdownToggle
                      caret
                      color="outline-dark"
                      size="xs"
                      onClick={handleOpenAuctionHouseModel}
                    >
                      <IntlMessages id="Auction House" />:{' '}
                      {selectedAuctionHouse?.label ??
                        auctionHouseDropdownList?.[0]?.label}
                    </DropdownToggle>
                    {/* <DropdownMenu>
                    {auctionHouseDropdownList?.map((item, index) => {
                      return (
                        <DropdownItem
                          // eslint-disable-next-line react/no-array-index-key
                          key={index}
                          onClick={() =>
                            onAuctionHouseSelectChange(item?.value, true)
                          }
                        >
                          {item?.label}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu> */}
                  </UncontrolledDropdown>
                )}
                {from !== 'product-delivery-conflicts' && (
                  <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                    <DropdownToggle caret color="outline-dark" size="xs">
                      <IntlMessages id="pages.sort" />
                      {selectedSortOption?.label}
                    </DropdownToggle>
                    <DropdownMenu>
                      {sortOptions.map((sort, index) => {
                        return (
                          <DropdownItem
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            onClick={() => changeSortBy(sort.column)}
                          >
                            {sort.label}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                )}
                <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                  <DropdownToggle caret color="outline-dark" size="xs">
                    <IntlMessages id="pages.orderby" />
                    {selectedOrderOption?.label}
                  </DropdownToggle>
                  <DropdownMenu>
                    {orderOptions.map((order, index) => {
                      return (
                        <DropdownItem
                          // eslint-disable-next-line react/no-array-index-key
                          key={index}
                          onClick={() => changeOrderBy(order.column)}
                        >
                          {order.label}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>
                <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                  <input
                    type="text"
                    name="keyword"
                    id="search"
                    placeholder="Search" // TODO: provide intl props
                    onChange={(e) => onSearchKey(e)}
                  />
                </div>
                {/* <Button
                  color="primary"
                  size="lg"
                  className="top-right-button pb-1 pt-1 text-white"
                  // TODO: add modal
                  // onClick={() => toggleModal()}
                  onClick={() => history.push('add')}
                >
                  <IntlMessages id="pages.add-new" />
                </Button> */}
              </div>
              <div className="float-md-right pt-1">
                <span className="text-muted text-small mr-1">
                  <IntlMessages id="pages.viewing" />
                  {startIndex * selectedPageSize + 1}-{' '}
                  {(startIndex + 1) * selectedPageSize > totalItemCount
                    ? totalItemCount
                    : (startIndex + 1) * selectedPageSize}
                  {` | `}
                  <IntlMessages id="pages.total" />
                  {totalItemCount}
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
                          onClick={() => setSelectedPageSize(size)}
                        >
                          {size}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </Collapse>
          </div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      {/* List heading ends */}
    </>
  );
};

export default ListHeading;
