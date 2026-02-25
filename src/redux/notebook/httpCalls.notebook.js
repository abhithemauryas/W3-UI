import axiosInstance from 'helpers/axiosInstance';

export async function callGetNotebook() {
  try {
    const res = await axiosInstance.get('/notebook');
    return res;
  } catch (err) {
    return err;
  }
}

export async function callUpdateNotebook(data) {
  try {
    const res = await axiosInstance.put("/notebook", {
      content: data.content,
    });
    return res;
  } catch (err) {
    return err;
  }
}

