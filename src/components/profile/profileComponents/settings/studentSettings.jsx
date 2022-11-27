import Form from "react-bootstrap/Form";
import studentService from "../../../../services/student-service";
import "../profileSettings.css";
import React, { useState } from "react";
import { profileStore } from "../../../../stores/profileStore";
import { toJS } from "mobx";
import { useRef } from "react";
import Typist from "react-typist-component";

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

  const [ApiState, setApiState] = useState(false);

  const handleSaveInteraction = () => {
    setApiState(true);
    setTimeout(() => {
      setApiState(false);
    }, 3000);
  };

  const saveChange = () => {
    if (nameRef.current.value !== user.name) {
      user.name = nameRef.current.value;
      studentService.updateStudentName(user).then(() => {
        profileStore.updateUserData().then(() => {
          handleSaveInteraction();
        });
      });
    }

    if (
      descriptionRef.current.value !== user.description ||
      !user.description
    ) {
      user.description = descriptionRef.current.value;
      studentService.updateStudentDescription(user).then(() => {
        profileStore.updateUserData().then(() => {
          handleSaveInteraction();
        });
      });
    }

    if (pdfUpload) {
      savePDFChange();
    }
  };

  return (
    <div className="profileSettingsContainer">
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
        {ApiState && (
          <div className="confirmSave">
            <Typist typingDelay={50} restartKey={0}>
              Ændringerne er blevet gemt ✓
            </Typist>
          </div>
        )}
        <button onClick={saveChange} className="save">
          Gem
        </button>
      </div>
    </div>
  );
};

export default StudentSettings;
