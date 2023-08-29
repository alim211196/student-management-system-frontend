import axios from "axios";

const AxiosConfig = (token) => {

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: token,
    },
  });

  // Add an Axios interceptor to handle responses with status code 401
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        // Token is expired or invalid, redirect to the "/" route
        setTimeout(() => (window.location = "/"), 1000);
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default AxiosConfig;
