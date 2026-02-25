/* eslint-disable no-unused-vars */

import axiosInstance from 'helpers/axiosInstance';

export async function getAuctionHouses(params) {
  try {
    const res = await axiosInstance.get('/auction-house/all-auction-houses', {
      ...params,
    });
    return res;
  } catch (err) {
    return err;
  }
}
export async function getAuctionHouseForDropdown(params) {
  try {
    const res = await axiosInstance.get('/auction-house/all-auction-houses-for-dropdown', {
      ...params,
    });
    return res;
  } catch (err) {
    return err;
  }
}
export async function updateAuctionHousesProfit(params) {
  try {
    const res = await axiosInstance.put(
      '/auction-house/update-auction-house-profit',
      params
    );
    return res;
  } catch (err) {
    return err;
  }
}
export async function deleteAuctionHouses(auctionHouseIds) {
  try {
    const res = await axiosInstance.post('/auction-house/delete-zone', {
      auction_house_ids: auctionHouseIds,
    });
    return res;
  } catch (err) {
    return err;
  }
}

export async function getAuctionCategoryList() {
  try {
    const res = await axiosInstance.get('/auction-category-permissions');
    return res;
  } catch (err) {
    return err;
  }
}

export async function getAuctionCategory(auctionHouseId) {
  try {
    const res = await axiosInstance.get(
      `/auction-category-permissions/${auctionHouseId}`
    );
    return res;
  } catch (err) {
    return err;
  }
}

export async function getRequestList(params) {
  try {
    const res = await axiosInstance.get('/user/all-clan-owner-transactions', {
      ...params,
    });
    return res;
  } catch (err) {
    return err;
  }
}

export async function updateRequestList(data) {
  try {
    const res = await axiosInstance.patch(
      '/user/update-clan-owner-redeem-status',
      data
    );
    return res;
  } catch (err) {
    return err;
  }
}

export async function getPlanList() {
  try {
    const res = await axiosInstance.get('/plan/list');
    return res;
  } catch (err) {
    return err;
  }
}

export async function createPlanList(data) {
  try {
    const res = await axiosInstance.post('/plan/create-plan', data);
    return res;
  } catch (err) {
    return err;
  }
}

export async function updatePlanList(data, planId) {
  try {
    const res = await axiosInstance.post(`/plan/update-plan/${planId}`, data);
    return res;
  } catch (err) {
    return err;
  }
}

export async function updateAuctionCategory(data) {
  try {
    const res = await axiosInstance.post('/auction-category-permissions', data);
    return res;
  } catch (err) {
    return err;
  }
}

export async function updateAuctionCurrency({ id, data }) {
  try {
    const res = await axiosInstance.put(
      `/auction-house/auction-house-corrency/${id}`,
      data
    );
    return res;
  } catch (err) {
    return err;
  }
}
// TODO: add endpoint when backend gives endpoint
export async function forceStopAuctionHttp(auctionId) {
  try {
    const res = await axiosInstance.patch();
    return res;
  } catch (err) {
    return err;
  }
}

export async function getXpRecords() {
  try {
    const res = await axiosInstance.get('/auction-house/xp-records');
    return res;
  } catch (err) {
    return err;
  }
}

export async function getXpRecordsClanWise({ id }) {
  try {
    const res = await axiosInstance.get(`/auction-house/xp-records/${id}`);
    return res;
  } catch (err) {
    return err;
  }
}