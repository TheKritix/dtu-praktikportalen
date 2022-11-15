import Form from "react-bootstrap/Form";
import studentService from "../../../../services/student-service";
import "../profileSettings.css";
import React, { useEffect, useState } from "react";
import { profileStore } from "../../../../stores/profileStore";
import { toJS } from "mobx";
import { useRef } from "react";

const StudentSettings = () => {
  const [pdfFileName, setPdfFileName] = useState();
  const nameRef = useRef();
  const descriptionRef = useRef();

  profileStore.fetchPDFName().then(() => {
    setPdfFileName(toJS(profileStore.PDFName));
  });

  const user = toJS(profileStore.User);

  let pdfUpload;

  const handleCVUpload = (e) => {
    pdfUpload = e.target.files;
  };

  const savePDFChange = () => {
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

  const saveChange = () => {
    if (nameRef.current.value !== user.name) {
      user.name = nameRef.current.value;
      studentService.updateStudentName(user).then(() => {
        profileStore.updateUserData();
      });
    }

    if (
      descriptionRef.current.value !== user.description ||
      !user.description
    ) {
      user.description = descriptionRef.current.value;
      studentService.updateStudentDescription(user).then(() => {
        profileStore.updateUserData();
      });
    }

    if (pdfUpload) {
      savePDFChange();
    }
  };

  return (
    <div>
      <p className="name">{user.studentID}</p>
      <p className="description">{"Student"}</p>

      <div className="namebox-container">
        <p className="textbox-name">Navn</p>
        <Form.Control
          className="name-textbox"
          placeholder="Navn"
          ref={nameRef}
          defaultValue={user.name}
        />
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
          ref={descriptionRef}
          defaultValue={user.description}
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
