import Form from "react-bootstrap/Form";
import studentService from "../../../../services/student-service";
import "../profileSettings.css";
import React, { useEffect, useState } from "react";
import { profileStore } from "../../../../stores/profileStore";
import { toJS } from "mobx";

const StudentSettings = () => {
  const [pdfFileName, setPdfFileName] = useState();

  profileStore.fetchPDFName().then(() => {
    setPdfFileName(toJS(profileStore.PDFName));
  });

  const user = toJS(profileStore.User);

  let pdfUpload;

  const handleCVUpload = (e) => {
    pdfUpload = e.target.files;
  };

  const saveChange = () => {
    studentService.studentPDFUpload(pdfUpload, user);
    setTimeout(() => {
      profileStore.updatePDFName().then(() => {
        setPdfFileName(toJS(profileStore.PDFName));
      });
    }, 500);
  };

  const downloadPDF = () => {
    studentService.getStudentPDFDownload(pdfFileName);
  };

  return (
    <div>
      <p className="name">{user.studentID}</p>
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
