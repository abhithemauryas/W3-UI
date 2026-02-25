import axiosInstance from 'helpers/axiosInstance';

const dummyUser = {
  name: 'prashant chauhan',
  priviliages: [
    'ADD_PRODUCT',
    'REMOVE_PRODUCT',
    'DELETE_PRODUCT',
    'VIEW_PRODUCT',
    'ACTIVATE_PRODUCT',
    'DEACTIVATE_PRODUCT',
    'ADD_AUCTION',
    'REMOVE_AUCTION',
    'UPDATE_AUCTION',
    'VIEW_AUCTION',
    'ACTIVATE_AUCTION',
    'DEACTIVATE_AUCTION',
    'ADD_USER',
    'REMOVE_USER',
    'UPDATE_USER',
    'VIEW_USER',
    'ACTIVATE_USER',
    'DEACTIVATE_USER',
    'VIEW_BIDLOG',
    'CREATE_ROLE',
    'ASSIGN_ROLE',
    'VIEW_WALLET_TRANSACTIONS',
    'ACTIVATE_WALLET',
    'DEACTIVATE_WALLET',
  ],
};

export async function loginUser(userData) {
  try {
    const res = await axiosInstance.post('login', userData);
    console.log(res);
  } catch (err) {
    const res = err;
    console.log(res);
  }
  return { ...dummyUser };
}

export async function getUsers(params) {
  const { auction_house_id } = params;
  delete params.auction_house_id;
  try {
    const res = await axiosInstance.get(
      `auction-house/all-users/${auction_house_id}`,
      {
        params: { ...params },
      }
    );
    return res;
  } catch (err) {
    return err;
  }
}

export async function deleteUser(userId) {
  try {
    const res = await axiosInstance.delete(`/users/${userId}`);
    return res;
  } catch (err) {
    return err;
  }
}

export async function addUser(data) {
  try {
    const res = await axiosInstance.post('/users/', data);
    return res;
  } catch (err) {
    return err;
  }
}

export async function getUser(pathParam) {
  try {
    const res = await axiosInstance.get(`/users/${pathParam}`);
    return res;
  } catch (err) {
    return err;
  }
}

export async function updateUser(pathParam, data) {
  try {
    const res = await axiosInstance.put(`/users/${pathParam}`, data);
    return res;
  } catch (err) {
    return err;
  }
}

export async function playsAirdrop(data) {
  try {
    const res = await axiosInstance.post(`/user/plays-airdrop`, data);
    return res;
  } catch (err) {
    return err;
  }
}

export async function getAllPlayers(params) {
  try {
    const res = await axiosInstance.get('/auction-house/all-users/', {
      params,
    });
    return res;
  } catch (err) {
    return err;
  }
}

export async function blockPlayerHttp({ userId, data }) {
  try {
    const res = await axiosInstance.patch(`/user/block/${userId}`, data);
    return res;
  } catch (err) {
    return err;
  }
}

export async function getAirdropConfigHttp() {
  try {
    return await axiosInstance.get('/airdrop-config');
  } catch (err) {
    return err;
  }
}
export async function updateAirDropConfigHttp({ id, data }) {
  try {
    return await axiosInstance.patch(`/airdrop-config/${id}`, data);
  } catch (err) {
    return err;
  }
}

export async function uploadOnboardPlayerHttp(data) {
  try {
    return await axiosInstance.post('/user/on-boarding', data);
  } catch (err) {
    return err;
  }
}

export async function expirePlayerBallanceHttp(data) {
  try {
    return await axiosInstance.post(
      '/auction-house/player-plays-expired',
      data
    );
  } catch (err) {
    return err;
  }
}

export async function getSystemConfigHttp() {
  try {
    return await axiosInstance.get('/system-configs');
  } catch (error) {
    return error;
  }
}

export async function updateSystemConfigHttp({ id, data }) {
  try {
    return await axiosInstance.put(`/system-configs/${id}`, data);
  } catch (error) {
    return error;
  }
}
