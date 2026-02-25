import axiosInstance from 'helpers/axiosInstance';

export async function callCreateTermsAndCondition(data) {
  try {
    const res = await axiosInstance.post('/term-condition', {
      content: data,
    });
    return res;
  } catch (err) {
    return err;
  }
}
export async function callGetTermsAndCondition() {
  try {
    const res = await axiosInstance.get('/term-condition');
    return res;
  } catch (err) {
    return err;
  }
}

export async function callUpdateTermsAndCondition(data) {
  try {
    const res = await axiosInstance.put(`/term-condition/${data.id}`, {
      content: data.content,
    });
    return res;
  } catch (err) {
    return err;
  }
}
