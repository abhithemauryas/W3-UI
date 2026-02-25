import {
  GET_NOTEBOOK,
  GET_NOTEBOOK_ERROR,
  GET_NOTEBOOK_SUCCESS,
  UPDATE_NOTEBOOK,
  UPDATE_NOTEBOOK_ERROR,
  UPDATE_NOTEBOOK_SUCCESS,
} from './constants.notebook';

const INIT_STATE = {
  notebook: {},
  loading: false,
  error: '',
  errorMessage: '',
  successMesage: '',
  id: '',
  metadata: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_NOTEBOOK:
      return {
        ...state,
        loading: true,
        errorMessage: '',
        successMesage: '',
      };
    case UPDATE_NOTEBOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        successMesage: action.payload?.message,
      };
    case UPDATE_NOTEBOOK_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload?.message,
      };
    case GET_NOTEBOOK:
      return {
        ...state,
        loading: true,
      };
    case GET_NOTEBOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        notebook: action.payload?.data?.content || '',
        id: action.payload?.data?.id,
      };
    case GET_NOTEBOOK_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload?.message,
      };
    default:
      return { ...state };
  }
};

