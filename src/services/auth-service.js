import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:3000/api/auth/";

const studentSignup = (ticket) => {
  return axios.post(API_URL + "studentSignup", {
    ticket,
  });
};

const studentUpdate = (ticket) => {
  return axios.post(API_URL + "studentUpdate", {
    ticket,
  });
};

const studentLogin = (ticket) => {
  console.log(API_URL);
  return axios
    .post(API_URL + "studentLogin", {
      ticket,
    })
    .then((response) => {
      console.log(response);
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const employerSignup = (username, email, password, companyName, name) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    companyName,
    name,
  });
};

const employerLogin = (username, password) => {
  console.log("auth here");
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      console.log(response);
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const checkToken = () => {
  return axios
    .get(API_URL + "checkToken", { headers: authHeader() })
    .then((response) => {
      console.log(response);
      return response.data;
    });
};

const refreshToken = (refreshToken) => {
  return axios
    .post(API_URL + "refreshtoken", {
      refreshToken,
    })
    .then((response) => {
      console.log(response);
      if (response.data.accessToken) {
        const user = JSON.parse(localStorage.getItem("user"));
        user.accessToken = response.data.accessToken;
        localStorage.setItem("user", JSON.stringify(user));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  studentSignup,
  employerSignup,
  studentLogin,
  studentUpdate,
  employerLogin,
  logout,
  getCurrentUser,
  checkToken,
  refreshToken,
};
export default authService;
