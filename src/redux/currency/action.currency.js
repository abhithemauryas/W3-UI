import {
  GET_CURRENCY,
  GET_CURRENCY_ERROR,
  GET_CURRENCY_SUCCESS,
  UPDATE_CURRENCY,
  UPDATE_CURRENCY_ERROR,
  UPDATE_CURRENCY_SUCCESS,
} from './constants.currency';

export const getCurrency = (params) => {
  return {
    type: GET_CURRENCY,
    payload: params,
  };
};
export const getCurrencySuccess = (data) => {
  return {
    type: GET_CURRENCY_SUCCESS,
    payload: data,
  };
};

export const getCurrencyError = (message) => {
  return {
    type: GET_CURRENCY_ERROR,
    payload: message,
  };
};

export const updateCurrency = (params) => {
  return {
    type: UPDATE_CURRENCY,
    payload: params,
  };
};
export const updateCurrencySuccess = (data, message) => {
  return {
    type: UPDATE_CURRENCY_SUCCESS,
    payload: { message, ...data },
  };
};
export const updateCurrencyError = (message) => {
  return {
    type: UPDATE_CURRENCY_ERROR,
    payload: message,
  };
};
