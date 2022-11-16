import { toJS } from "mobx";
import React, { useState } from "react";
import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { profileStore } from "../../../stores/profileStore";

const EmailSettings = () => {
  const [email, setEmail] = useState();

  useEffect(() => {
    setEmail(toJS(profileStore.User.email));
  }, [email]);

  return (
    <div className="mainContainer">
      <div className="settingsContainer">
        <div className="setting">
          <p className="textbox-main">Email</p>
          <Form.Control className="main-textbox" placeholder={email} disabled />
        </div>
        <div className="setting">
          <p className="textbox-main">Skift Email-Adresse</p>
          <Form.Control
            className="main-textbox"
            placeholder="Ny Email"
            type="email"
          />
        </div>
        <div className="saveButton">
          <button className="save">Gem</button>
        </div>
      </div>
    </div>
  );
};

export default EmailSettings;
