import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const employerSignup = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const employerLogin = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("employer", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("employer");
};

const getCurrentEmployer = () => {
  return JSON.parse(localStorage.getItem("employer"));
};

export default {
  employerSignup,
  employerLogin,
  logout,
  getCurrentEmployer,
};
