/* eslint-disable no-unused-vars */

import axiosInstance from 'helpers/axiosInstance';

export async function getAuctions(auctionID, params) {
  try {
    const res = await axiosInstance.get(
      `/auction-house/auction-list/${auctionID}`,
      { params: { ...params } }
    );
    return res;
  } catch (err) {
    return err;
  }
}

export async function getPaymentOpetions(params) {
  try {
    const res = await axiosInstance.get(
      '/auction-house/options',
      { params: { ...params } }
    );
    return res;
  } catch (err) {
    return err;
  }
}

export async function getChainList(params) {
  try {
    const res = await axiosInstance.get(
      '/chain/list',
      { params: { ...params } }
    );
    return res;
  } catch (err) {
    return err;
  }
}

export async function addChain(data) {
  try {
    const res = await axiosInstance.post('/chain/add', data);
    return res;
  } catch (err) {
    return err;
  }
}

export async function updateChain(id, data) {
  try {
    const res = await axiosInstance.patch(`/chain/${id}`, data);
    return res;
  } catch (err) {
    return err;
  }
}


export async function updatePaymentGateway(data) {
  try {
    const res = await axiosInstance.put('/auction-house/options/update', data);
    return res;
  } catch (err) {
    return err;
  }
}

export async function addAuction(data) {
  try {
    const res = await axiosInstance.post('/auction', data);
    return res;
  } catch (err) {
    return err;
  }
}

export async function deleteAuction(auctionId) {
  try {
    const res = await axiosInstance.delete(`/auction`, {
      data: { ids: auctionId },
    });
    return res;
  } catch (err) {
    return err;
  }
}

export async function updateAuction(pathParam, data) {
  try {
    const res = await axiosInstance.put(`/auction/${pathParam}`, data);
    return res;
  } catch (err) {
    return err;
  }
}

export async function getAuction(auctionID) {
  try {
    const res = await axiosInstance.get(`/auction/${auctionID}`);
    return res;
  } catch (err) {
    return err;
  }
}

export async function getAuctionCategory() {
  try {
    const res = await axiosInstance.get('/auctions/category/');
    return res;
  } catch (err) {
    return err;
  }
}

export async function uploadAuctionImage(data) {
  try {
    const res = await axiosInstance.post('/uploads/', data, {
      headers: {
        'content-type': 'multipart/form-data',
        boundary: 'data.name',
      },
      params: { moduleName: 'auctions' },
    });
    return res;
  } catch (err) {
    return err;
  }
}

export async function uploadAuctionVideo(data) {
  try {
    const res = await axiosInstance.post('/uploads/', data, {
      headers: {
        'content-type': 'multipart/form-data',
        boundary: 'data.name',
      },
      params: { moduleName: 'auctions' },
    });
    return res;
  } catch (err) {
    return err;
  }
}

export async function getAuctionType() {
  try {
    const res = await axiosInstance.get(`/auction-category/all`);
    return res;
  } catch (err) {
    return err;
  }
}

export async function addAuctionType(data) {
  try {
    const res = await axiosInstance.post(`/auction-category/`, data);
    return res;
  } catch (err) {
    return err;
  }
}

export async function deleteAuctionType(data) {
  try {
    const res = await axiosInstance.delete(`/auction-category/`, { data });
    return res;
  } catch (err) {
    return err;
  }
}

export async function addAuctionStart(data) {
  try {
    const res = await axiosInstance.post(`/auction/start`, data);
    return res;
  } catch (err) {
    return err;
  }
}

export async function cancelAuction(auctionId) {
  try {
    const res = await axiosInstance.patch(`/auction/cancel/${auctionId}`);
    return res;
  } catch (err) {
    return err;
  }
}

export async function getAnalyticsByAuctionHttp(auctionId) {
  try {
    return await axiosInstance.get(
      `/auction-house/auction-analytics-superadmin/${auctionId}`
    );
  } catch (err) {
    return err;
  }
}

export async function getAnalyticsByAuctionHouseHttp(auctionHouseId) {
  try {
    return await axiosInstance.get(
      `/auction-house/auction-house-analytics/${auctionHouseId}`
    );
  } catch (err) {
    return err;
  }
}


export async function getProductConflicts(params) {
  try {
    const res = await axiosInstance.get(`/product-delivery-conflict`, {
      params,
    });
    return res;
  } catch (err) {
    return err;
  }
}



export async function deleteProductConflict(pathParam) {
  try {
    const res = await axiosInstance.delete(`/product-delivery-conflict/${pathParam}`);
    return res;
  } catch (err) {
    return err;
  }
}

export async function updateProductConflict(pathParam, data) {
  try {
    const res = await axiosInstance.put(`/product-delivery-conflict/${pathParam}`, data);
    return res;
  } catch (err) {
    return err;
  }
}
