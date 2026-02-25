/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import {
  AddCategory,
  addProduct,
  deleteProductImage,
  getAllCategory,
  getCategory,
  getProduct,
  updateProduct,
  uploadProductImage,
  uploadProductImageGroup,
} from 'redux/product/actions.product';
import { NotificationManager } from 'components/common/react-notifications';
// eslint-disable-next-line import/no-cycle
import ProductAddForm from './productform';

const MEDIA_OPTIONS = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
};

const PAGE_HEADING = {
  ADD_PRODUCT: 'product.add',
  EDIT_PRODUCT: 'product.edit',
};

const initialValues = {
  title: '',
  description: '',
  ProductCategory: '',
  productImage: '',
  productVideo: '',
  landingImage: '',
  productPrice: '',
  isProductVideoActive: false,
};

const ProductAdd = (props) => {
  const {
    dispatchGetCategory,
    match,
    specificProduct,
    dispatchAddProduct,
    loading,
    categories,
    dispatchUploadProductImage,
    successMesage,
    errorMessage,
    dispatchGetProduct,
    dispatchUpdateProduct,
    dispatchDeleteProductImage,
    dispatchUploadProductImageGroup,
    dispatchGetAllCategory,
    dispatchAddCategory,
  } = props;
  const params = useParams();
  const history = useHistory();
  const [heading, setHeading] = useState(PAGE_HEADING.ADD_PRODUCT);
  const [formData, setFormData] = useState(initialValues);
  const [initalloading, setIndtialLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [videoUrls, setVideoUrls] = useState('');
  const [landingImageUrl, setLandingImageUrl] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState(MEDIA_OPTIONS.IMAGE);

  const updateFormData = (res) => {
    try {
      const {
        title,
        description,
        productCategories,
        productMedias,
        medias,
        price,
      } = res.data;
      setFormData({
        title,
        description,
        ProductCategory: {
          label: productCategories.title,
          value: productCategories.title,
          id: productCategories.id,
        },
        productPrice: price,
        isProductVideoActive: productMedias[0]?.medias?.type === 'video',
        landingImage: medias.id,
        productImage:
          productMedias.length && productMedias[0]?.medias.type === 'image'
            ? productMedias.map((image) => image.medias.id)
            : '',
        productVideo:
          productMedias.length && productMedias[0]?.medias.type === 'video'
            ? productMedias.map((video) => video.medias.id)
            : '',
      });
      setLandingImageUrl(medias);
      if (productMedias[0]?.medias.type === 'video') {
        setVideoUrls(productMedias[0]?.medias?.local_path);
        setSelectedRadio(MEDIA_OPTIONS.VIDEO);
      } else {
        setSelectedRadio(MEDIA_OPTIONS.IMAGE);
        setImageUrls(productMedias.map((productMedia) => productMedia.medias));
      }
    } catch (error) {
      console.log('==== src/view/app/products/add/addproduct.jsx ====', error);
    }
  };

  useEffect(() => {
    setIndtialLoading(true);
  }, []);

  useEffect(() => {
    if (params.productId) {
      setHeading(PAGE_HEADING.EDIT_PRODUCT);
      dispatchGetProduct(params.productId, updateFormData);
    } else {
      setHeading(PAGE_HEADING.ADD_PRODUCT);
      setFormData(initialValues);
    }
  }, [params.productId]);

  useEffect(() => {
    if (initalloading) {
      if (successMesage) NotificationManager.success(null, successMesage);
      else if (errorMessage) NotificationManager.error(null, errorMessage);
    }
  }, [successMesage, errorMessage, initalloading]);

  const onSubmit = (values) => {
    const data = {
      title: values.title,
      description: values.description,
      product_category_id: values.ProductCategory.id,
      landing_image: values.landingImage,
      price: values.productPrice,
      media_id: values.isProductVideoActive
        ? values.productVideo
        : values.productImage,
    };

    if (params?.productId)
      dispatchUpdateProduct(params?.productId, data, () => {
        history.push('/app/product/list');
      });
    else
      dispatchAddProduct(data, () => {
        history.push('list');
      });
  };

  return (
    <>
      <ProductAddForm
        onSubmit={onSubmit}
        formData={formData}
        categories={categories}
        dispatchUploadProductImage={dispatchUploadProductImage}
        dispatchDeleteProductImage={dispatchDeleteProductImage}
        dispatchUploadProductImageGroup={dispatchUploadProductImageGroup}
        setImageUrls={setImageUrls}
        imageUrls={imageUrls}
        videoUrls={videoUrls}
        setVideoUrls={setVideoUrls}
        loading={loading}
        dispatchGetAllCategory={dispatchGetAllCategory}
        dispatchAddCategory={dispatchAddCategory}
        specificProduct={specificProduct}
        setLandingImageUrl={setLandingImageUrl}
        landingImageUrl={landingImageUrl}
        selectedRadio={selectedRadio}
        setSelectedRadio={setSelectedRadio}
      />
    </>
  );
};

const mapStateToProps = ({ product }) => {
  const { loading, categories, successMesage, errorMessage, specificProduct } =
    product;
  return {
    loading,
    categories,
    successMesage,
    errorMessage,
    specificProduct,
  };
};
const mapActionsToProps = (dispatch) => {
  return {
    dispatchAddProduct: (data, cb) => dispatch(addProduct({ ...data }, cb)),
    dispatchUpdateProduct: (pathParam, data, cb) =>
      dispatch(updateProduct(pathParam, { ...data }, cb)),
    dispatchGetCategory: () => dispatch(getCategory()),
    dispatchGetProduct: (pathParam, cb) => dispatch(getProduct(pathParam, cb)),
    dispatchUploadProductImage: (data, cb) =>
      dispatch(uploadProductImage(data, cb)),
    dispatchUploadProductImageGroup: (data, cb) =>
      dispatch(uploadProductImageGroup(data, cb)),
    dispatchDeleteProductImage: (data, cb) =>
      dispatch(deleteProductImage(data, cb)),
    dispatchGetAllCategory: () => dispatch(getAllCategory()),
    dispatchAddCategory: (data, cb) => dispatch(AddCategory(data, cb)),
  };
};
export default connect(mapStateToProps, mapActionsToProps)(ProductAdd);
