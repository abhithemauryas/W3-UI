/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { Colxx } from 'components/common/CustomBootstrap';
import Switch from 'rc-switch';
import ReactSelect from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { injectIntl } from 'react-intl';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import { auctionType } from 'constants/defaultValues';
// import styles from '../auction.module.css';
import {
  addAuctionType,
  deleteAuctionType,
  getAuctionType,
} from 'redux/auction/actions.auction';
import Editor from 'components/editor/Editor';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import BackButton from 'components/common/BackButton';

const today = new Date();
today.setHours(0, 0, 0, 0);

const SignupSchema = Yup.object().shape({
  title: Yup.string().min(1, 'Too Short!').required('Please enter title'),

  numberOfPlays: Yup.number()
    .positive('Must be more than 0')
    .required('Please enter number of XPs.'),

  // participantsThreshold: Yup.number().when(['registerationStatus,isMinMax'], {
  //   is: true,
  //   then: Yup.number()
  //     .min(1, 'must be 1')
  //     .required('Please participantsThreshold'),
  //   otherwise: Yup.number()
  //     .nullable()
  //     .notRequired()
  //     .test('bothFalse', 'Please participantsThreshold', function (value) {
  //       const { registerationStatus, isMinMax } = this.parent;
  //       if (!registerationStatus && !isMinMax) {
  //         return value !== null && value !== undefined;
  //       }
  //       return true;
  //     }),
  // }),
  auctionType: Yup.object().required('Please select category'),
  registerationStatus: Yup.boolean(),
  isMinMax: Yup.boolean(),
  preparticipantCount: Yup.number().when('registerationStatus', {
    is: true,
    then: Yup.number()
      .positive('Must be more than 0')
      .required('Please set participant count'),
  }),
  preparticipantFees: Yup.number().when('registerationStatus', {
    is: true,
    then: Yup.number()
      .positive('Must be more than 0')
      .required('Please set participant fees'),
  }),
  product: Yup.object().required('Please select product.'),
  termsAndCondition: Yup.string()
    .required('Please Enter Terms and Condition')
    .min(3, 'Minimum 3 char required'),
  description: Yup.string().required('Please Enter Auction Information'),
  decimalCount: Yup.number().when('isMinMax', {
    is: true,
    then: Yup.number().required('Please set decimal count.'),
  }),
  totalBids: Yup.number().when('isMinMax', {
    is: true,
    then: Yup.number().required('Please set total bids.'),
  }),
});
// const Option = (props) => {
//   const { children } = props;
//   // const { data, children, selectProps } = props;

//   // const handleDelete = (event) => {
//   //   event.stopPropagation();

//   //   selectProps.onDeleteOption(data.id);
//   // };
//   return (
//     <components.Option {...props}>
//       <div className="d-flex align-items-center justify-content-between cursor-pointer">
//         {children}
//         {/* <i
//           // onClick={handleDelete}
//           className={`${data.title ? '' : 'd-none'} simple-icon-close`}
//         /> */}
//       </div>
//     </components.Option>
//   );
// };
const AuctionAddForm = (props) => {
  const {
    onSubmitHandel,
    auctionTypes,
    loading,
    formData,
    // intl,
    // auctioncategories,
    products,
    // dispatchAuctionTypes,
    dispatchfetchAuctionsTypes,
    // defaultTermsAndCondition,
    // dispatchDeleteAuctionTypes,
    setTextQuillStandard,
    textQuillStandard,
    checkedSecondaryInverse,
    setCheckedSecondaryInverse,
    auctionCondtion,
    // hideStartDate,
    setAuctionCondtion,
    setDescription,
    description,
  } = props;
  // const { messages } = intl;

  const [addAuctionCategory, setAddAuctionCategory] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  // const [selectedAuctionCategory, setSelectedAuctionCategory] = useState('');

  const [auctionTypeOptions, setauctionTypeOptions] = useState([]);

  const auctionsTypesData =
    auctionTypes &&
    auctionTypes?.map((obj) => ({
      ...obj,
      label: obj.title,
      value: obj.id,
    }));

  // const addCategoryOptions = () => {
  //   dispatchAuctionTypes(
  //     {
  //       title: addAuctionCategory,
  //     },
  //     (res) => {
  //       if (res.success) {
  //         dispatchfetchAuctionsTypes();
  //         setAddAuctionCategory('');
  //       } else {
  //         console.log('error', res);
  //       }
  //     }
  //   );
  // };

  useEffect(() => {
    const options = products.map((category) => ({
      label: category.title,
      value: category.id,
    }));
    setauctionTypeOptions([...options]);
  }, [products]);

  useEffect(() => {
    dispatchfetchAuctionsTypes();
  }, [dispatchfetchAuctionsTypes]);

  const params = useParams();

  // const handleDeleteOption = (id) => {
  //   dispatchDeleteAuctionTypes(
  //     {
  //       ids: [id],
  //     },
  //     (res) => {
  //       if (res.success) {
  //         dispatchfetchAuctionsTypes();
  //         setAddAuctionCategory({
  //           label: 'No data available',
  //           value: null,
  //         });
  //       } else {
  //         console.log('error', res);
  //       }
  //     }
  //   );
  // };

  const auctionTypesValidations = (e) => {
    switch (e?.title) {
      case auctionType.HIGHESTUNIQUEBID:
        setAuctionCondtion(true);
        break;
      case auctionType.LOWESTUNIQUEBID:
        setAuctionCondtion(true);
        break;
      case auctionType.THELASTPLAY:
        setAuctionCondtion(false);
        break;
      default:
        setAuctionCondtion(false); // Default case, can be omitted if you want to keep it as false
    }
  };

  const isEditForm = !!params?.auctionId;

  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <BackButton />
        <Card>
          <CardBody>
            <h6 className="mb-4">
              {isEditForm ? 'Edit Auction' : ' Add Auction'}
            </h6>
            <Formik
              initialValues={formData}
              validationSchema={SignupSchema}
              onSubmit={onSubmitHandel}
              enableReinitialize
            >
              {({
                handleSubmit,
                setFieldValue,
                setFieldTouched,
                values,
                errors,
                touched,
                setFieldError,
                handleChange,
              }) => (
                <form
                  className="av-tooltip tooltip-label-right"
                  onSubmit={(e) => {
                    handleSubmit(e);

                    setFieldTouched('description', true);
                  }}
                >
                  <div className="d-flex flex-wrap">
                    <div className="d-flex flex-wrap flex-sm-nowrap gap-40 w-100 mb-2">
                      <div className="w-100">
                        <FormGroup className="error-l-75">
                          <Label>
                            Product <span className="text-danger">*</span>
                          </Label>
                          <ReactSelect
                            className="react-select"
                            classNamePrefix="react-select"
                            name="product"
                            value={values.product}
                            onChange={(e) => {
                              setFieldValue('product', e);
                            }}
                            styles={{
                              control: (provided) => ({
                                ...provided,
                                backgroundColor: isEditForm ? '#ccc' : 'white', // Change the background color as needed
                              }),
                            }}
                            isDisabled={isEditForm}
                            options={
                              auctionTypeOptions.length
                                ? auctionTypeOptions
                                : [
                                    {
                                      label: 'No data available',
                                      value: null,
                                    },
                                  ]
                            }
                          />
                          {errors.product && touched.product ? (
                            <div className="position-absolute field-error">
                              {errors.product}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <div className="w-100">
                        <FormGroup className="error-l-75">
                          <Label>
                            Auction Type <span className="text-danger">*</span>
                          </Label>
                          <ReactSelect
                            components={{
                              Input: CustomSelectInput,
                              // Option: Option,
                            }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="auctionType"
                            inputValue={addAuctionCategory}
                            value={values.auctionType || ''}
                            onInputChange={(value, action) => {
                              if (action.action === 'input-change')
                                setAddAuctionCategory(value);
                              setFieldValue(
                                'isMinMax',
                                Boolean(auctionCondtion)
                              );
                            }}
                            onChange={(e) => {
                              setFieldValue('auctionType', e);
                              // setSelectedAuctionCategory(e);
                              auctionTypesValidations(e);
                            }}
                            onBlur={() => {
                              if (!touched.auctionType)
                                setFieldTouched('auctionType');
                            }}
                            options={
                              auctionsTypesData?.length
                                ? auctionsTypesData
                                : [
                                    {
                                      label: 'No data available',
                                      value: '5454',
                                    },
                                  ]
                            }
                          />

                          {errors.auctionType && touched.auctionType ? (
                            <div className="position-absolute field-error">
                              {errors.auctionType}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <div className="w-100">
                        <FormGroup>
                          <Label>
                            XPs Consumed Per Bid{' '}
                            <span className="text-danger">*</span>
                          </Label>
                          <Field
                            className="form-control"
                            name="numberOfPlays"
                            type="number"
                            min={0}
                            onKeyDown={(e) => {
                              if (
                                e.code === 'ArrowUp' ||
                                e.code === 'ArrowDown' ||
                                e.code === 'KeyE' ||
                                e.key === '.' ||
                                e.key === '-'
                              ) {
                                e.preventDefault();
                              } else {
                                handleChange(e);
                              }
                            }}
                            disabled={isEditForm}
                            onWheel={(e) => e.target.blur()}
                          />
                          {errors.numberOfPlays && touched.numberOfPlays ? (
                            <div className="position-absolute field-error">
                              {errors.numberOfPlays}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </div>

                    <div className="d-flex flex-wrap flex-sm-nowrap gap-40 w-100 mb-2">
                      <div className="w-100">
                        <FormGroup className="error-l-75">
                          <Label>
                            Title <span className="text-danger">*</span>
                          </Label>
                          <Field className="form-control" name="title" />
                          {errors.title && touched.title ? (
                            <div className="position-absolute field-error">
                              {errors.title}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </div>

                    <div className="d-flex flex-wrap flex-sm-nowrap gap-40 w-100 mb-2">
                      <FormGroup className="error-l-75">
                        <Label for="registerationStatus">
                          Registration &nbsp;
                        </Label>
                        <Switch
                          name="registerationStatus"
                          checked={checkedSecondaryInverse}
                          className="custom-switch custom-switch-primary custom-switch-small "
                          onChange={(secondaryInverse) => {
                            setCheckedSecondaryInverse(secondaryInverse);
                            setFieldValue(
                              'registerationStatus',
                              secondaryInverse
                            );
                          }}
                          disabled={isEditForm}
                        />
                        {errors.registerationStatus &&
                        touched.registerationStatus ? (
                          <div className="position-absolute field-error">
                            {errors.registerationStatus}
                          </div>
                        ) : null}
                      </FormGroup>
                    </div>

                    {checkedSecondaryInverse ? (
                      <>
                        <div className="d-flex flex-wrap flex-sm-nowrap gap-40 w-100 mb-2">
                          <div className="w-100">
                            <FormGroup>
                              <Label>
                                Participant Count{' '}
                                <span className="text-danger">*</span>
                              </Label>
                              <Field
                                className="form-control"
                                name="preparticipantCount"
                                type="number"
                                onKeyDown={(e) => {
                                  if (
                                    e.code === 'ArrowUp' ||
                                    e.code === 'ArrowDown' ||
                                    e.code === 'KeyE' ||
                                    e.key === '.' ||
                                    e.key === '-'
                                  ) {
                                    e.preventDefault();
                                  } else {
                                    handleChange(e);
                                  }
                                }}
                                onWheel={(e) => e.target.blur()}
                              />
                              {errors.preparticipantCount &&
                              touched.preparticipantCount ? (
                                <div className="position-absolute field-error">
                                  {errors.preparticipantCount}
                                </div>
                              ) : null}
                            </FormGroup>
                          </div>
                          <div className="w-100">
                            <FormGroup>
                              <Label>
                                {' '}
                                Registration Fees (XPs){' '}
                                <span className="text-danger">*</span>
                              </Label>
                              <Field
                                className="form-control"
                                name="preparticipantFees"
                                type="number"
                                onKeyDown={(e) => {
                                  if (
                                    e.code === 'ArrowUp' ||
                                    e.code === 'ArrowDown' ||
                                    e.code === 'KeyE' ||
                                    e.key === '.' ||
                                    e.key === '-'
                                  ) {
                                    e.preventDefault();
                                  } else {
                                    handleChange(e);
                                  }
                                }}
                                disabled={isEditForm}
                                onWheel={(e) => e.target.blur()}
                              />
                              {errors.preparticipantFees &&
                              touched.preparticipantFees ? (
                                <div className="position-absolute field-error">
                                  {errors.preparticipantFees}
                                </div>
                              ) : null}
                            </FormGroup>
                          </div>
                        </div>
                      </>
                    ) : null}

                    {auctionCondtion ? (
                      <div className="d-flex flex-wrap flex-sm-nowrap gap-40 w-100 mb-2">
                        <div className="w-100">
                          <FormGroup className="error-l-75">
                            <Label>
                              Decimal Count{' '}
                              <span className="text-danger">*</span>
                            </Label>
                            <Field
                              className="form-control"
                              name="decimalCount"
                              type="number"
                              onKeyDown={(e) => {
                                if (
                                  e.code === 'ArrowUp' ||
                                  e.code === 'ArrowDown' ||
                                  e.code === 'KeyE' ||
                                  e.key === '.' ||
                                  e.key === '-'
                                ) {
                                  e.preventDefault();
                                } else {
                                  handleChange(e);
                                }
                              }}
                              onWheel={(e) => e.target.blur()}
                            />
                            {errors.decimalCount && touched.decimalCount ? (
                              <div className="position-absolute field-error">
                                {errors.decimalCount}
                              </div>
                            ) : null}
                          </FormGroup>
                        </div>
                        <div className="w-100">
                          <FormGroup className="error-l-75">
                            <Label>
                              Total Bids <span className="text-danger">*</span>
                            </Label>
                            <Field
                              className="form-control"
                              name="totalBids"
                              type="number"
                              onKeyDown={(e) => {
                                if (
                                  e.code === 'ArrowUp' ||
                                  e.code === 'ArrowDown' ||
                                  e.code === 'KeyE' ||
                                  e.key === '.' ||
                                  e.key === '-'
                                ) {
                                  e.preventDefault();
                                } else {
                                  handleChange(e);
                                }
                              }}
                              onWheel={(e) => e.target.blur()}
                            />
                            {errors.totalBids && touched.totalBids ? (
                              <div className="position-absolute field-error">
                                {errors.totalBids}
                              </div>
                            ) : null}
                          </FormGroup>
                        </div>
                      </div>
                    ) : null}

                    {/* <div className="d-flex flex-wrap flex-sm-nowrap gap-40 w-100 mb-2">
                      <div className="w-100">
                        <FormGroup>
                          <Label>Terms and Condition</Label>

                          <ReactQuill
                            theme="bubble"
                            value={
                              defaultTermsAndCondition
                                ? defaultTermsAndCondition
                                : ''
                            }
                            className="non-editable"
                            readOnly
                          />
                        </FormGroup>
                      </div>
                    </div> */}

                    <div className="d-flex flex-wrap flex-sm-nowrap gap-40 w-100 mb-2">
                      <div className="w-100">
                        <FormGroup>
                          <Label>
                            Terms and Conditions{' '}
                            <span className="text-danger">*</span>
                          </Label>

                          <Editor
                            textQuillStandard={values.termsAndCondition}
                            onBlur={() => {
                              setFieldTouched('termsAndCondition', true);
                            }}
                            onChange={(value) => {
                              if (value === '<p><br></p>') {
                                setFieldValue('termsAndCondition', '');
                              } else {
                                setFieldValue('termsAndCondition', value);
                              }
                            }}
                          />
                          {errors.termsAndCondition &&
                          touched.termsAndCondition ? (
                            <div className="position-absolute field-error">
                              {errors.termsAndCondition}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-wrap flex-sm-nowrap gap-40 w-100 mb-2">
                    <div className="w-100">
                      <FormGroup>
                        <Label>
                          Auction Information{' '}
                          <span className="text-danger">*</span>
                        </Label>
                        {description}
                        <Editor
                          textQuillStandard={values.description}
                          defaultValue={values.description}
                          // setTextQuillStandard={setDescription}
                          onBlur={() => {
                            setFieldTouched('description', true);
                          }}
                          onChange={(value) => {
                            if (value === '<p><br></p>') {
                              setFieldValue('description', '');
                            } else {
                              setFieldValue('description', value);
                            }
                          }}
                        />
                        {errors.description && touched.description ? (
                          <div className="position-absolute field-error">
                            {errors.description}
                          </div>
                        ) : null}
                      </FormGroup>
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

                    {params?.auctionId ? (
                      <span className="label"> Update Auction</span>
                    ) : (
                      <span className="label">+ Add Auction</span>
                    )}
                  </Button>
                </form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};

const mapStateToProps = ({ auction }) => {
  const {
    auctionTypes,
    metadata,
    message,
    successMesage,
    errorMessage,
    loading,
  } = auction;
  return {
    auctionTypes,
    metadata,
    message,
    successMesage,
    errorMessage,
    loading,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    dispatchfetchAuctionsTypes: () => dispatch(getAuctionType()),
    dispatchAuctionTypes: (payload, cb) =>
      dispatch(addAuctionType(payload, cb)),
    dispatchDeleteAuctionTypes: (payload, cb) =>
      dispatch(deleteAuctionType(payload, cb)),
    // changeStatusProduct: (pathParam, data, cb) =>
    //   dispatch(updateProduct(pathParam, data, cb)),
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(injectIntl(AuctionAddForm));
