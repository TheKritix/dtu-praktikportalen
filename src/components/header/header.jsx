import React, { useState, useEffect } from "react";
import "./header.css";
import "@fontsource/poppins";
import authService from "../../services/auth-service";
import { getAllPosts } from "../../services/post-service";
import { postStore } from "../../stores/post-store";
import { observer } from "mobx-react";
//XXXX Bootstrap XXXX
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import LoginEmployer from "../login/login";
//XXXX IMAGES XXXX
import header_img from "../../res/images/landingpage_header.png";
import student from "../../res/images/student.png";
import employee from "../../res/images/employee.png";
import placeholderImages from "../../res/images/PlaceholderBanner.png";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const handleClose = () => setShowLogin(false);
  const handleShow = () => setShowLogin(true);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [posts, setPosts] = useState([]);
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      console.log("navbar user");
    } else {
      setCurrentUser(undefined);
    }
  }, []);

  const fetchPosts = async () => {
    await getAllPosts()
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
        if (postStore.bannerImageList.length === 0) {
          response.data
            .filter(({ bannerImageID }) => bannerImageID)
            .forEach((post) => {
              postStore.fetchAllBannerImages(post);
            });
        }
        setBanners(postStore.bannerImageList);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <Container className="pt-3 w-100 overflow-hidden" fluid="true">
        <Row className="overflow-hidden">
          <Col sm={5} className="mb-5">
            <div className="header-text mx-5">
              <p className="pre-h-text">Find din drømme praktikplads</p>
              <h1 className="landingpage-header">
                Skab kontakt til virksomheder
              </h1>
              {currentUser ? (
                <p className="header-text-p">
                  Start din søgning efter et praktikophold i dag!
                </p>
              ) : (
                <p className="header-text-p">
                  Login med Campus Net og begyndt din søgen efter praktikophold
                  gennem vores brugervenlige portal
                </p>
              )}
              {currentUser ? (
                <p>Velkommen til, {currentUser.name}</p>
              ) : (
                <div className="d-flex flex-row landingpage-buttons">
                  <button
                    className="me-2 student px-4 py-2"
                    onClick={() =>
                      (window.location.href = process.env.REACT_APP_DTU_AUTH_LOCAL)
                    }
                  >
                    <img src={student} alt="student-logo" />
                    Student <span>Login</span>
                  </button>

                  <button
                    className="employee px-3 mx-2"
                    onClick={() => handleShow()}
                  >
                    <img src={employee} alt="employer-login" />
                    Employer <span>Login</span>
                  </button>
                </div>
              )}
            </div>
          </Col>
          <Col sm={7} className="d-flex flex-row p-0 overflow-hidden">
            <img
              className="img-responsive img-fluid ms-auto px-5 overflow-hidden"
              src={header_img}
              alt="DTU entrance"
            />
          </Col>
        </Row>
      </Container>

      <div className="d-flex flex-column landingpage-content-h mt-5">
        <p className="mx-auto mt-5">Se alle opslag</p>
        <h2 className="mx-auto">Udvalgte Praktik Pladser</h2>
        <Row
          xs="auto"
          md="auto"
          className="header-cards d-flex mx-auto mb-2 mt-5"
        >
          {posts &&
            posts.map((post) => {
              return (
                <Col key={post._id} className="d-flex mx-auto mb-4">
                  <Card style={{ width: "18rem", height: "25rem" }}>
                    {post.bannerImageID &&
                    postStore.bannerImageList.length !== 0 ? (
                      <Card.Img
                        variant="top"
                        className="card-image"
                        src={banners?.[banners.indexOf(post.bannerImageID) + 1]}
                      />
                    ) : (
                      <Card.Img
                        variant="top"
                        className="card-image"
                        src={placeholderImages}
                      />
                    )}
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Text>
                        {post.description.substring(0, 100)}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        Start Date: {post.startdate}
                      </small>
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </div>
      <LoginEmployer
        show={showLogin}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </div>
  );
};

export default observer(Header);
