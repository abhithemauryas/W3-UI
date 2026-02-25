import axiosInstance from 'helpers/axiosInstance';

export async function getAnalyticsListHttp(params) {
  try {
    const res = await axiosInstance.get(`/auction/stats/list`, { params });
    return res;
  } catch (err) {
    return err;
  }
}
