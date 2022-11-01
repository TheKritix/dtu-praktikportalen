import React, { useState } from "react";
import "./profile.css";
import "@fontsource/poppins";
import ProfileSettings from "./profileComponents/profileSettings.jsx";
import EmailSettings from "./profileComponents/emailSettings.jsx";
import { useNavigate } from "react-router-dom";
import PasswordSettings from "./profileComponents/passwordSettings.jsx";
import authService from "../../services/auth-service";
import { useEffect } from "react";
// Textbox Source: https://react-bootstrap.github.io/forms/form-control/

const Profile = () => {
  const [view, setView] = useState("profile");

  const navigate = useNavigate();
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      console.log(user.username);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const getView = () => {
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
  };

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
        <div className="profileMain">
          <GetView />
        </div>
      </div>
    </div>
  );
};

export default Profile;
