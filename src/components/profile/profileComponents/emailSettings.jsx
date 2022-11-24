import { toJS } from "mobx";
import React, { useState } from "react";
import { useRef } from "react";
import Form from "react-bootstrap/Form";
import Typist from "react-typist-component";
import { profileStore } from "../../../stores/profileStore";

const EmailSettings = () => {
  const [email, setEmail] = useState(toJS(profileStore.User.email));
  const [emailDupeCheck, setEmailDupeCheck] = useState(true);

  const changeEmailRef = useRef();

  const [ApiState, setApiState] = useState(false);

  const handleSaveInteraction = () => {
    setApiState(true);
    setTimeout(() => {
      setApiState(false);
    }, 3000);
  };

  const saveChange = () => {
    if (!emailDupeCheck) {
      profileStore.user.email = changeEmailRef.current.value;
      profileStore.updateEmail().then(() => {
        profileStore.updateUserData().then(() => {
          setEmail(profileStore.user.email);
          handleSaveInteraction();
        });
      });
    }
  };

  const dupeCheck = () => {
    if (email === changeEmailRef.current.value) {
      setEmailDupeCheck(true);
    } else if (changeEmailRef.current.value === "") {
      setEmailDupeCheck(true);
    } else if (
      !changeEmailRef.current.value.includes("@") ||
      !changeEmailRef.current.value.includes(".")
    ) {
      setEmailDupeCheck(true);
    } else if (emailDupeCheck) {
      setEmailDupeCheck(false);
    }
  };

  return (
    <div className="mainContainer">
      <div className="settingsContainer">
        <div className="setting">
          <p className="textbox-main">Email</p>
          <Form.Control className="main-textbox" placeholder={email} disabled />
        </div>
        <div className="setting">
          <Form.Group>
            <p className="textbox-main">Skift Email-Adresse</p>
            <Form.Control
              className="main-textbox"
              placeholder="Ny Email"
              type="email"
              ref={changeEmailRef}
              isInvalid={emailDupeCheck}
              onChange={dupeCheck}
            />
          </Form.Group>
          {emailDupeCheck && (
            <p style={{ color: "red", margin: "5px" }} className="textbox-main">
              Brug kun en gyldig email
            </p>
          )}
        </div>
        <div className="saveButton">
          {ApiState && (
            <div className="confirmSave">
              <Typist typingDelay={50} restartKey={0}>
                Ændringerne er blevet gemt ✓
              </Typist>
            </div>
          )}
          <button
            className="save"
            onClick={saveChange}
            disabled={emailDupeCheck}
          >
            Gem
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailSettings;
