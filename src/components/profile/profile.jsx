import React, { useState } from "react";
import "./profile.css";
import "@fontsource/poppins";
import ProfileSettings from "./profileComponents/profileSettings.jsx";
import EmailSettings from "./profileComponents/emailSettings.jsx";
import PasswordSettings from "./profileComponents/passwordSettings.jsx";
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

  return (
    <div className="profile-container">
      <div className="profileTitle">
        <p className="title">Profilindstillinger</p>
      </div>
      <div className="profileDropdownMenu">
        <Dropdown>
          <Dropdown.Toggle id="dropdown-menu">{currentView}</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setView("profile")}>
              Profil
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setView("email")}>
              Email
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setView("password")}>
              Password
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="profile">
        <Container className="mb-5 mt-5 ms-4 me-3 w-auto p-0" fluid>
          <Row className="container">
            <Col className="sidebar">
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
            </Col>
            <Col>
              <div className="profileMain">
                <GetView />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Profile;
