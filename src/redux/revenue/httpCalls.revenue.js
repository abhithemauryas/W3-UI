/* eslint-disable no-unused-vars */

import axiosInstance from 'helpers/axiosInstance';

export async function getRevenueListHttpCall(auctionId, params) {
  try {
    const res = await axiosInstance.get(
      `/auction-house/auction-revenues/${auctionId}`,
      { params: { ...params } }
    );
    return res;
  } catch (err) {
    return err;
  }
}
