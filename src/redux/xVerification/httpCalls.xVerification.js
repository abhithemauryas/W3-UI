import axiosInstance from 'helpers/axiosInstance';

export async function getUnverifiedXUsers(params = {}) {
  try {
    const res = await axiosInstance.get('/x/unverified-users', {
      params: {
        page: params.page || 1,
        limit: params.limit || 10,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
}

export async function verifyXUsers(userIds) {
  try {
    const res = await axiosInstance.post('/x/verify-users', {
      userIds,
    });
    return res;
  } catch (err) {
    return err;
  }
}

export async function rejectXUsers(userIds) {
  try {
    const res = await axiosInstance.post('/x/reject-users', {
      userIds,
    });
    return res;
  } catch (err) {
    return err;
  }
}

export async function getUnverifiedInstagramUsers(params = {}) {
  try {
    const res = await axiosInstance.get('/x/insta/unverified-users', {
      params: {
        page: params.page || 1,
        limit: params.limit || 10,
        ...(params.search && { search: params.search }),
      },
    });
    return res;
  } catch (err) {
    return err;
  }
}

export async function verifyInstagramUsers(userIds) {
  try {
    const res = await axiosInstance.post('/x/insta/verify-users', {
      userIds,
    });
    return res;
  } catch (err) {
    return err;
  }
}

export async function rejectInstagramUsers(userIds) {
  try {
    const res = await axiosInstance.post('/x/insta/reject-users', {
      userIds,
    });
    return res;
  } catch (err) {
    return err;
  }
}

export async function getUnverifiedFacebookUsers(params = {}) {
  try {
    const res = await axiosInstance.get('/x/fb/unverified-users', {
      params: {
        page: params.page || 1,
        limit: params.limit || 10,
        ...(params.search && { search: params.search }),
      },
    });
    return res;
  } catch (err) {
    return err;
  }
}

export async function verifyFacebookUsers(userIds) {
  try {
    const res = await axiosInstance.post('/x/fb/verify-users', {
      userIds,
    });
    return res;
  } catch (err) {
    return err;
  }
}

export async function rejectFacebookUsers(userIds) {
  try {
    const res = await axiosInstance.post('/x/fb/reject-users', {
      userIds,
    });
    return res;
  } catch (err) {
    return err;
  }
}
