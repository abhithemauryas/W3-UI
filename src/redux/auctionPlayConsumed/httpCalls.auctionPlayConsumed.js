/* eslint-disable no-unused-vars */

import axiosInstance from 'helpers/axiosInstance';

export async function getAuctionPlayConsumedHttpCall(auctionId, params) {
  try {
    const res = await axiosInstance.get(
      `/auction-house/plays-consumed-per-auction/${auctionId}`,
      { params: { ...params } }
    );
    return res;
  } catch (err) {
    return err;
  }
}
