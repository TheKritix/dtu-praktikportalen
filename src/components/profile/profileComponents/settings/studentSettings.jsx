import Form from "react-bootstrap/Form";
import authService from "../../../../services/auth-service";
import "../profileSettings.css";
import React, { useState } from "react";

const StudentSettings = () => {

    const user = authService.getCurrentUser();

    const handleCVUpload = () => {
        setPdfCvAvailable({
          present: true,
          file: "",
        });
        console.log(pdfCVAvailable);
      };

    const [pdfCVAvailable, setPdfCvAvailable] = useState({
        present: false,
        file: "",
      });

    return (
        <div>
            <p className="name">{user.name}</p>
      <p className="description">{user.companyName ? user.companyName : "Student"}</p>

      <div className="namebox-container">
        <p className="textbox-name">Navn</p>
        <Form.Control className="name-textbox" placeholder="Navn" />
      </div>
      {!pdfCVAvailable.present && (
        <div className="cv-container">
          <p className="textbox-cv">Resumé</p>
          <Form.Control
            className="cv-textbox"
            type="file"
            onChange={handleCVUpload}
          />
        </div>
      )}

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
        <button className="save">Gem</button>
      </div>
        </div>
    )
    
}

export default StudentSettings;