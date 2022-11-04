import React, { useEffect } from "react";
import "./navbar.css";
import dtulogo from "../../res/images/dtu-logo.png";
import { Link, useSearchParams } from "react-router-dom";
import authService from "../../services/auth-service";
import { useNavigate } from "react-router-dom";

//XXXX Bootstrap XXXX
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [newStudent, setNewStudent] = useState(false);
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user.email);
      console.log(currentUser);
    } else {
      setCurrentUser(undefined);
    }
  }, []);

  useEffect(() => {
    searchParam.get("ticket");
    const currentUser = authService.getCurrentUser();
    console.log(searchParam.get("ticket"));
    if (searchParam.get("ticket") != null && currentUser == null) {
      authService.studentLogin(searchParam.get("ticket")).then(
        () => {
          console.log("student signup");
          navigate("/profile");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );

      //handleLogin();
    }
  }, [searchParam, navigate]);
  /*
  const handleLogin = async (e) => {
    //e.preventDefault();
    authService.studentSignup(searchParam.get("ticket")).then(
      () => {
        authService.studentLogin().then(
          () => {
            navigate("/profile");
          },
          (error) => {
            console.log(error);
          }
        );
        //window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  /*
  const handleLogin = (e) => {
    authService.studentLogin(searchParam.get("ticket")).then(
      () => {
        console.log("Logged in");
        //navigate("/profile");
        //window.location.reload();
      },
      (error) => {
        console.log(error.toString());
      }
    );
  };
  */

  const handleLogout = () => {
    navigate("/");
    authService.logout();
    window.location.reload();
  };
  return (
    <Container className="mb-5 mt-5 ms-3 me-3 w-auto p-0 overflow-hidden" fluid>
      <Row>
        <Col>
          <div sm={8} className="d-flex flex-row">
            <Link to="/">
              <img className="dtulogo ms-4" src={dtulogo} alt="DTU-Logo" />
            </Link>
            <h4 className="d-flex flex-row mt-4 ms-5">DTU Praktikportalen</h4>
          </div>
        </Col>
        <Col>
          <div className="d-flex flex-row mt-4 ms-auto me-2">
            {/* <a> DISSE BURDE VÆRE <Link> */}
            <Link
              to="/internships"
              style={{ textDecoration: "none", color: "black" }}
              className=" me-5 mt-1 ms-auto"
            >
              Praktikpladser
            </Link>
            <Link
              to="/"
              style={{ textDecoration: "none", color: "black" }}
              className=" me-5 mt-1"
            >
              Info
            </Link>
            <Link
              to="/profile"
              style={{ textDecoration: "none", color: "black" }}
              className=" me-5 mt-1"
            >
              Profil(TEMP)
            </Link>
            <Link
              to="/post"
              style={{ textDecoration: "none", color: "black" }}
              className=" me-5 mt-1"
            >
              Post(TEMP)
            </Link>
            <Link
              to="/createpost"
              style={{ textDecoration: "none", color: "black" }}
              className=" me-5 mt-1"
            >
              CreatePost(TEMP)
            </Link>
            {currentUser ? (
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button
                variant="outline-danger"
                href="https://auth.dtu.dk/dtu/?service=http://localhost:3001/dtu-praktikportalen"
                //onClick={handleLogin}
              >
                Login Campus Net
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Navbar;
