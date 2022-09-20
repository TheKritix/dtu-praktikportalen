import React, { useState } from "react";
import "./profile.css";
import "@fontsource/poppins";
import Form from "react-bootstrap/Form";

import image from "./profileTestImage.jpg";

const Profile = () => {
  const [view, setView] = useState("profile");
  const [name, setName] = useState("PLACEHOLDER NAME");

  const ProfileSettings = () => {
    return (
      <div>
        <div className="profileBackdrop"></div>
        <div className="profilePicture">
          <img src={image} className="image" alt="profilbillede" />
        </div>
        <p className="name">{name}</p>
        <p className="description">Student</p>

        <div className="namebox-container">
          <p className="textbox-name">Navn</p>
          <Form.Control className="name-textbox" placeholder="Navn" />
        </div>
        <div className="cv-container">
          <p className="textbox-cv">Resumé</p>
          <Form.Control className="cv-textbox" placeholder="Navn" />
        </div>

      </div>
    );
  };

  const EmailSettings = () => {
    return <div>Test</div>;
  };

  function getView() {
    let ViewComponent;

    switch (view) {
      case "profile":
        ViewComponent = ProfileSettings();
        break;
      case "email":
        ViewComponent = EmailSettings();
        break;
      default:
        ViewComponent = ProfileSettings();
        break;
    }

    return ViewComponent;
  }

  return (
    <div className="profile-container">
      <div className="profileTitle">
        <p className="title">Profilindstillinger</p>
      </div>
      <div className="profile">
        <div className="profileMenu">
          <button
            style={{
              fontWeight: view === "profile" ? "bold" : "normal",
            }}
            onClick={() => setView("profile")}
            className="profileButton"
          >
            Profil
          </button>
          <button
            style={{
              fontWeight: view === "email" ? "bold" : "normal",
            }}
            onClick={() => setView("email")}
            className="profileButton"
          >
            Email
          </button>
          <button className="profileButton">Password</button>
          <button className="profileButton">Notifikationer</button>
          <button className="profileButton">Kontakt</button>
        </div>
        <div className="profileMain">{getView()}</div>
      </div>
    </div>
  );
};

export default Profile;
