import Form from "react-bootstrap/Form";
import authService from "../../../../services/auth-service";
import "../profileSettings.css";
import React, { useState } from "react";
import employerService from "../../../../services/employer-service";
import { profileStore } from "../../../../stores/profileStore";
import { toJS } from "mobx";

const EmployerSettings = () => {
  
  const user = toJS(profileStore.User);

  const [position, setPosition] = useState()

  const handleChange = (e) => {
    e.preventDefault();
    setPosition(e.target.value)
  };

  const saveChange = () => {
    user.position = position;
    employerService.updateEmployerPosition(user);
    employerService.getEmployer(user);
  };

  return (
    <div>
      <p className="name">{user.name}</p>
      <p className="description">
        {user.companyName ? user.companyName : "Student"}
      </p>

      <div className="namebox-container">
        <p className="textbox-name">Stilling</p>
        <Form.Control className="name-textbox" placeholder="Stilling" onChange={handleChange} defaultValue={user.position}/>
      </div>
      <div className="cv-container">
        <p className="textbox-cv">Resumé</p>
        <Form.Control className="cv-textbox" type="file" />
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
        <button onClick={saveChange}className="save">Gem</button>
      </div>
    </div>
  );
};

export default EmployerSettings;
