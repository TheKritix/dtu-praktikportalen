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
  return axios.get(API_URL + `pdfCV/${user.studentID}`).then((response) => {return response.data});
};

const getStudentPDFDownload = (pdfFileName) => {
    console.log(pdfFileName)
    window.open(API_URL + `pdfCVDownload/${pdfFileName._id}`, '_blank');
}

const studentService = {
  studentPDFUpload,
  getStudentPDFName,
  getStudentPDFDownload, 
};

export default studentService;
