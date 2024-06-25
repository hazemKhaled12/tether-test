// axiosInstance.ts

import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

const BASE_URL = "http://your-api-url"; // Replace with your API base URL

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding authorization token or other headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify config as needed, e.g., add authorization token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for parsing response data
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Parse response data before returning
    return response.data;
  },
  (error: AxiosError) => {
    // Handle error responses
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      console.error("Response error:", error.response.data);
      console.error("Status code:", error.response.status);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request error:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
