import React from "react";
import Form from "react-bootstrap/Form";

const PasswordSettings = () => {
    return (
      <div>
        <div className="main-container">
          <p className="textbox-main">Skift Password</p>
          <Form.Control
            className="main-textbox"
            type="password"
            placeholder="Ny Password"
          />
          <p className="textbox-main">Gentag Password</p>
          <Form.Control
            className="main-textbox"
            type="password"
            placeholder="Gentag Password"
          />
          <div className="saveButton">
            <button className="saveMain">Gem</button>
          </div>
        </div>
      </div>
    );
  };

  export default PasswordSettings;