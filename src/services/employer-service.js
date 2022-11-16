import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API;

const getEmployerProfile = () => {
  return axios.get(API_URL + "profile", { headers: authHeader() });
};

const updateEmployerPosition = (user) => {
  return axios.put(API_URL + "employers", user, {
    headers: authHeader(),
  });
};

const updateBackdropImage = (user, image) => {
  var formData = new FormData();
  formData.append(user.email, image);
  console.log(formData);
  return axios.put(API_URL + "employersBackdropImg", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-access-token": user.accessToken,
    },
  });
};

const getBackdropImage = (user) => {
  return axios
    .get(API_URL + `employersBackdropImg/${user.backdropImageID}`,  {
      headers: authHeader(),
      responseType: "blob"
    })
    .then((response) => {
      return response
    });
};

const updateProfileImage = (user, image) => {
  var formData = new FormData();
  formData.append(user.email, image);
  console.log(formData);
  return axios.put(API_URL + "employersProfileImg", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-access-token": user.accessToken,
    },
  });
};

const getProfileImage = (user) => {
  return axios
    .get(API_URL + `employersProfileImg/${user.profileImageID}`,  {
      headers: authHeader(),
      responseType: "blob"
    })
    .then((response) => {
      return response
    });
};

const getEmployer = (user) => {
  return axios
    .get(API_URL + `employer/${user.email}`, {
      headers: {
        "x-access-token": user.accessToken,
        "x-refresh-token": user.refreshToken
      }
    })
    .then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data));
    });
};

const getEmployerContent = () => {
  return axios.get(API_URL + "test/user", { headers: authHeader() });
};

const updateEmployerDescription = (user) => {
  return axios.put(API_URL + "employerDescription", user, {
    headers: authHeader(),
  });
};

const employerService = {
  getEmployerProfile,
  updateEmployerPosition,
  updateBackdropImage,
  getBackdropImage,
  updateProfileImage,
  getEmployer,
  getEmployerContent,
  getProfileImage,
  updateEmployerDescription,
};

export default employerService;
