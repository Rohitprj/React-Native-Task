import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const BASE_URL = "https://striketheball.in/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});
// Request Interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('userToken'); // Get the token from AsyncStorage
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error attaching token to request:', error);
      // You might want to handle this error (e.g., log out the user)
    }
    return config; // Always return the config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Optional: Response Interceptor for handling 401 (Unauthorized) errors
// This is useful for automatically logging out the user if the token becomes invalid
axiosInstance.interceptors.response.use(
  (response) => response, // Just return the response if it's successful
  async (error) => {
    const originalRequest = error.config;
    // If the error is 401 (Unauthorized) and it's not a retry attempt
    // and you have a mechanism for refreshing tokens, you could implement it here.
    // For simplicity, we'll just log out for now.
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark as retried to prevent infinite loops

      console.warn('Authentication token expired or invalid. Attempting to log out...');
      // Implement your logout logic here
      // For example, remove the token and navigate to login screen
      await AsyncStorage.removeItem('userToken');
      // Navigate to login screen (you'll need your navigation setup here)
      // Eg: navigation.navigate('Login'); or a global event emitter
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;