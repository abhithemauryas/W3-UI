import {
  GET_REFERRAL_AMOUNT,
  GET_REFERRAL_ERROR,
  GET_REFERRAL_SUCCESS,
  PATCH_REFERRAL_VALUE,
  PATCH_REFERRAL_VALUE_ERROR,
  PATCH_REFERRAL_VALUE_SUCCESS,
} from './constants.referral';

export const getReferral = (params) => {
  return {
    type: GET_REFERRAL_AMOUNT,
    payload: params,
  };
};
export const getReferralSuccess = (data) => ({
  type: GET_REFERRAL_SUCCESS,
  payload: data,
});
export const getReferralError = (data) => ({
  type: GET_REFERRAL_ERROR,
  payload: data,
});

export const patchReferral = (data) => {
  return {
    type: PATCH_REFERRAL_VALUE,
    payload: data,
  };
};

export const patchReferralSuccess = (data) => ({
  type: PATCH_REFERRAL_VALUE_SUCCESS,
  payload: data,
});

export const patchReferralError = (data) => ({
  type: PATCH_REFERRAL_VALUE_ERROR,
  payload: data,
});
