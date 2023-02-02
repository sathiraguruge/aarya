import httpService from "./httpService";

async function login(email, password) {
  const response = await httpService.post("http://localhost:3001/api/login", {
    email,
    password,
  });
  if (response.status === 200) {
    localStorage.setItem("token", response.headers["x-auth-token"]);
  }
}

export default {
  login,
};
