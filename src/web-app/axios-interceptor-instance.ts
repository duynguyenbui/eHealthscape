// axiosInterceptorInstance.js

import axios from "axios";
import { getAccessToken } from "./actions/token";

const axiosInterceptorInstance = axios.create({
  baseURL: process.env.HEALTH_RECORD_API_URL!, // Replace with your API base URL
});

// Request interceptor
axiosInterceptorInstance.interceptors.request.use(
  async (config) => {
    // Modify the request config here (add headers, authentication tokens)
    const accessToken = await getAccessToken();

    // If token is present, add it to request's Authorization Header
    if (accessToken) {
      if (config.headers)
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    // Modify the response data here
    return response;
  },
  (error) => {
    // Handle response errors here
    return Promise.reject(error);
  }
);

export default axiosInterceptorInstance;
