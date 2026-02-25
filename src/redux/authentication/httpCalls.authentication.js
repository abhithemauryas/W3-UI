import axiosInstance from 'helpers/axiosInstance';
import { getCurrentUser, setCurrentUser, setPermission } from 'helpers/Utils';

export async function login(params) {
  try {
    const res = await axiosInstance.post('/user/superadmin/login/v2', params);
    if (res.success) {
      const userDetails = {
        userToken: res?.data?.accessToken,
        userInfo: res?.data,
      };
      const permissions = {
        permission: res?.data?.permission,
      };

      setPermission(permissions);
      setCurrentUser(userDetails);
    }
    return res;
  } catch (err) {
    return err;
  }
}

export async function resetPasswordCalls(params) {
  try {
    const email = getCurrentUser()?.userInfo?.email;

    const res = await axiosInstance.put('/user/reset-password', {
      ...params,
      email,
    });
    if (res.success) {
      // const userDetails = {
      //   userToken: res?.data?.accessToken,
      //   userInfo: res?.data?.userInfo,
      // };
      // const permissions = {
      //   permission: res?.data?.permission,
      // };
      // setPermission(permissions);
      // setCurrentUser(userDetails);
    }
    return res;
  } catch (err) {
    return err;
  }
}

export async function logout() {
  try {
    const res = await axiosInstance.put('/user/logout');
    return res;
  } catch (err) {
    return err;
  }
}

export async function forgetpassword(data) {
  try {
    // TODO: uncomment this when api is ready
    const res = await axiosInstance.post(`/user/forget-password`, {
      email: data.email,
    });
    return res;
  } catch (err) {
    return err;
  }
}
export async function updatePassword({ email, newPassword, otp }) {
  try {
    const res = await axiosInstance.patch(`user/update-password`, {
      email,
      newPassword,
      otp,
    });
    return res;
  } catch (err) {
    return err;
  }
}

export async function userPermission() {
  try {
    const res = await axiosInstance.post('/users/permission');
    return res;
  } catch (err) {
    return err;
  }
}
