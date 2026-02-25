/* eslint-disable no-unused-vars */
import axiosInstance from 'helpers/axiosInstance';

const dummyUser = {
  name: 'prashant chauhan',
  priviliages: [
    'ADD_PRODUCT',
    'REMOVE_PRODUCT',
    'DELETE_PRODUCT',
    'VIEW_PRODUCT',
    'ACTIVATE_PRODUCT',
    'DEACTIVATE_PRODUCT',
    'ADD_AUCTION',
    'REMOVE_AUCTION',
    'UPDATE_AUCTION',
    'VIEW_AUCTION',
    'ACTIVATE_AUCTION',
    'DEACTIVATE_AUCTION',
    'ADD_USER',
    'REMOVE_USER',
    'UPDATE_USER',
    'VIEW_USER',
    'ACTIVATE_USER',
    'DEACTIVATE_USER',
    'VIEW_BIDLOG',
    'CREATE_ROLE',
    'ASSIGN_ROLE',
    'VIEW_WALLET_TRANSACTIONS',
    'ACTIVATE_WALLET',
    'DEACTIVATE_WALLET',
  ],
};

export async function getProducts(params) {
  try {
    const res = await axiosInstance.get('/product/', {
      params,
    });
    return res;
  } catch (err) {
    return err;
  }
}

export async function addProduct(data) {
  try {
    const res = await axiosInstance.post('/product/', data);
    return res;
  } catch (err) {
    return err;
  }
}

export async function deleteProduct(productId) {
  try {
    const res = await axiosInstance.delete(`/product`, {
      data: { ids: productId },
    });
    return res;
  } catch (err) {
    return err;
  }
}
export async function callGetAllCategory() {
  try {
    const res = await axiosInstance.get('/product-category');
    return res;
  } catch (err) {
    return err;
  }
}
export async function callGetCategory(categoryId) {
  try {
    const res = await axiosInstance.get(`/product-category/${categoryId}`);
    return res;
  } catch (err) {
    return err;
  }
}
export async function callAddCategory(data) {
  try {
    const res = await axiosInstance.post('/product-category', data);
    return res;
  } catch (err) {
    return err;
  }
}

export async function uploadProductImage(data) {
  try {
    const res = await axiosInstance.post('/media', data, {});
    return res;
  } catch (err) {
    return err;
  }
}
export async function uploadProductImageGroup(data) {
  try {
    const res = await axiosInstance.post('/media/multiple', data, {});
    return res;
  } catch (err) {
    return err;
  }
}

export async function deleteProductImage(mediaId) {
  try {
    const res = await axiosInstance.delete('/media', {
      data: { ids: mediaId },
    });
    return res;
  } catch (err) {
    return err;
  }
}

export async function updateProduct(pathParam, data) {
  try {
    const res = await axiosInstance.patch(`/product/${pathParam}`, data);
    return res;
  } catch (err) {
    return err;
  }
}

export async function getProduct(pathParam) {
  try {
    const res = await axiosInstance.get(`/product/${pathParam}`);
    return res;
  } catch (err) {
    return err;
  }
}

export async function updateProductStatus(pathParam, data) {
  try {
    const res = await axiosInstance.put(`/product/${pathParam}`, data);
    return res;
  } catch (err) {
    return err;
  }
}
