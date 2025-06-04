import axios from "axios";

export const BASE_URL = "https://striketheball.in/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosInstance;