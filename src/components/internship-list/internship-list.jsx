import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { profileStore } from "../../stores/profileStore";
import { favoriteStore } from "../../stores/favoritestore";
import { postStore } from "../../stores/post-store";

const types = [
  { type: "Elev" },
  { type: "Praktik" },
  { type: "Deltid" },
  { type: "Fuldtid" },
];

export const InternshipList = () => {
  const store = postStore;

  const navigate = useNavigate();

  const [type, setType] = useState([]);
  const [search, setSearch] = useState("");

  const [filteredInternships, setFilteredInternships] = useState([]);
  const [staredInternships, setStaredInternships] = useState([]);

  const addToFavorites = (id) => {
    if (!staredInternships.includes(id))
      setStaredInternships(staredInternships.concat(id));
    favoriteStore.addFavorite(id);
  };
  const removeFavorites = (id) => {
    let index = staredInternships.indexOf(id);
    let temp = [
      ...staredInternships.slice(0, index),
      ...staredInternships.slice(index + 1),
    ];
    setStaredInternships(temp);
    favoriteStore.deleteFavorite(profileStore.User, id);
  };

  const gotoInternshipPost = (e) => {
    navigate(`/post/${e}`);
  };

  const list = filteredInternships.map((d) => (
    <Card key={d._id} className="mb-3">
      <Card.Title
        style={{ cursor: "pointer" }}
        onClick={() => gotoInternshipPost(d._id)}
      >
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
        Type: {d.type} • Startdato: {d.startDate} • Lokation: {d.location}
      </p>
      {profileStore.User && profileStore.user.studentID ? (
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
      ) : null}
    </Card>
  ));

  const handleTypeFiltering = (e) => {
    if (e.target.checked) {
      setType([...type, e.target.value]);
    } else {
      setType(type.filter((id) => id !== e.target.value));
    }
  };

  const handleSearch = (e) => {
    if (!e.target.value) {
      setSearch("");
    } else {
      setSearch(e.target.value);
    }
  };

  const updateFavoritesLocally = () => {
    const localStaredInternships = [];
    if (profileStore.user) {
      favoriteStore.fetchFavorite().then(() => {
        Array.from(favoriteStore.favorites).forEach((d) => {
          if (d.uid === profileStore.user.id) {
            localStaredInternships.push(d.favorite);
          }
        });
        setStaredInternships(localStaredInternships);
      });
    }
  };

  useEffect(() => {
    updateFavoritesLocally();

    // Uden filtering
    if (type.length === 0 && search === "") {
      store.fetchPosts().then(() => {
        setFilteredInternships(store.posts);
      });
      // Filtering med type
    } else if (type.length !== 0) {
      setFilteredInternships(
        store.posts
          .filter((post) =>
            type.some((type) =>
              [post.type].toString().toLowerCase().includes(type.toLowerCase())
            )
          )
          .filter(
            (post) =>
              post.title.toLowerCase().includes(search.toLowerCase()) ||
              post.description.toLowerCase().includes(search.toLowerCase())
          )
      );
      // Filtrering med tekst
    } else if (type.length === 0 && search !== "") {
      setFilteredInternships(
        store.posts.filter(
          (post) =>
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.description.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [type, search, store]);

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
                <h6>Jobtype</h6>
                {types.map((type) => (
                  <React.Fragment key={type.type}>
                    <Form.Check
                      onChange={handleTypeFiltering}
                      type="checkbox"
                      label={type.type}
                      value={type.type}
                    />
                  </React.Fragment>
                ))}
              </Form>

              <br />

              <Form>
                <h6>Fritekstsøgning</h6>
                <React.Fragment>
                  <Form.Control
                    type="search"
                    placeholder="🔎"
                    onChange={handleSearch}
                  />
                </React.Fragment>
              </Form>

              <br />
            </Col>
            <Col className="col-1" />
            <Col className="opslag col-7">
              <Row className="">
                {list.length ? (
                  list
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
