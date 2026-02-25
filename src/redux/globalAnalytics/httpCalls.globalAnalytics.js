import axiosInstance from 'helpers/axiosInstance';

export async function getGlobalAnalyticsHttp() {
  try {
    const res = axiosInstance.get('auction/total-auction/list');
    return res;
  } catch (err) {
    return err;
  }
}
