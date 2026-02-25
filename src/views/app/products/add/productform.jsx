/* eslint-disable */
import React, { useEffect, useState } from 'react';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  CustomInput,
  ButtonGroup,
} from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import ReactSelect, { components } from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { useParams } from 'react-router-dom';
import IntlMessages from 'helpers/IntlMessages';
import BackButton from 'components/common/BackButton';

const SignupSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Title is too short!')
    .max(20, 'Title is too long!')
    .required('Please enter title.'),
  description: Yup.string()
    .min(2, 'Description is too short!')
    .max(1000, 'Description is too long!')
    .required('Please enter description.'),

  ProductCategory: Yup.object().required('Please select product category.'),
  landingImage: Yup.string().required('Please add one landing image.'),

  productImage: Yup.array().when('isProductVideoActive', {
    is: false,
    then: Yup.array().of(Yup.string()).required('Please add five images only.'),
  }),
  productVideo: Yup.array().when('isProductVideoActive', {
    is: true,
    then: Yup.array().of(Yup.string()).required('Please add only one video.'),
  }),
  productPrice: Yup.number()
    .min(1, 'Product price should be atleast $1.')
    .required('Please enter product price.')
    .integer('Please enter integer value'),
});

const Option = (props) => {
  const { data, children, selectProps } = props;

  const handleDelete = (event) => {
    event.stopPropagation();
    selectProps.onDeleteOption(data.value);
  };
  return (
    <components.Option {...props}>
      <div className="d-flex align-items-center justify-content-between cursor-pointer">
        {children}
        <i
          className="d-none"
          //! Commented Due to Buisness logic in future we need this
          // onClick={handleDelete}
          //className={`${data.value ? '' : 'd-none'} simple-icon-close`}
        />
      </div>
    </components.Option>
  );
};
const MEDIA_OPTIONS = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
};
const ProductAddForm = (props) => {
  const {
    onSubmit,
    categories,
    dispatchUploadProductImage,
    loading,
    formData,
    dispatchDeleteProductImage,
    imageUrls,
    setImageUrls,
    dispatchUploadProductImageGroup,
    dispatchGetAllCategory,
    dispatchAddCategory,
    landingImageUrl,
    setLandingImageUrl,
    videoUrls,
    setVideoUrls,
    selectedRadio,
    setSelectedRadio,
  } = props;

  const [addProductCategory, setAddProductCategory] = useState('');
  const [categoryOptions, setCategoryOptions] = useState([]);
  const addCategoryOptions = (setFieldValue) => {
    if (addProductCategory) {
      dispatchAddCategory({ title: addProductCategory }, (data) => {
        setFieldValue('ProductCategory', {
          value: addProductCategory,
          label: addProductCategory,
          id: data.id,
        });
        setCategoryOptions([
          ...categoryOptions,
          { value: addProductCategory, label: addProductCategory },
        ]);
      });

      setAddProductCategory('');
    }
  };
  const params = useParams();

  useEffect(() => {
    dispatchGetAllCategory();
  }, [dispatchAddCategory]);
  useEffect(() => {
    const dummyCategory = [];
    categories.map((category) =>
      dummyCategory.push({
        label: category.title,
        value: category.title,
        id: category.id,
      })
    );
    setCategoryOptions(dummyCategory);
  }, [categories]);

  const handleImageFile = async (event, setFieldValue, setFieldError) => {
    event.preventDefault();
    if (event.target.value) {
      let data = new FormData();
      let length = event.target.files.length;
      if (length === 1) {
        for (let i = 0; i < event.target.files.length; i++) {
          data.append('media', event.target.files[i]);
        }
        dispatchUploadProductImage(data, (res) => {
          if (res.success) {
            //TODO For Preview Reference
            setLandingImageUrl(res.data);
            // setImageUrls((prev) => [...prev, ...res?.data]);
            setFieldValue('landingImage', res.data.id);
          } else {
            console.log(res, 'error<----');
          }
        });
      }
    }
  };

  const handleVideoFile = async (event, setFieldValue, setFieldError) => {
    event.preventDefault();
    if (event.target.value) {
      let data = new FormData();
      let length = event.target.files.length;
      if (length === 1) {
        for (let i = 0; i < event.target.files.length; i++) {
          data.append('media', event.target.files[i]);
        }
        dispatchUploadProductImage(data, (res) => {
          if (res.success) {
            setFieldValue('productVideo', [res.data.id]);
            setVideoUrls(res.data?.local_path);
          } else {
            console.log(res, 'error<----');
          }
        });
      } else {
        setFieldError('productVideo', 'Please enter one Video');
      }
    }
  };

  const handleMultipleImageFile = async (
    event,
    setFieldValue,
    setFieldError
  ) => {
    event.preventDefault();
    if (event.target.value) {
      let data = new FormData();
      let length = event.target.files.length;
      if (imageUrls.length > 1) {
        if (length === 1) {
          for (let i = 0; i < event.target.files.length; i++) {
            data.append('media', event.target.files[i]);
          }
          dispatchUploadProductImage(data, (res) => {
            if (res.success) {
              setImageUrls((prev) => [...prev, res.data]);
              const arr = [...imageUrls, res.data];
              setFieldValue(
                'productImage',
                arr.map((image) => image.id)
              );
            } else {
              console.log(res, 'error<----');
            }
          });
        } else {
          setFieldError('productImage', 'Please enter one Image');
        }
      } else {
        if (length === 5 && imageUrls.length <= 5) {
          for (let i = 0; i < event.target.files.length; i++) {
            data.append('media', event.target.files[i]);
          }
          dispatchUploadProductImageGroup(data, (res) => {
            if (res.success && res.data?.length) {
              setImageUrls(res.data);
              setFieldValue(
                'productImage',
                res.data.map((image) => image.id)
              );
            } else {
              console.log(res, 'error<----');
            }
          });
        } else {
          setFieldError('productImage', 'please Enter 5 images');
        }
      }
    }
  };

  const handleDeleteOption = (value) => {
    const remainingOptions = categoryOptions.filter(
      (option) => option.value !== value
    );
    setCategoryOptions(remainingOptions);
  };

  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <BackButton />
        <Card>
          <CardBody>
            <h6 className="mb-4">
              {params?.productId ? ' Edit Product' : 'Add Product'}
            </h6>

            <Formik
              initialValues={formData}
              validationSchema={SignupSchema}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {({
                handleSubmit,
                setFieldValue,
                setFieldError,
                setFieldTouched,
                setErrors,
                values,
                errors,
                touched,
                handleChange,
              }) => (
                <Form
                  className="av-tooltip tooltip-label-right"
                  onSubmit={(e) => {
                    setFieldValue(
                      'isProductVideoActive',
                      selectedRadio === MEDIA_OPTIONS.VIDEO ? true : false
                    );
                    handleSubmit(e);
                  }}
                >
                  <div className="d-flex flex-wrap">
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

                      <div className="w-100 position-relative">
                        <FormGroup className="error-l-75">
                          <Label>
                            Product Category{' '}
                            <span className="text-danger">*</span>
                          </Label>
                          <ReactSelect
                            components={{
                              Input: CustomSelectInput,
                              Option: Option,
                            }}
                            onDeleteOption={handleDeleteOption}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="ProductCategory"
                            inputValue={addProductCategory}
                            value={values.ProductCategory || ''}
                            onInputChange={(value, action) => {
                              if (action.action === 'input-change')
                                setAddProductCategory(value);
                            }}
                            onChange={(e) => {
                              setFieldValue('ProductCategory', e);
                            }}
                            onBlur={() => {
                              if (!touched.ProductCategory)
                                setFieldTouched('ProductCategory');
                            }}
                            options={
                              categoryOptions.length
                                ? categoryOptions
                                : [{ label: 'No data available', value: null }]
                            }
                          />
                          <i
                            className="simple-icon-plus"
                            onClick={() => addCategoryOptions(setFieldValue)}
                            style={{
                              top: '37px',
                              position: 'absolute',
                              fontSize: ' 20px',
                              right: '31px',
                              fontSize: '18px',
                              cursor: 'pointer',
                            }}
                          />
                          {errors.ProductCategory && touched.ProductCategory ? (
                            <div className="position-absolute field-error">
                              {errors.ProductCategory}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </div>

                    <div className="d-flex flex-wrap flex-sm-nowrap gap-40 w-100 mb-2">
                      <div className="w-100">
                        <FormGroup>
                          <Label>
                            Description <span className="text-danger">*</span>
                          </Label>
                          <Field
                            className="form-control"
                            name="description"
                            component="textarea"
                            rows={3}
                          />
                          {errors.description && touched.description ? (
                            <div className="position-absolute field-error">
                              {errors.description}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </div>

                    <div className="d-flex flex-wrap flex-md-nowrap gap-40 w-100 mb-2">
                      <div className="w-100">
                        <FormGroup>
                          <Label>
                            Landing Image <span className="text-danger">*</span>
                          </Label>
                          <CustomInput
                            type="file"
                            name="landingImage"
                            id="landingImage"
                            accept="image/jpg,image/jpeg,image/png"
                            className="overflow-hidden"
                            onChange={(e) => {
                              handleImageFile(e, setFieldValue, setFieldError);
                              if (!touched.image)
                                setFieldTouched('image', true);
                            }}
                            onBlur={() => setFieldTouched('landingImage', true)}
                          />
                          <p className="text-danger mb-0">
                            <strong className="text-dark">NOTE: </strong>Please
                            enter image having width of 681px and height of
                            305px
                          </p>

                          {errors.landingImage && touched.landingImage ? (
                            <div className="position-absolute field-error">
                              {errors.landingImage}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <div className="w-100">
                        <FormGroup className="error-l-75">
                          <Label>
                            Product Price <span className="text-danger">*</span>
                          </Label>
                          <Field
                            className="form-control"
                            name="productPrice"
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
                          {errors.productPrice && touched.productPrice ? (
                            <div className="position-absolute field-error">
                              {errors.productPrice}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </div>

                    <div className="d-flex flex-wrap flex-md-nowrap gap-40 w-100 mb-2">
                      <div className="w-100 logo_div">
                        <Colxx sm={6}>
                          {values.landingImage ? (
                            <div className="d-flex  logo_div">
                              <img
                                src={`${process.env.REACT_APP_NODE_SERVER_API_BASE_URL}/${landingImageUrl.local_path}`}
                                alt=""
                              />
                            </div>
                          ) : null}
                        </Colxx>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap flex-md-nowrap gap-40 w-100 mb-3">
                      <div className="w-100 d-flex justify-content-start align-items-center">
                        <ButtonGroup>
                          <Button
                            color="primary"
                            onClick={() => {
                              setSelectedRadio(MEDIA_OPTIONS.IMAGE);
                              setFieldValue('isProductVideoActive', false);
                            }}
                            active={selectedRadio === MEDIA_OPTIONS.IMAGE}
                          >
                            <IntlMessages id="button.image" />
                          </Button>
                          <Button
                            color="primary"
                            onClick={() => {
                              setSelectedRadio(MEDIA_OPTIONS.VIDEO);
                              setFieldValue('isProductVideoActive', true);
                            }}
                            active={selectedRadio === MEDIA_OPTIONS.VIDEO}
                          >
                            <IntlMessages id="button.video" />
                          </Button>
                        </ButtonGroup>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap flex-md-nowrap gap-40 w-100  mb-2">
                      {selectedRadio === MEDIA_OPTIONS.IMAGE ? (
                        <div className="w-100">
                          <FormGroup>
                            <Label>
                              Product Images{' '}
                              <span className="text-danger">*</span>
                            </Label>
                            <CustomInput
                              type="file"
                              name="productImage"
                              id="productImage"
                              accept="image/jpg,image/jpeg,image/png  "
                              className="overflow-hidden"
                              multiple
                              disabled={imageUrls.length >= 5}
                              onChange={(e) => {
                                handleMultipleImageFile(
                                  e,
                                  setFieldValue,
                                  setFieldError
                                );
                                if (!touched.image)
                                  setFieldTouched('productImage', true);
                              }}
                              onBlur={() =>
                                setFieldTouched('productImage', true)
                              }
                            />
                            <p className="text-danger mb-0">
                              <strong className="text-dark">NOTE: </strong>
                              Please enter image having width of 681px and
                              height of 305px
                            </p>

                            {errors.productImage && touched.productImage ? (
                              <div className="position-absolute field-error">
                                {errors.productImage}
                              </div>
                            ) : null}
                          </FormGroup>
                        </div>
                      ) : null}
                      {selectedRadio === MEDIA_OPTIONS.VIDEO ? (
                        <div className="w-100">
                          <FormGroup>
                            <Label>
                              Product Video{' '}
                              <span className="text-danger">*</span>
                            </Label>
                            <CustomInput
                              type="file"
                              name="productVideo"
                              id="productVideo"
                              accept="video/mp4,video/avi "
                              className="overflow-hidden"
                              onChange={(e) => {
                                handleVideoFile(
                                  e,
                                  setFieldValue,
                                  setFieldError
                                );
                                if (!touched.image)
                                  setFieldTouched('productVideo', true);
                              }}
                              onBlur={() =>
                                setFieldTouched('productVideo', true)
                              }
                            />
                            {errors.productVideo && touched.productVideo ? (
                              <div className="position-absolute field-error">
                                {errors.productVideo}
                              </div>
                            ) : null}
                          </FormGroup>
                        </div>
                      ) : null}
                    </div>
                    <div className="d-flex flex-wrap flex-md-nowrap gap-40 w-100 mb-2">
                      <div className="w-100">
                        <Colxx sm={12}>
                          {values.productImage &&
                          selectedRadio === MEDIA_OPTIONS.IMAGE ? (
                            <div className="d-flex w-100">
                              {imageUrls.length
                                ? imageUrls.map((imageUrl) => (
                                    <div
                                      key={imageUrl}
                                      className={`logo_div ml-3`}
                                    >
                                      <img
                                        src={`${process.env.REACT_APP_NODE_SERVER_API_BASE_URL}/${imageUrl.local_path}`}
                                        alt=""
                                      />
                                      <div
                                        className={`cros_icon_div cursor-pointer`}
                                      >
                                        <div
                                          tabIndex={0}
                                          className={`simple-icon-close text-danger cros_icon`}
                                          role="button"
                                          onClick={() => {
                                            setImageUrls(
                                              imageUrls.filter(
                                                (image) =>
                                                  image.id !== imageUrl.id
                                              )
                                            );
                                          }}
                                          onKeyPress={() => {}}
                                        />
                                      </div>
                                    </div>
                                  ))
                                : null}
                            </div>
                          ) : null}
                          {values.productVideo &&
                          selectedRadio === MEDIA_OPTIONS.VIDEO ? (
                            <div className="d-flex w-100">
                              <div className="logo_div">
                                <video
                                  controls={false}
                                  className="w-100 h-100"
                                  src={`${process.env.REACT_APP_NODE_SERVER_API_BASE_URL}/${videoUrls}`}
                                  autoPlay
                                  canPlay
                                  muted
                                  loop
                                  canP
                                />
                              </div>
                            </div>
                          ) : null}
                        </Colxx>
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
                    {params?.productId ? (
                      <span className="label"> Update Product</span>
                    ) : (
                      <span className="label">+ Add Product</span>
                    )}
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

export default ProductAddForm;
