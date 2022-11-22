import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Form } from "react-bootstrap";
import { internshipListStore } from "./internship-list-store";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { profileStore } from "../../stores/profileStore";
import { favoriteStore } from "./favoritestore";

const locations = [
  { location: "Danmark" },
  { location: "Sverige" },
  { location: "Norge" },
  { location: "Remote" },
];

const socialBenefits = [{ social: "Fredagsbar" }, { social: "Frokostordning" }];

export const InternshipList = () => {
  const navigate = useNavigate();

  const [location, setLocation] = useState([]);
  const [socialBenefit, setSocialBenefits] = useState([]);

  const [filteredInternships, setFilteredInternships] = useState([]);

  const [staredInternships, setStaredInternships] = useState([]);
  const addToFavorites = (id) => {
    if (!staredInternships.includes(id))
      setStaredInternships(staredInternships.concat(id));
    favoriteStore.addFavorite(id);
    console.log("UserID: ", profileStore.user.id, "InternshipID: " + id);
  };
  const removeFavorites = (id) => {
    let index = staredInternships.indexOf(id);
    let temp = [
      ...staredInternships.slice(0, index),
      ...staredInternships.slice(index + 1),
    ];
    setStaredInternships(temp);
    favoriteStore.deleteFavorite(profileStore.User, id)
  };

  const gotoInternshipPost = (e) => {
    navigate(`/post/${e}`);
  };

  const liste = filteredInternships.map((d) => (
    <Card key={d._id} className="mb-3">
      <Card.Title
        style={{ cursor: "pointer" }}
        onClick={() => gotoInternshipPost(d._id)}
      >
        {" "}
        {staredInternships.includes(d._id) ? "⭐ • " : null}
        {d.hasApplied ? "ANSØGT • " : null}
        {d.title}
      </Card.Title>
      <Card.Text
        style={{ cursor: "pointer" }}
        onClick={() => gotoInternshipPost(d._id)}
      >
        {d.description.split(".")[0] + "."}
      </Card.Text>
      <p
        style={{ cursor: "pointer" }}
        onClick={() => gotoInternshipPost(d._id)}
      >
        Startdato: {d.startDate} • Lokation: {d.location}
      </p>
      <p
        style={{ cursor: "pointer" }}
        onClick={
          staredInternships.includes(d._id)
            ? () => removeFavorites(d._id)
            : () => addToFavorites(d._id)
        }
      >
        {staredInternships.includes(d._id)
          ? "Fjern fra favoriter"
          : "Tilføj til favoriter"}
      </p>
    </Card>
  ));

  const handleLocationChange = (e) => {
    if (e.target.checked) {
      setLocation([...location, e.target.value]);
    } else {
      setLocation(location.filter((id) => id !== e.target.value));
    }
  };

  const updateFavoritesLocally = () => {
    const localStaredInternships = [];
    favoriteStore.fetchFavorite().then(() => {
      if (profileStore.user.id) {
        favoriteStore.favorites.forEach((d) => {
          if (d.uid == profileStore.user.id) {
            localStaredInternships.push(d.favorite);
            console.log("Adding " + d.favorite + " to local list");
          }
        });
        setStaredInternships(localStaredInternships)
      }

      console.log("Local list: " + localStaredInternships);
      //setFilteredInternships(internshipListStore.internships);
    });
  };

  useEffect(() => {
    console.log("useEffect() run on render");
    updateFavoritesLocally();

    if (location.length === 0) {
      internshipListStore.fetchInternships().then(() => {
        setFilteredInternships(internshipListStore.internships);
        console.log(internshipListStore.Internship);
      });
    } else {
      setFilteredInternships(
        internshipListStore.internships.filter((internship) =>
          location.some((location) =>
            [internship.location].flat().includes(location)
          )
        )
      );
    }
  }, [location]);

  return (
    <div>
      <Container className="cont">
        <Col className="overskrift d-flex justify-content-center">
          <Col className="col-3" />
          <h3>Aktive praktikopslag</h3>
        </Col>
        <Col className="indhold">
          <Row className="indhold-row">
            <Col className="filterstuff col-3">
              <h4 className="">Filtrér søgning:</h4>

              <Form>
                <h6>Lokation</h6>
                {locations.map((location) => (
                  <React.Fragment key={location.location}>
                    <Form.Check
                      onChange={handleLocationChange}
                      type="checkbox"
                      label={location.location}
                      value={location.location}
                    />
                  </React.Fragment>
                ))}
              </Form>

              <br />

              <Form>
                <h6>Social</h6>
                {socialBenefits.map((benefit) => (
                  <React.Fragment key={benefit.social}>
                    <Form.Check
                      onChange={handleLocationChange}
                      type="checkbox"
                      label={benefit.social}
                      value={benefit.social}
                    />
                  </React.Fragment>
                ))}
              </Form>

              <br />
            </Col>
            <Col className="col-1" />
            <Col className="opslag col-7">
              <Row className="">
                {liste.length ? (
                  liste
                ) : (
                  <p className="d-flex justify-content-center">
                    Ingen praktikopslag matcher dine søgekriterier
                  </p>
                )}
              </Row>
            </Col>
            <Col className="col-1" />
          </Row>
        </Col>
      </Container>
    </div>
  );
};

export default observer(InternshipList);
