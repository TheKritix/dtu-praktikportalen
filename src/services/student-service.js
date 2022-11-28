import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/";

const studentPDFUpload = (pdf, user) => {
  var formData = new FormData();
  formData.append(user.studentID, pdf[0]);
  console.log(formData);
  return axios.post(API_URL + "pdfUpload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getStudentPDFName = (user) => {
  return axios.get(API_URL + `pdfCV/${user.studentID}`).then((response) => {
    return response.data;
  });
};

const getStudentPDFDownload = (pdfFileName) => {
  console.log(pdfFileName);
  window.open(API_URL + `pdfCVDownload/${pdfFileName._id}`, "_blank");
};

const updateBackdropImage = (user, image) => {
  var formData = new FormData();
  formData.append(user.studentID, image);
  console.log(formData);
  return axios.put(API_URL + "studentBackdropImg", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-access-token": user.accessToken,
    },
  });
};

const getBackdropImage = (user) => {
  return axios
    .get(API_URL + `studentBackdropImg/${user.backdropImageID}`,  {
      headers: authHeader(),
      responseType: "blob"
    })
    .then((response) => {
      return response
    });
};

const updateProfileImage = (user, image) => {
  var formData = new FormData();
  formData.append(user.studentID, image);
  console.log(formData);
  return axios.put(API_URL + "studentProfileImg", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-access-token": user.accessToken,
    },
  });
};

const getProfileImage = (user) => {
  return axios
    .get(API_URL + `studentProfileImg/${user.profileImageID}`,  {
      headers: authHeader(),
      responseType: "blob"
    })
    .then((response) => {
      return response
    });
};

const getStudent = (user) => {
  return axios
    .get(API_URL + `student/${user.studentID}`, {
      headers: {
        "x-access-token": user.accessToken,
        "x-refresh-token": user.refreshToken
      }
    })
    .then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data));
    });
};

const updateStudentName = (user) => {
  return axios.put(API_URL + "studentName", user, {
    headers: authHeader(),
  });
};

const updateStudentDescription = (user) => {
  return axios.put(API_URL + "studentDescription", user, {
    headers: authHeader(),
  });
};

const updateStudentEmail = (user) => {
  return axios.put(API_URL + "studentUpdateEmail", user, {
    headers: authHeader(),
  });
};

const studentService = {
  studentPDFUpload,
  getStudentPDFName,
  getStudentPDFDownload,
  updateBackdropImage,
  getBackdropImage,
  updateProfileImage,
  getProfileImage,
  getStudent,
  updateStudentName,
  updateStudentDescription,
  updateStudentEmail,
};

export default studentService;
