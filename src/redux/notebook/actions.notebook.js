import {
  GET_NOTEBOOK,
  GET_NOTEBOOK_ERROR,
  GET_NOTEBOOK_SUCCESS,
  UPDATE_NOTEBOOK,
  UPDATE_NOTEBOOK_ERROR,
  UPDATE_NOTEBOOK_SUCCESS,
} from './constants.notebook';

export const getNotebook = (params) => ({
  type: GET_NOTEBOOK,
  payload: params,
});

export const getNotebookSuccess = (response) => ({
  type: GET_NOTEBOOK_SUCCESS,
  payload: response,
});

export const getNotebookError = (response) => ({
  type: GET_NOTEBOOK_ERROR,
  payload: response,
});

export const updateNotebook = (content) => ({
  type: UPDATE_NOTEBOOK,
  payload: { content},
});

export const updateNotebookSuccess = (response) => ({
  type: UPDATE_NOTEBOOK_SUCCESS,
  payload: response,
});

export const updateNotebookError = (response) => ({
  type: UPDATE_NOTEBOOK_ERROR,
  payload: response,
});

