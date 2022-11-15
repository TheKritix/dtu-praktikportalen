import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API;

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

const getBackdropImage = (user) => {
  return axios
    .post(API_URL + "employersBackdropImg", {
      headers: authHeader(),
      user,
    })
    .then((response) => {
      return response.data;
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
    accessToken: user.accessToken,
  };

  return axios
    .put(API_URL + "employer", {
      headers: authHeader(),
      userRevised,
    })
    .then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data));
    });
};

const getEmployerContent = () => {
  return axios.get(API_URL + "test/user", { headers: authHeader() });
};

const employerService = {
  getEmployerProfile,
  updateEmployerPosition,
  updateBackdropImage,
  getBackdropImage,
  updateProfileImage,
  getEmployer,
  getEmployerContent,
};

export default employerService;
