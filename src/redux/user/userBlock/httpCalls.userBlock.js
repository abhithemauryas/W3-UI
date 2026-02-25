import axiosInstance from 'helpers/axiosInstance';

export async function blockUser({ userId, data }) {
  try {
    const res = await axiosInstance.patch(
      `/auction-house/block/${userId}`,
      data
    );
    return res;
  } catch (err) {
    return err;
  }
}
