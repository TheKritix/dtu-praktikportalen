import React from "react";
import Form from "react-bootstrap/Form";

const PasswordSettings = () => {
  return (
    <div className="mainContainer">
      <div className="settingsContainer">
        <div className="setting">
          <p className="textbox-main">Skift Password</p>
          <Form.Control
            className="main-textbox"
            type="password"
            placeholder="Ny Password"
          />
        </div>
        <div className="setting">
          <p className="textbox-main">Gentag Password</p>
          <Form.Control
            className="main-textbox"
            type="password"
            placeholder="Gentag Password"
          />
        </div>
        <div className="saveButton">
          <button className="save">Gem</button>
        </div>
      </div>
    </div>
  );
};

export default PasswordSettings;
