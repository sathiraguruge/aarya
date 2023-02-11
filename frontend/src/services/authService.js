import httpService from "./httpService";

const login = async function (email, password) {
  const response = await httpService.post("login", {
    email,
    password,
  });
  if (response.status === 200) {
    localStorage.setItem("token", response.headers["x-auth-token"]);
  }
};

const logout = function () {
  localStorage.removeItem("token");
};

const isLoggedIn = function () {
  const token = localStorage.getItem("token");
  if (!token) return false;
  return true;
};

const getToken = function () {
  return localStorage.getItem("token");
};

export default {
  login,
  logout,
  getToken,
};
