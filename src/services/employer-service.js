import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/";

const getEmployerProfile = () => {
  return axios.get(API_URL + "profile", { headers: authHeader() });
};

const updateEmployerPosition = (user) => {
  return axios.put(API_URL + "employers", {
    headers: authHeader(),
    user: user,
  });
};

const updateBackdropImage = (user) => {
  return axios.put(API_URL + "employersBackdropImg", {
    headers: authHeader(),
    user,
  });
};

const updateProfileImage = (user) => {
  return axios.put(API_URL + "employersProfileImg", {
    headers: authHeader(),
    user,
  });
};

const getEmployer = (user) => {

  const userRevised = {
    email: user.email,
    accessToken: user.accessToken
  }

  return axios
    .put(API_URL + "employer", {
      headers: authHeader(),
      userRevised,
    })
    .then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data));
    });
};

export default {
  getEmployerProfile,
  updateEmployerPosition,
  updateBackdropImage,
  updateProfileImage,
  getEmployer,
};
