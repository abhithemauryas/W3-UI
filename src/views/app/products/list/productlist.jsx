import React, { useState, useEffect } from 'react';
import useMousetrap from 'hooks/use-mousetrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { connect } from 'react-redux';
import {
  deleteProduct,
  getProducts,
  updateProduct,
  updateProductStatus,
} from 'redux/product/actions.product';
// import Breadcrumb from 'containers/navs/Breadcrumb';
import IntlMessages from 'helpers/IntlMessages';
import {
  Row,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { NavLink as RouterLink, useHistory } from 'react-router-dom';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import Switch from 'rc-switch';
import { getCurrentColor } from 'helpers/Utils';
import { NotificationManager } from 'components/common/react-notifications';
import { adminRoot } from 'constants/defaultValues';
import ProductDeleteModal from 'components/modals/ProductDeleteModal';
// eslint-disable-next-line import/no-cycle
import AddProductModal from './addProductModal';

const sortOptions = [
  { column: 'title', label: 'Title' },
  { column: 'category', label: 'Product Category' },
];
const orderOptions = [
  { column: 'asc', label: 'Ascending' },
  { column: 'desc', label: 'Descending' },
];
const pageSizes = [20, 40, 60, 80, 100];

const categories = [
  { label: 'Cakes', value: 'Cakes', key: 0 },
  { label: 'Cupcakes', value: 'Cupcakes', key: 1 },
  { label: 'Desserts', value: 'Desserts', key: 2 },
];

const ProductList = ({
  // match,
  fetchProducts,
  products,
  metadata,
  // dispatchDeleteProduct,
  successMesage,
  errorMessage,
  loading,
  dispatchUpdateStatus,
  // TODO this will help us when status change api we get
  // changeStatusProduct
}) => {
  const numberLimit = 5;
  const firstIsActive = true;
  const lastIsActive = true;
  let startPoint = 1;
  let endPoint = numberLimit;

  // TODO: Change loading logic for table i have change this to fix some problem
  // const [isLoaded, setIsLoaded] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(20);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'asc',
    label: 'Ascending',
  });
  const [selectedSortOption, setSelectedSortOption] = useState(sortOptions[0]);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [darktheme, setDarkTheme] = useState(false);
  const history = useHistory();
  const [modalDelete, setModalDelete] = useState(false);
  const [product, setProduct] = useState('');
  const [initalloading, setIndtialLoading] = useState(false);
  useEffect(() => {
    setIndtialLoading(true);
  }, []);

  // Fetch Data over here
  useEffect(() => {
    const color = getCurrentColor();
    if (color.includes('dark')) setDarkTheme(true);
    else setDarkTheme(false);
    let timeout;
    if (search) {
      timeout = setTimeout(() => {
        fetchProducts({
          limit: selectedPageSize,
          page: currentPage - 1,
          _order: selectedOrderOption.column,
          _sort: selectedSortOption.column,
          search: search.trim(),
        });
      }, 500);
    } else {
      fetchProducts({
        limit: selectedPageSize,
        page: currentPage - 1,
        _order: selectedOrderOption.column,
        _sort: selectedSortOption.column,
      });
    }
    setSelectedItems([]);
    return () => clearTimeout(timeout);
  }, [
    selectedPageSize,
    currentPage,
    selectedOrderOption,
    search,
    pageSizes,
    selectedSortOption,
  ]);

  useEffect(() => {
    if (initalloading) {
      if (successMesage) NotificationManager.success(null, successMesage);
      else if (errorMessage) NotificationManager.error(null, errorMessage);
    }
  }, [successMesage, errorMessage]);

  useEffect(() => {
    setTotalPage(metadata.totalPages);
    // TODO: Activate List of the big deal
    setItems(products);
    setTotalItemCount(metadata.recordCount);
    // setIsLoaded(false);
  }, [products]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption]);

  const changeOrderBy = (column) => {
    setSelectedOrderOption(orderOptions.find((x) => x.column === column));
  };

  const changeSortBy = (column) => {
    setSelectedSortOption(sortOptions.find((x) => x.column === column));
  };

  const handleChangeSelectAll = (isToggle) => {
    if (selectedItems.length >= items.length) {
      if (isToggle) {
        setSelectedItems([]);
      }
    } else {
      setSelectedItems(items.map((x) => x['_id']));
    }
    document.activeElement.blur();
    return false;
  };

  const onContextMenuClick = (e, data) => {
    // params : (e,data,target)
    console.log('onContextMenuClick - selected items', selectedItems);
    console.log('onContextMenuClick - action : ', data.action);
  };

  const onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    if (!selectedItems.includes(clickedProductId)) {
      setSelectedItems([clickedProductId]);
    }
    return true;
  };

  useMousetrap(['ctrl+a', 'command+a'], () => {
    handleChangeSelectAll(false);
  });

  useMousetrap(['ctrl+d', 'command+d'], () => {
    setSelectedItems([]);
    return false;
  });

  const onSearchKey = (e) => {
    setSearch(e.target.value.toLowerCase());
  };
  // const [checkedSecondaryInverse, setCheckedSecondaryInverse] = useState(false);
  const firstPageButtonClassName = currentPage <= 1 ? 'disabled' : '';
  const lastPageButtonClassName = currentPage >= totalPage ? 'disabled' : '';
  const prevPageButtonClassName = currentPage <= 1 ? 'disabled' : '';
  const nextPageButtonClassName = currentPage >= totalPage ? 'disabled' : '';

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

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

  const changeStatusHandler = (status, id, toggleHandler) => {
    // setInitialLoading(true);
    dispatchUpdateStatus({
      pathParam: id,
      data: { status },
      cb: () => {
        toggleHandler();
      },
    });
  };

  return (
    <>
      {modalDelete && (
        <ProductDeleteModal
          from="auction"
          product={product}
          id={product?.id}
          setModalDelete={setModalDelete}
          modalDelete={modalDelete}
          setCurrentPage={setCurrentPage}
          selectedPageSize={selectedPageSize}
          currentPage={currentPage}
        />
      )}
      <div className="disable-text-selection">
        {/* List Heading starts */}
        <Row>
          <Colxx xxs="12">
            <div className="mb-2 ">
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
                  <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                    <DropdownToggle caret color="outline-dark" size="xs">
                      <IntlMessages id="pages.sort" />
                      {selectedSortOption.label}
                    </DropdownToggle>
                    <DropdownMenu>
                      {sortOptions.map((order, index) => {
                        return (
                          <DropdownItem
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            onClick={() => changeSortBy(order.column)}
                          >
                            {order.label}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                    <DropdownToggle caret color="outline-dark" size="xs">
                      <IntlMessages id="pages.orderby" />
                      {selectedOrderOption.label}
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
                  <Button
                    color="primary"
                    size="lg"
                    className="top-right-button text-white pt-1 pb-1 "
                    // TODO: add modal
                    // onClick={() => toggleModal()}
                    onClick={() => history.push('add')}
                  >
                    <IntlMessages id="pages.add-new" />
                  </Button>
                </div>
                <div className="float-md-right pt-1">
                  <span className="text-muted text-small mr-1">
                    <IntlMessages id="pages.viewing" />
                    {startIndex + 1}-
                    {totalItemCount >= endIndex ? endIndex : totalItemCount}
                    {metadata.totalPages}
                    {` | `}
                    <IntlMessages id="pages.total" />
                    {metadata.totalRecord}
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
        <AddProductModal
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
          categories={categories}
        />
        {loading ? (
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
                    <th style={{ width: '100px' }}>Landing Image</th>
                    <th>Title</th>
                    <th>Product Category</th>
                    <th>Product Price</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length ? (
                    items.map((item) => {
                      // TODO: Have to add different views
                      // if (displayMode === 'thumblist') {
                      return (
                        <tr key={item.id}>
                          <td
                            className="text-align-end"
                            // style={{ backgroundColor: 'white' }}
                          >
                            <RouterLink
                              to={`${adminRoot}/product/${item.id}`}
                              className="p-0 cursor-pointer"
                            >
                              <img
                                alt="iphone"
                                src={`${process.env.REACT_APP_NODE_SERVER_API_BASE_URL}/${item.medias.local_path}`}
                                className="min-max-150 list-thumbnail responsive border-0 card-img-left product-img-radius"
                              />
                            </RouterLink>
                          </td>
                          <td>
                            <RouterLink
                              to={`${adminRoot}/product/${item.id}`}
                              className="p-0 cursor-pointer"
                            >
                              {item.title}
                            </RouterLink>
                          </td>
                          <td>{item.productCategories.title}</td>
                          <td>{item.price}</td>
                          <td>
                            <ToggleStatus
                              status={item.status}
                              id={item.id}
                              changeStatusHandler={changeStatusHandler}
                            />
                          </td>
                          <td>
                            <div className="custom-control custom-checkbox pl-1 align-self-center d-flex justify-content-center align-items-center font-20 gap-20">
                              <div
                                className="simple-icon-trash text-danger cursor-pointer font-16-bolder"
                                role="button"
                                tabIndex={0}
                                onClick={() => {
                                  setProduct(item);
                                  setModalDelete(true);
                                }}
                                onKeyPress={(e) => console.log(e)}
                              />
                              <RouterLink
                                to={`${adminRoot}/product/${item.id}/edit`}
                                className="p-0 cursor-pointer"
                              >
                                <div
                                  tabIndex={0}
                                  className="simple-icon-note text-success cursor-pointer font-16-bolder"
                                  role="button"
                                  onClick={() => {
                                    console.log('e');
                                  }}
                                  onKeyPress={(e) => console.log(e)}
                                />
                              </RouterLink>
                            </div>
                          </td>
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

            <Row>
              {/* Pagination starts here */}
              {totalPage > 1 ? (
                <Colxx xxs="12" className="mt-3 mb-3">
                  <Nav className="pagination justify-content-center">
                    {firstIsActive && (
                      <NavItem
                        className={`page-item ${firstPageButtonClassName}`}
                      >
                        <NavLink
                          className="page-link first c-pointer"
                          onClick={() => setCurrentPage(1)}
                        >
                          <i className="simple-icon-control-start" />
                        </NavLink>
                      </NavItem>
                    )}

                    <NavItem className={`page-item ${prevPageButtonClassName}`}>
                      <NavLink
                        className="page-link prev c-pointer"
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        <i className="simple-icon-arrow-left" />
                      </NavLink>
                    </NavItem>
                    {points.map((i) => {
                      return (
                        <NavItem
                          key={i}
                          className={`page-item ${
                            currentPage === i && 'active'
                          }`}
                        >
                          <NavLink
                            className="page-link c-pointer"
                            onClick={() => setCurrentPage(i)}
                          >
                            {i}
                          </NavLink>
                        </NavItem>
                      );
                    })}
                    <NavItem className={`page-item ${nextPageButtonClassName}`}>
                      <NavLink
                        className="page-link next c-pointer"
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        <i className="simple-icon-arrow-right" />
                      </NavLink>
                    </NavItem>
                    {lastIsActive && (
                      <NavItem
                        className={`page-item ${lastPageButtonClassName}`}
                      >
                        <NavLink
                          className="page-link last c-pointer"
                          onClick={() => setCurrentPage(totalPage)}
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
              <ContextMenu
                id="menu_id"
                onShow={(e) => onContextMenu(e, e.detail.data)}
              >
                <MenuItem
                  onClick={onContextMenuClick}
                  data={{ action: 'copy' }}
                >
                  <i className="simple-icon-docs" /> <span>Copy</span>
                </MenuItem>
                <MenuItem
                  onClick={onContextMenuClick}
                  data={{ action: 'move' }}
                >
                  <i className="simple-icon-drawer" />{' '}
                  <span>Move to archive</span>
                </MenuItem>
                <MenuItem
                  onClick={onContextMenuClick}
                  data={{ action: 'delete' }}
                >
                  <i className="simple-icon-trash" /> <span>Delete</span>
                </MenuItem>
              </ContextMenu>
            </Row>
          </>
        )}
      </div>
    </>
  );
};

// eslint-disable-next-line no-unused-vars
const ToggleStatus = ({ id, status, changeStatusHandler }) => {
  const [toggle, setToggle] = useState(status);
  const toggleHandler = () => {
    setToggle((changeToggle) => !changeToggle);
  };
  return (
    <Switch
      className="custom-switch custom-switch-primary custom-switch-small "
      checked={toggle}
      onClick={() => {
        changeStatusHandler(!toggle, id, toggleHandler);
      }}
    />
  );
};

const mapStateToProps = ({ product }) => {
  const { products, metadata, message, successMesage, errorMessage, loading } =
    product;
  return { products, metadata, message, successMesage, errorMessage, loading };
};

const mapActionsToProps = (dispatch) => {
  return {
    fetchProducts: (params) => dispatch(getProducts({ ...params })),
    dispatchDeleteProduct: (params, cb) => dispatch(deleteProduct(params, cb)),
    changeStatusProduct: (pathParam, data, cb) =>
      dispatch(updateProduct(pathParam, data, cb)),
    dispatchUpdateStatus: (params) =>
      dispatch(updateProductStatus({ ...params })),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(ProductList);
