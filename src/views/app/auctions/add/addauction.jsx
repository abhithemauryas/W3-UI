import { NotificationManager } from 'components/common/react-notifications';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  addAuction,
  getAuction,
  updateAuction,
  uploadAuctionImage,
  uploadAuctionVideo,
} from 'redux/auction/actions.auction';
import { getProducts } from 'redux/product/actions.product';
import { getTermsAndCondition } from 'redux/termsAndCondition/actions.termsAndCondition';

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AuctionAddForm from './auctionform';

const PAGE_HEADING = {
  ADD_AUCTION: 'auction.add',
  EDIT_AUCTION: 'auction.edit',
};

const initialValues = {
  product: '',
  auctionType: '',
  title: '',
  // participantsThreshold: '',
  description: '',
  numberOfPlays: '',
  registerationStatus: true,
  preparticipantCount: '',
  preparticipantFees: '',
  termsAndCondition: '',
  isMinMax: '',
  totalBids: '',
  decimalCount: '',
};

const AuctionAdd = ({
  loading,
  errorMessage,
  successMesage,
  auctioncategories,
  dispatchProductGetCategory,
  products,
  dispatchAddAuction,
  dispatchGetAuction,
  dispatchUploadAuctionImage,
  dispatchUploadAuctionVideo,
  dispatchGetTermsAndCondition,
  dispatchUpdateAuction,
}) => {
  const params = useParams();
  const history = useHistory();
  /*eslint-disable */
  const [heading, setHeading] = useState(PAGE_HEADING.ADD_PRODUCT);
  const [formData, setFormData] = useState(initialValues);
  const [initalloading, setIndtialLoading] = useState(false);
  const [textQuillStandard, setTextQuillStandard] = useState('');
  const [description, setDescription] = useState('');
  const [checkedSecondaryInverse, setCheckedSecondaryInverse] = useState(true);
  const [auctionCondtion, setAuctionCondtion] = useState('');
  useEffect(() => {
    if (!params?.auctionId) {
      dispatchGetTermsAndCondition({
        cb: (res) => {
          if (res.success)
            setFormData({ ...formData, termsAndCondition: res.data.content });
        },
      });
      setIndtialLoading(true);
    }
  }, []);
  useEffect(() => {
    if (params.auctionId) {
      setHeading(PAGE_HEADING.EDIT_AUCTION);
    } else {
      setHeading(PAGE_HEADING.ADD_AUCTION);
      // setFormData(initialValues);
    }
  }, [params.auctionId]);

  useEffect(() => {
    if (initalloading) {
      if (successMesage) NotificationManager.success(null, successMesage);
      else if (errorMessage) NotificationManager.error(null, errorMessage);
    }
  }, [successMesage, errorMessage]);

  const updateFormData = (res) => {
    const {
      title,
      description,
      plays_consumed_on_bid,
      registeration_count,
      registeration_fees,
      terms_and_conditions,
      is_preRegistered,
      auctionCategory,
      products,
      decimal_count,
      total_bids,
    } = res.data;
    let data = {
      title,
      registerationStatus: is_preRegistered,
      termsAndCondition: terms_and_conditions,
      description,
      numberOfPlays: plays_consumed_on_bid,
      auctionType: { label: auctionCategory.title, id: auctionCategory.id },
      product: { label: products.title, value: products.id },
    };
    if (is_preRegistered) {
      data = {
        ...data,
        preparticipantCount: registeration_count,
        preparticipantFees: registeration_fees,
      };
      if (auctionCategory.code !== 'TLP') {
        data = {
          ...data,
          isMinMax: true,
          totalBids: total_bids,
          decimalCount: decimal_count,
        };
        setAuctionCondtion(true);
      }
    } else {
      if (auctionCategory.code !== 'TLP') {
        data = {
          ...data,
          isMinMax: true,
          totalBids: total_bids,
          decimalCount: decimal_count,
        };
        setAuctionCondtion(true);
      }
    }
    setCheckedSecondaryInverse(is_preRegistered);
    setTextQuillStandard(terms_and_conditions);
    setFormData(() => data);
  };

  useEffect(() => {
    dispatchProductGetCategory();
    if (params?.auctionId) {
      dispatchGetAuction(params.auctionId, updateFormData);
    }
  }, [params?.auctionId]);

  const onSubmitHandle = (values) => {
    let data = {
      title: values.title,
      is_pregistered: values.registerationStatus,
      auction_category_id: values.auctionType.id,
      product_id: values.product.value,
      terms_condition: values.termsAndCondition,
      description: values.description,
      play_consumed: values.numberOfPlays,
    };
    if (values.registerationStatus) {
      data = {
        ...data,
        pre_register_count: values.preparticipantCount,
        pre_register_fees: values.preparticipantFees,
      };
      if (values.isMinMax) {
        data = {
          ...data,
          decimal_count: values.decimalCount,
          total_bids: values.totalBids,
        };
      }
    } else {
      if (values.isMinMax) {
        data = {
          ...data,
          decimal_count: values.decimalCount,
          total_bids: values.totalBids,
        };
      }
    }

    if (params?.auctionId) {
      delete data.is_pregistered;
      delete data.product_id;
      delete data.play_consumed;

      dispatchUpdateAuction(params?.auctionId, data, () => {
        history.push('/app/auctions/list');
      });
    } else
      dispatchAddAuction(data, () => {
        history.push('list');
      });
  };

  return (
    <>
      <AuctionAddForm
        onSubmitHandel={onSubmitHandle}
        formData={formData}
        checkedSecondaryInverse={checkedSecondaryInverse}
        setCheckedSecondaryInverse={setCheckedSecondaryInverse}
        dispatchUploadAuctionImage={dispatchUploadAuctionImage}
        auctionCondtion={auctionCondtion}
        setAuctionCondtion={setAuctionCondtion}
        auctioncategories={auctioncategories}
        products={products}
        setDescription={setDescription}
        description={description}
        loading={loading}
        // defaultTermsAndCondition={termsCon}
        dispatchUploadAuctionVideo={dispatchUploadAuctionVideo}
        setTextQuillStandard={setTextQuillStandard}
        textQuillStandard={textQuillStandard}
      />
    </>
  );
};

const mapStateToProps = ({ auction, product, termsAndCondition }) => {
  const { loading, auctioncategories, successMesage, errorMessage } = auction;
  const { products, category } = product;
  const { termsCon } = termsAndCondition;
  return {
    loading,
    auctioncategories,
    products,
    successMesage,
    errorMessage,
    termsCon,
    category,
  };
};
const mapActionsToProps = (dispatch) => {
  return {
    dispatchAddAuction: (data, cb) => dispatch(addAuction({ ...data }, cb)),
    dispatchUpdateAuction: (pathParam, data, cb) =>
      dispatch(updateAuction(pathParam, { ...data }, cb)),
    dispatchGetAuction: (pathParam, cb) => dispatch(getAuction(pathParam, cb)),
    dispatchProductGetCategory: () => dispatch(getProducts()),
    dispatchUploadAuctionImage: (data, cb) =>
      dispatch(uploadAuctionImage(data, cb)),
    dispatchUploadAuctionVideo: (data, cb) =>
      dispatch(uploadAuctionVideo(data, cb)),
    dispatchGetTermsAndCondition: (params) =>
      dispatch(getTermsAndCondition(params)),
  };
};
export default connect(mapStateToProps, mapActionsToProps)(AuctionAdd);
