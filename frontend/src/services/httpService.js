import axios from "axios";
import authService from "./authService";

const BACKEND_URL = "http://localhost:3001/api";

function post(api, requestBody) {
  return axios.post(`${BACKEND_URL}/${api}`, requestBody);
}

function get(api) {
  return axios.get(`${BACKEND_URL}/${api}`);
}

function getWithToken(api) {
  return axios.get(`${BACKEND_URL}/${api}`, {
    headers: {
      "x-auth-token": authService.getToken(),
    },
  });
}

export default { get, getWithToken, post };
