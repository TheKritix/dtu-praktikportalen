import React, { useState } from "react";
import Form from "react-bootstrap/Form";

const EmailSettings = () => {
  // eslint-disable-next-line no-unused-vars
  const [email, setEmail] = useState("foo@boo.com");

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
