import axios from "axios";

const api = axios.create({
  baseURL: "http://52.140.121.204:3000/api/v1",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;