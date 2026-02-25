/* eslint-disable no-unused-vars */
import { Colxx } from 'components/common/CustomBootstrap';
import { Field, Formik } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { getCurrency, updateCurrency } from 'redux/currency/action.currency';
import { NotificationManager } from 'components/common/react-notifications';

const MEDIA_OPTIONS = {
  USD: 'USD',
  INR: 'INR',
};

const initialValues = {
  playValue: 2,
  bidInc: 0.2,
  big: 1,
  usdt: 0.02,
  usdc: 0.02,
};

const currencySchema = Yup.object().shape({
  bidInc: Yup.number().required('Please Enter Bid Increment.'),
  big: Yup.number().required('Please Enter Big Token.'),
  usdt: Yup.number().required('Please Enter USDT Token.'),
  usdc: Yup.number().required('Please Enter USDC Token.'),
});

const Currency = ({
  errorMessage,
  successMessage,
  loading,
  currencyData,
  fetchCurrency,
  dispatchUpdateCurrency,
}) => {
  const [currencyCode, setCurrencyCode] = useState(MEDIA_OPTIONS.INR);
  const [formData, setFormData] = useState(initialValues);
  const [sideContent, setSideContent] = useState({ big: 0, usdt: 0, usdc: 0 });
  const [initialLoading, setInitialLoading] = useState(false);
  useEffect(() => {
    setFormData(initialValues);
    setSideContent({
      big: initialValues.big,
      usdc: initialValues.usdc,
      usdt: initialValues.usdt,
    });
  }, []);
  useEffect(() => {
    if (initialLoading) {
      if (successMessage) NotificationManager.success(null, successMessage);
      else if (errorMessage) NotificationManager.error(null, errorMessage);
    }
  }, [errorMessage, successMessage]);
  const updateForm = (res) => {
    if (res.success) {
      // eslint-disable-next-line camelcase
      const { bid_increment, big_token, usdc, usdt } = res.data;
      setFormData({
        ...formData,
        bidInc: bid_increment,
        big: big_token,
        usdc,
        usdt,
      });
      setSideContent({
        big: big_token,
        usdc,
        usdt,
      });
    }
  };
  useEffect(() => {
    fetchCurrency({ currencyCode, cb: updateForm });
    setInitialLoading(true);
  }, [currencyCode]);

  const onSubmit = (values) => {

    const { bidInc, big, usdc, usdt } = values;
    const data = {
      bid_increment: bidInc,
      big_token: big,
      usdt,
      usdc,
    };
    dispatchUpdateCurrency({ data }, currencyData?.id);
  };
  const changeHandler = (e) => {
    setSideContent({ ...sideContent, [e.target.name]: e.target.value });
  };
  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <h6 className="mb-4">Currency </h6>

            <div className=" mb-4 d-flex">
              {/* <div className="w-50">
                <ButtonGroup>
                  <Button
                    color="primary"
                    onClick={() => {
                      setCurrencyCode(MEDIA_OPTIONS.INR);
                      //   setFieldValue('isProductVideoActive', false);
                    }}
                    active={currencyCode === MEDIA_OPTIONS.INR}
                  >
                    <IntlMessages id="button.inr" />
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => {
                      setCurrencyCode(MEDIA_OPTIONS.USD);
                      //   setFieldValue('isProductVideoActive', true);
                    }}
                    active={currencyCode === MEDIA_OPTIONS.USD}
                  >
                    <IntlMessages id="button.usd" />
                  </Button>
                </ButtonGroup>
              </div> */}
              <div className="w-100 text-align-end ">
                <p className="small m-0 ">1 PLAY ={sideContent.big} BIG</p>
                <p className="small m-0 ">1 PLAY ={sideContent.usdt} USDT</p>
                <p className="small m-0 ">1 PLAY ={sideContent.usdc} USDC</p>
              </div>
            </div>

            <Formik
              initialValues={formData}
              validationSchema={currencySchema}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {({ handleSubmit, errors, touched, values, handleChange }) => (
                <Form
                  onChange={(e) => changeHandler(e, values)}
                  className="av-tooltip tooltip-label-right"
                  onSubmit={handleSubmit}
                >
                  <div className="d-flex flex-wrap">
                    <div className="d-flex flex-wrap flex-sm-nowrap gap-40 w-100 mb-2">
                      <div className="w-100">
                        <FormGroup className="error-l-75">
                          <Label>
                            Value of one Play
                            <span>
                              ( in{' '}
                              {currencyCode === MEDIA_OPTIONS.USD ? (
                                <span>&#x24; </span>
                              ) : (
                                <span>&#x20B9; </span>
                              )}
                              )
                            </span>
                          </Label>
                          <Field
                            className="form-control"
                            name="playValue"
                            type="number"
                            onWheel={(e) => e.target.blur()}
                            disabled
                          />
                          {errors.playValue && touched.playValue ? (
                            <div className="position-absolute field-error">
                              {errors.playValue}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <div className="w-100">
                        <FormGroup className="error-l-75">
                          <Label>
                            Per Bid increment
                            <span>
                              ( in{' '}
                              {currencyCode === MEDIA_OPTIONS.USD ? (
                                <span>&#x24; </span>
                              ) : (
                                <span>&#x20B9; </span>
                              )}
                              )
                            </span>
                          </Label>
                          <Field
                            className="form-control"
                            name="bidInc"
                            type="number"
                            onKeyDown={(e) => {
                              if (
                                e.code === 'ArrowUp' ||
                                e.code === 'ArrowDown' ||
                                e.code === 'KeyE' ||
                                e.key === '-'
                              ) {
                                e.preventDefault();
                              } else {
                                handleChange(e);
                              }
                            }}
                            onWheel={(e) => e.target.blur()}
                          />
                          {errors.bidInc && touched.bidInc ? (
                            <div className="position-absolute field-error">
                              {errors.bidInc}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap flex-sm-nowrap gap-40 w-100 mb-2">
                      <div className="w-100">
                        <FormGroup className="error-l-75">
                          <Label>Amount of BIG Token(s) in one Play</Label>
                          <Field
                            className="form-control"
                            name="big"
                            type="number"
                            onKeyDown={(e) => {
                              if (
                                e.code === 'ArrowUp' ||
                                e.code === 'ArrowDown' ||
                                e.code === 'KeyE' ||
                                e.key === '-'
                              ) {
                                e.preventDefault();
                              } else {
                                handleChange(e);
                              }
                            }}
                            onWheel={(e) => e.target.blur()}
                          />
                          {errors.big && touched.big ? (
                            <div className="position-absolute field-error">
                              {errors.big}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <div className="w-100">
                        <FormGroup className="error-l-75">
                          <Label>Amount of USDT in one Play</Label>
                          <Field
                            className="form-control"
                            name="usdt"
                            type="number"
                            onKeyDown={(e) => {
                              if (
                                e.code === 'ArrowUp' ||
                                e.code === 'ArrowDown' ||
                                e.code === 'KeyE' ||
                                e.key === '-'
                              ) {
                                e.preventDefault();
                              } else {
                                handleChange(e);
                              }
                            }}
                            onWheel={(e) => e.target.blur()}
                          />
                          {errors.usdt && touched.usdt ? (
                            <div className="position-absolute field-error">
                              {errors.usdt}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <div className="w-100">
                        <FormGroup className="error-l-75">
                          <Label>Amount of USDC in one Play</Label>
                          <Field
                            className="form-control"
                            name="usdc"
                            type="number"
                            onKeyDown={(e) => {
                              if (
                                e.code === 'ArrowUp' ||
                                e.code === 'ArrowDown' ||
                                e.code === 'KeyE' ||
                                e.key === '-'
                              ) {
                                e.preventDefault();
                              } else {
                                handleChange(e);
                              }
                            }}
                            onWheel={(e) => e.target.blur()}
                          />
                          {errors.usdc && touched.usdc ? (
                            <div className="position-absolute field-error">
                              {errors.usdc}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </div>
                  </div>

                  <Button
                    className={`btn-multiple-state  ${
                      loading ? 'show-spinner' : ''
                    }`}
                    disabled={loading}
                    color="primary"
                    type="submit"
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>

                    <span className="label">Update</span>
                  </Button>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};

const mapStateToProps = ({ currency }) => {
  const { errorMessage, successMessage, loading, currencyData } = currency;
  return {
    errorMessage,
    successMessage,
    loading,
    currencyData,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    fetchCurrency: (params) => dispatch(getCurrency({ ...params })),
    dispatchUpdateCurrency: (payload, id) =>
      dispatch(updateCurrency({ ...payload, id })),
    // changeStatusProduct: (pathParam, data, cb) =>
    //   dispatch(updateProduct(pathParam, data, cb)),
  };
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(injectIntl(Currency));
