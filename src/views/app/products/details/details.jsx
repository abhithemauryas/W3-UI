/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Colxx } from 'components/common/CustomBootstrap';
import { NotificationManager } from 'components/common/react-notifications';
import ProductDeleteModal from 'components/modals/ProductDeleteModal';
import IntlMessages from 'helpers/IntlMessages';
import { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import {
  Badge,
  Card,
  CardBody,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';
import {
  deleteProduct,
  deleteProductImage,
  getProduct,
} from 'redux/product/actions.product';

const ProductDetails = ({
  match,
  intl,
  fetchProduct,
  loading,
  successMesage,
  errorMessage,
  dispatchDeleteMedia,
}) => {
  const {
    params: { productId },
  } = match;
  const history = useHistory();
  const { messages } = intl;
  const [product, setProduct] = useState({});
  const [modalDelete, setModalDelete] = useState(false);
  useEffect(() => {
    fetchProduct(productId, (res) => {
      setProduct(res.data);
    });
  }, []);

  useEffect(() => {
    if (successMesage) {
      NotificationManager.success(null, successMesage);
      history.push('/app/product/list');
    } else if (errorMessage) {
      NotificationManager.error(null, errorMessage);
      history.push('/app/product/list');
    }
  }, [successMesage, errorMessage]);

  const deleteMediahandler = (id) => {
    dispatchDeleteMedia([id]);
  };

  return loading ? (
    <div className="loading" />
  ) : (
    <>
      {modalDelete && (
        <ProductDeleteModal
          from="auction"
          id={productId}
          setModalDelete={setModalDelete}
          modalDelete={modalDelete}
          product={product}
        />
      )}
      <Row>
        <Colxx xxs="12">
          {Object.keys(product).length > 0 ? (
            <>
              <h1>{product.title}</h1>
              {/* TODO: Action to add Delete feature for single product */}
              <div className="text-zero top-right-button-container">
                <UncontrolledDropdown>
                  <DropdownToggle
                    caret
                    color="primary"
                    size="lg"
                    outline
                    className="top-right-button top-right-button-single"
                  >
                    <IntlMessages id="pages.actions" />
                  </DropdownToggle>
                  <DropdownMenu>
                    {/* <DropdownItem header>
                      <IntlMessages id="pages.header" />
                    </DropdownItem>
                    <DropdownItem disabled>
                      <IntlMessages id="pages.delete" />
                    </DropdownItem> */}
                    <DropdownItem
                      onClick={() => {
                        setModalDelete(true);
                      }}
                    >
                      <IntlMessages id="action.delete" />
                    </DropdownItem>
                    <DropdownItem divider />
                    <NavLink
                      to={`${product.id}/edit`}
                      className="p-0 cursor-pointer"
                    >
                      <DropdownItem>
                        <IntlMessages id="action.edit" />
                      </DropdownItem>
                    </NavLink>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>

              <Row className="mt-3">
                <Colxx xxs="12" xl="8" className="col-left">
                  <Card className="mb-4">
                    <CardBody style={{ height: '413px' }}>
                      <div className=" d-flex justify-content-center h-75 position-relative">
                        <img
                          src={`${process.env.REACT_APP_NODE_SERVER_API_BASE_URL}/${product.medias.local_path}`}
                          alt="product"
                          className=" h-75  contain"
                        />
                        {/* <i
                          className="simple-icon-close  font-weight-bold  position-absolute"
                          style={{
                            fontSize: '18px',
                            zIndex: 99999999,
                            color: 'red',
                            top: '10px',
                            left: '500px',
                          }}
                          onClick={() => deleteMediahandler(product.medias.id)}
                          onKeyDown={() =>
                            deleteMediahandler(product.medias.id)
                          }
                        /> */}
                      </div>
                      <div className="h-25 d-flex justify-between img-fluid gap-4 position-relative">
                        {product.productMedias.map((media) => (
                          <>
                            <div
                              className="position-relative d-flex justify-content-center align-items-center"
                              style={{
                                height: '100%',
                                minHeight: '100px',
                                maxHeight: '200px',
                                width: '150px',
                                minWidth: '100px',
                                maxWidth: '200px',
                              }}
                            >
                              <div className="logo_div">
                                {media.medias.type === 'video' ? (
                                  <video
                                    controls={false}
                                    className="logo_div"
                                    loop
                                    autoPlay
                                    muted
                                  >
                                    <source
                                      src={`${process.env.REACT_APP_NODE_SERVER_API_BASE_URL}/${media.medias.local_path}`}
                                      type="video/webm"
                                    />
                                  </video>
                                ) : (
                                  <img
                                    key={media.medias.id}
                                    src={`${process.env.REACT_APP_NODE_SERVER_API_BASE_URL}/${media.medias.local_path}`}
                                    alt="product"
                                  />
                                )}
                              </div>
                              <div
                                onClick={() =>
                                  deleteMediahandler(media.medias.id)
                                }
                                onKeyDown={() =>
                                  deleteMediahandler(media.medias.id)
                                }
                              >
                                {/* <i
                                  className="simple-icon-close  font-weight-bold"
                                  style={{
                                    position: 'absolute',
                                    top: '-11px',
                                    fontSize: '18px',
                                    left: '137px',
                                    zIndex: 99999999,
                                    color: 'red',
                                  }}
                                /> */}
                              </div>
                            </div>
                          </>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                </Colxx>

                <Colxx xxs="12" xl="4" className="col-right">
                  <Card className="mb-4">
                    <CardBody>
                      <p className="text-muted text-small mb-2">
                        {messages['product.description']}
                      </p>
                      <p className="mb-3">{product.description}</p>
                      <div>
                        <p className="text-muted text-small mb-2">
                          {messages['product.price']}
                        </p>
                        <p className="mb-3">{product.price}</p>
                      </div>
                      <p className="text-muted text-small mb-2">
                        {messages['product.category']}
                      </p>
                      <p className="mb-3">
                        <Badge
                          color="outline-secondary"
                          className="mb-1 mr-1"
                          pill
                        >
                          {product?.productCategories?.title}
                        </Badge>
                      </p>
                    </CardBody>
                  </Card>
                </Colxx>
              </Row>
            </>
          ) : (
            <>No Data Found Please Try again later</>
          )}
        </Colxx>
      </Row>
    </>
  );
};
const mapStateToProps = ({ product }) => {
  const { products, metadata, message, loading, successMesage, errorMessage } =
    product;
  return { products, metadata, message, loading, successMesage, errorMessage };
};

const mapActionsToProps = (dispatch) => {
  return {
    fetchProduct: (params, cb) => dispatch(getProduct(params, cb)),
    dispatchDeleteProduct: (params, cb) => dispatch(deleteProduct(params, cb)),
    dispatchDeleteMedia: (params, cb) =>
      dispatch(deleteProductImage(params, cb)),
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(injectIntl(ProductDetails));
