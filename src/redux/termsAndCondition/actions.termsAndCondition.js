import {
  CREATE_TERMS_AND_CONDITION,
  CREATE_TERMS_AND_CONDITION_ERROR,
  CREATE_TERMS_AND_CONDITION_SUCCESS,
  GET_TERMS_AND_CONDITION,
  GET_TERMS_AND_CONDITION_ERROR,
  GET_TERMS_AND_CONDITION_SUCCESS,
  UPDATE_TERMS_AND_CONDITION,
  UPDATE_TERMS_AND_CONDITION_ERROR,
  UPDATE_TERMS_AND_CONDITION_SUCCESS,
} from './constant.termsAndCondition';

export const createTermsAndCondition = (data) => ({
  type: CREATE_TERMS_AND_CONDITION,
  payload: data,
});
export const createTermsAndConditionSuccess = (response) => ({
  type: CREATE_TERMS_AND_CONDITION_SUCCESS,
  payload: response,
});
export const createTermsAndConditionError = (response) => ({
  type: CREATE_TERMS_AND_CONDITION_ERROR,
  payload: response,
});

export const updateTermsAndCondition = (content, id) => ({
  type: UPDATE_TERMS_AND_CONDITION,
  payload: { content, id },
});
export const updateTermsAndConditionSuccess = (response) => ({
  type: UPDATE_TERMS_AND_CONDITION_SUCCESS,
  payload: response,
});
export const updateTermsAndConditionError = (response) => ({
  type: UPDATE_TERMS_AND_CONDITION_ERROR,
  payload: response,
});

export const getTermsAndCondition = (params) => ({
  type: GET_TERMS_AND_CONDITION,
  payload: params,
});
export const getTermsAndConditionSuccess = (response) => ({
  type: GET_TERMS_AND_CONDITION_SUCCESS,
  payload: response,
});
export const getTermsAndConditionError = (response) => ({
  type: GET_TERMS_AND_CONDITION_ERROR,
  payload: response,
});
