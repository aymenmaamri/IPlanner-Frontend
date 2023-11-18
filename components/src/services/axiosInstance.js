const { default: axios } = require("axios");
import { getAuthToken } from "../utils/localStorageUtils";
const baseDevUrl = "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: baseDevUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = getAuthToken();
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
