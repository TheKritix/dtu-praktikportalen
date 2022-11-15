import axios from "axios";

const API_URL = process.env.REACT_APP_API_AUTH;

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

const dtuCasLogin = (ticket) => {
  return axios
    .get("https://auth.dtu.dk/dtu/servicevalidate", {
      params: {
        service: "https://dtu.praktikportal.diplomportal.dk/",
        ticket: ticket,
      },
    })
    .then((response) => {
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
  dtuCasLogin,
};
export default authService;
