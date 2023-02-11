import axios from "axios";

const BACKEND_URL = "http://localhost:3001/api";

function post(api, requestBody) {
  return axios.post(`${BACKEND_URL}/${api}`, requestBody);
}

function get(api) {
  return axios.get(`${BACKEND_URL}/${api}`);
}

export default { get, post };
