import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

const studentSignin = (ticket) => {
  return axios
    .post(API_URL + "studentlogin", {
      ticket,
    })
    .then((response) => {
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
        service: "http://localhost:3001/dtu-praktikportalen",
        ticket: ticket,
      },
    })
    .then((response) => {
      return response.data;
    });
};

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
        localStorage.setItem("user", JSON.stringify(response.data));
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
  studentSignin,
  employerSignup,
  employerLogin,
  logout,
  getCurrentUser,
  dtuCasLogin,
};
export default authService;
