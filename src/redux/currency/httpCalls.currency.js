import axiosInstance from 'helpers/axiosInstance';

export async function getCurrencyHttp(currencyCode) {
  try {
    const res = await axiosInstance.get('/currency', {
      params: { currency_code: currencyCode },
    });
    return res;
  } catch (err) {
    return err;
  }
}
export async function updateCurrencyHttp(data, currencyId) {
  try {
    const res = await axiosInstance.patch(`/currency/${currencyId}`, {
      ...data,
    });
    return res;
  } catch (err) {
    return err;
  }
}
