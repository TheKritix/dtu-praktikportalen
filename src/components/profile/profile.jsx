import React, { useState } from "react";
import "./profile.css";
import "@fontsource/poppins";
import ProfileSettings from "./profileComponents/profileSettings.jsx";
import EmailSettings from "./profileComponents/emailSettings.jsx";
import PasswordSettings from "./profileComponents/passwordSettings.jsx";
import { profileStore } from "../../stores/profileStore";
import { Dropdown, Container, Col, Row } from "react-bootstrap";

// Textbox Source: https://react-bootstrap.github.io/forms/form-control/

const Profile = () => {
  const [view, setView] = useState("profile");
  const [currentView, setCurrentView] = useState("");
  const GetView = () => {
    let ViewComponent;

    switch (view) {
      case "profile":
        ViewComponent = ProfileSettings();
        setCurrentView("Profil");
        break;
      case "email":
        ViewComponent = EmailSettings();
        setCurrentView("Email");
        break;
      case "password":
        ViewComponent = PasswordSettings();
        setCurrentView("Password");
        break;
      default:
        ViewComponent = ProfileSettings();
        setCurrentView("Profil");
        break;
    }

    return ViewComponent;
  };

  const ProfileMenu = () => {
    return (
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
        {profileStore.user.companyName && (
          <button
            style={{
              fontWeight: view === "password" ? "bold" : "normal",
            }}
            onClick={() => setView("password")}
            className="profileButton"
          >
            Password
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="profile-container">
      <div className="profileTitle">
        <p className="title">Profilindstillinger</p>
      </div>
      <div className="profile">
        <ProfileMenu />
        <div className="profileMain">
          <GetView />
        </div>
        <div className="flexLoad" />
      </div>
    </div>
  );
};

export default Profile;
