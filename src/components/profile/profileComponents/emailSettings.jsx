import { toJS } from "mobx";
import React, { useState } from "react";
import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { profileStore } from "../../../stores/profileStore";

const EmailSettings = () => {

  const [email, setEmail] = useState();

  useEffect(() => {
    setEmail(toJS(profileStore.User.email))
  }, [email])

  return (
    <div>
      <div className="main-container">
        <p className="textbox-main">Email</p>
        <Form.Control className="main-textbox" placeholder={email} disabled />
        <p className="textbox-main">Skift Email-Adresse</p>
        <Form.Control
          className="main-textbox"
          placeholder="Ny Email"
          type="email"
        />
        <div className="saveButton">
          <button className="saveMain">Gem</button>
        </div>
      </div>
    </div>
  );
};

export default EmailSettings;
