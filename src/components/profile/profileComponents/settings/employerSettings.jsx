import Form from "react-bootstrap/Form";
import "../profileSettings.css";
import React, { useState, useRef } from "react";
import employerService from "../../../../services/employer-service";
import { profileStore } from "../../../../stores/profileStore";
import { toJS } from "mobx";

const EmployerSettings = () => {
  const user = toJS(profileStore.User);

  const positionRef = useRef();
  const descriptionRef = useRef();

  const saveChange = () => {
    if (positionRef.current.value !== user.position) {
      user.position = positionRef.current.value;
      employerService.updateEmployerPosition(user).then(() => {
        profileStore.updateUserData();
      });
    }
    if (
      descriptionRef.current.value !== user.description ||
      !user.description
    ) {
      user.description = descriptionRef.current.value;
      employerService.updateEmployerDescription(user).then(() => {
        profileStore.updateUserData();
      });
    }
  };

  return (
    <div>
      <p className="name">{user.name}</p>
      <p className="description">
        {user.companyName ? user.companyName : "Student"}
      </p>

      <div className="namebox-container">
        <p className="textbox-name">Stilling</p>
        <Form.Control
          className="name-textbox"
          placeholder="Stilling"
          ref={positionRef}
          defaultValue={user.position}
        />
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

export default EmployerSettings;
