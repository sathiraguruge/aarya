import httpService from "./httpService";

const getUserDetails = async function () {
  const response = await httpService.getWithToken("users");
  return response.data;
};

export default { getUserDetails };
