import React, { useEffect } from "react";
import "./navigation.css";
import dtulogo from "../../res/images/dtu-logo.png";
import { Link, useSearchParams } from "react-router-dom";
import authService from "../../services/auth-service";
import { useNavigate } from "react-router-dom";

//XXXX Bootstrap XXXX
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Row,
  Col,
  Container,
  Nav,
  Navbar,
  NavLink,
  Button,
} from "react-bootstrap";
import { useState } from "react";

const Menu = ({ currentUser }) => (
  <>
    <NavLink
      eventKey={1}
      as={Link}
      to="/internships"
      style={{ textDecoration: "none", color: "black" }}
      className="posts me-5 mt-1"
    >
      <span>Praktikpladser</span>
    </NavLink>
    <NavLink
      eventKey={2}
      as={Link}
      to="/"
      style={{ textDecoration: "none", color: "black" }}
      className=" me-5 mt-1"
    >
      Info
    </NavLink>
    {currentUser && (
      <NavLink
        eventKey={3}
        as={Link}
        to="/profile"
        style={{ textDecoration: "none", color: "black" }}
        className=" me-5 mt-1"
      >
        Profil
      </NavLink>
    )}

    {/* <NavLink
      eventKey={4}
      as={Link}
      to="/post"
      style={{ textDecoration: "none", color: "black" }}
      className=" me-5 mt-1"
    >
      Post(TEMP)
    </NavLink> */}
    {currentUser && currentUser.hasOwnProperty("companyName") && (
      <NavLink
        eventKey={5}
        as={Link}
        to="/createpost"
        style={{ textDecoration: "none", color: "black" }}
        className=" me-5 mt-1"
      >
        Create Post
      </NavLink>
    )}
  </>
);

const Navigation = () => {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(undefined);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      authService.checkToken().then(
        (response) => {
          //console.log(response.data);
        },
        (error) => {
          //console.log(error);
          if (error.response.status === 401) {
            authService.refreshToken(currentUser.refreshToken).then(
              (response) => {
                //console.log(response.data);
              },
              (error) => {
                //console.log(error);
                if (error.response.status === 403) {
                  authService.logout();
                  navigate("/");
                  window.location.reload();
                }
              }
            );
          }
        }
      );
    } else {
      //console.log("not logged in");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    searchParam.get("ticket");
    //console.log(searchParam.get("ticket"));
    if (searchParam.get("ticket") != null && currentUser == null) {
      authService.studentLogin(searchParam.get("ticket")).then(
        () => {
          navigate("/profile");
          window.location.reload();
        },
        (error) => {
          //console.log(error);
        }
      );
    }
  }, [searchParam, navigate, currentUser]);

  const handleLogout = () => {
    navigate("/");
    authService.logout();
    setCurrentUser(undefined);
    window.location.reload();
  };

  const LoginMenu = () => (
    <>
      {currentUser ? (
        <Button
          className="logout"
          variant="outline-danger"
          onClick={handleLogout}
        >
          Logout
        </Button>
      ) : (
        <Button
          className="student-login"
          variant="outline-danger"
          href={process.env.REACT_APP_DTU_AUTH}
          //onClick={handleLogin}
        >
          Login Campus Net
        </Button>
      )}
    </>
  );

  return (
    <Container className="mb-5 mt-5 ms-3 me-3 w-auto p-0 overflow-hidden" fluid>
      <Row className="justify-content-md-center">
        <Col>
          <div className="navbar-links-logo d-flex flex-row">
            <Link to="/">
              <img className="dtulogo ms-4" src={dtulogo} alt="DTU-Logo" />
            </Link>
            <h4 className="dtutext d-flex flex-row mt-3 ms-3">
              Praktikportalen
            </h4>
          </div>
        </Col>

        <Col className="navbar-links-container">
          <div className="navbar-links">
            {/* <a> DISSE BURDE VÆRE <Link> */}
            {/* Menu here*/}
            <Navbar
              collapseOnSelect
              expand="lg"
              className="navdrop d-flex flex-row"
            >
              <Navbar.Toggle
                aria-controls="responsive-navbar-nav"
                data-bs-toggle="collapse"
                data-bs-target="#responsive-navbar-nav"
              />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto">
                  <Menu currentUser={currentUser} />
                  <LoginMenu />
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Navigation;
