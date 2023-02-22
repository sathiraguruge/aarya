import axios from "axios";
import { toast } from "react-toastify";
import authService from "./authService";

const BACKEND_URL = "http://localhost:3001/api";

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (authService.isLoggedIn()) {
      config.headers["x-auth-token"] = authService.getToken();
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    toast.error(error.response.data);
    return Promise.reject(error);
  }
);

function post(api, requestBody) {
  return axios.post(`${BACKEND_URL}/${api}`, requestBody);
}

function get(api) {
  return axios.get(`${BACKEND_URL}/${api}`);
}

export default { get, post };
