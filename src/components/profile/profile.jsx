import React, { useState } from "react";
import "./profile.css";
import "@fontsource/poppins";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import ProfileSettings from "./profileSettings.jsx";
import authService from "../../services/auth-service";
import { useEffect } from "react";
// Textbox Source: https://react-bootstrap.github.io/forms/form-control/

const Profile = () => {
  const [view, setView] = useState("profile");

  const [email, setEmail] = useState("foo@boo.com");
  const navigate = useNavigate();
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      console.log(user.username);
    } else {
      navigate("/");
    }
  }, [navigate]);

  //Not needed for anything, and probably won't be needed for anything
  const handleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const EmailSettings = () => {
    return (
      <div>
        <div className="main-container">
          <p className="textbox-main">Email</p>
          <Form.Control className="main-textbox" placeholder={email} disabled />
          <p className="textbox-main">Skift Email-Adresse</p>
          <Form.Control
            className="main-textbox"
            placeholder="Ny Email"
            onChange={handleChange}
          />
          <div className="saveButton">
            <button className="saveMain">Gem</button>
          </div>
        </div>
      </div>
    );
  };

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

  function getView() {
    let ViewComponent;

    switch (view) {
      case "profile":
        ViewComponent = ProfileSettings();
        break;
      case "email":
        ViewComponent = EmailSettings();
        break;
      case "password":
        ViewComponent = PasswordSettings();
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
          <button
            style={{
              fontWeight: view === "password" ? "bold" : "normal",
            }}
            onClick={() => setView("password")}
            className="profileButton"
          >
            Password
          </button>
        </div>
        <div className="profileMain">{getView()}</div>
      </div>
    </div>
  );
};

export default Profile;
