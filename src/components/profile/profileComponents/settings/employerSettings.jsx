import Form from "react-bootstrap/Form";
import "../profileSettings.css";
import React, { useState, useRef } from "react";
import employerService from "../../../../services/employer-service";
import { profileStore } from "../../../../stores/profileStore";
import { toJS } from "mobx";
import Typist from "react-typist-component";

const EmployerSettings = () => {
  const user = toJS(profileStore.User);

  const positionRef = useRef();
  const descriptionRef = useRef();

  const [ApiState, setApiState] = useState(false);

  const handleSaveInteraction = () => {
    setApiState(true);
    setTimeout(() => {
      setApiState(false)
    }, 2000)
}

  const saveChange = () => {
    if (positionRef.current.value !== user.position) {
      user.position = positionRef.current.value;
      employerService.updateEmployerPosition(user).then(() => {
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
      employerService.updateEmployerDescription(user).then(() => {
        profileStore.updateUserData().then(() => {
          handleSaveInteraction();
        });;
      });
    }
  };

  return (
    <div className="profileSettingsContainer">
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

export default EmployerSettings;
