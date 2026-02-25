import axiosInstance from 'helpers/axiosInstance';

export async function getReferral() {
  try {
    const res = await axiosInstance.get(`/referral/config`);
    return res;
  } catch (err) {
    return err;
  }
}
export async function patchReferralHttp(data) {
  try {
    const res = await axiosInstance.patch(`/referral/config`, { ...data });

    return res;
  } catch (err) {
    return err;
  }
}
