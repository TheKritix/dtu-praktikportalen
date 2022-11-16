import { toJS } from "mobx";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Typist from "react-typist-component";
import { profileStore } from "../../../stores/profileStore";

const PasswordSettings = () => {
  const [ApiState, setApiState] = useState(false);
  const [passwordDupeCheck, setPasswordDupeCheck] = useState(false);

  const passwordRef = useRef();
  const passwordDupeRef = useRef();

  const handleSaveInteraction = () => {
    setApiState(true);
    setTimeout(() => {
      setApiState(false);
    }, 3000);
  };

  const sameCheck = () => {
    if (passwordRef.current.value === passwordDupeRef.current.value) {
      if (passwordRef.current.value.length >= 8) {
        setPasswordDupeCheck(true);
      }
    } else if (passwordDupeCheck) {
      setPasswordDupeCheck(false);
    }
  };

  const saveChange = () => {
    if (passwordDupeCheck) {
      profileStore.user.password = passwordRef.current.value;
      console.log(toJS(profileStore.user))
      profileStore.updateEmployerPassword().then(() => {
        profileStore.updateUserData().then(() => {
          handleSaveInteraction();
        });
      });
    }
  };

  return (
    <div className="mainContainer">
      <div className="settingsContainer">
        <div className="setting">
          <p className="textbox-main">Skift Password</p>
          <Form.Control
            className="main-textbox"
            type="password"
            placeholder="Ny Password"
            ref={passwordRef}
            isValid={passwordDupeCheck}
            onChange={sameCheck}
          />
        </div>
        <div className="setting">
          <p className="textbox-main">Gentag Password</p>
          <Form.Control
            className="main-textbox"
            type="password"
            placeholder="Gentag Password"
            ref={passwordDupeRef}
            isValid={passwordDupeCheck}
            onChange={sameCheck}
          />
        </div>
        <p style={{ fontSize: "16px" }} className="textbox-main">
          * Password skal mindst være 8 tegn lang
        </p>
        <div className="saveButton">
          {ApiState && (
            <div className="confirmSave">
              <Typist typingDelay={50} restartKey={0}>
                Ændringerne er blevet gemt ✓
              </Typist>
            </div>
          )}
          <button className="save" onClick={saveChange}>
            Gem
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordSettings;
