import Form from "react-bootstrap/Form";
import authService from "../../../../services/auth-service";
import studentService from "../../../../services/student-service";
import "../profileSettings.css";
import React, { useEffect, useState } from "react";

const StudentSettings = () => {
  const user = authService.getCurrentUser();

  let pdfUpload;

  const [pdfFileName, setPdfFileName] = useState();

  const getPDFName = () => {
    studentService.getStudentPDFName(user).then((response) => {
      setPdfFileName(response);
    });
  };

  const handleCVUpload = (e) => {
    pdfUpload = e.target.files;
  };

  const saveChange = () => {
    studentService.studentPDFUpload(pdfUpload, user);
    setTimeout(getPDFName, 200);
  };

  useEffect(() => {
    getPDFName();
  }, []);

  const downloadPDF = () => {
    studentService.getStudentPDFDownload(pdfFileName);
  };

  return (
    <div>
      <p className="name">{user.name}</p>
      <p className="description">
        {user.companyName ? user.companyName : "Student"}
      </p>

      <div className="namebox-container">
        <p className="textbox-name">Navn</p>
        <Form.Control className="name-textbox" placeholder="Navn" />
      </div>

      <div className="cv-container">
        <p className="textbox-cv">Resumé</p>
        <Form.Control
          className="cv-textbox"
          type="file"
          onChange={(e) => handleCVUpload(e)}
        />
        {pdfFileName != null && (
          <div onClick={downloadPDF} className="exist-cv">
            Du har allerede uploadet et CV: {pdfFileName.filename}
          </div>
        )}
      </div>

      <div className="description-container">
        <p className="textbox-description">Beskrivelse</p>
        <Form.Control
          as="textarea"
          rows={5}
          className="description-textbox"
          placeholder="Beskrivelse"
        />
      </div>

      <div className="saveButton">
        <button onClick={saveChange} className="save">
          Gem
        </button>
      </div>
    </div>
  );
};

export default StudentSettings;
