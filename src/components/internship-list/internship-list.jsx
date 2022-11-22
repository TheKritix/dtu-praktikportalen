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
import { favoriteStore } from "./favoritestore";
import {postStore} from "../../stores/post-store";

//TODO: "Massive cleanup"

const types = [
  { type: "Elev" },
  { type: "Praktik" },
  { type: "Deltid" },
  { type: "Fuldtid" },
];

const socialBenefits = [{ social: "Fredagsbar" }, { social: "Frokostordning" }];

export const InternshipList = () => {
  const store = postStore

  const navigate = useNavigate()

  const [type, setType] = useState([]);

  /*const lowerCaseTypes = []

  types.forEach(element => {
    lowerCaseTypes.push(element.toLowerCase());
  });*/

  const [search, setSearch] = useState("");

  const [filteredInternships, setFilteredInternships] = useState([]);
  const stagedFilteredInternships = []
  let stagedSearch = []

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
        Type: {d.type} • Startdato: {d.startDate} • Lokation: {d.location}
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

  const handleTypeFiltering = (e) => {
    if (e.target.checked) {
      setType([...type, e.target.value]);
    } else {
      setType(type.filter((id) => id !== e.target.value));
    }
    console.log(type)
  };

  const handleSearch = (e) => {
    if (!e.target.value) {
      setSearch("")
    } else {
      setSearch(e.target.value)
    }
    //setSearch(postStore.posts.filter(post => post.title.includes(e.target.value)))
    //setSearch(stagedSearch)
    //setSearch(e.target.value.toLowerCase())
    console.log("search ændret: " + search)
  }

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
    console.log("Types: " + types)
    //console.log("Lowercase Types: " + lowerCaseTypes)

      // Uden filtering
    if (type.length === 0 && search === "") {
      console.log("Nr. 1")
      store.fetchPosts().then(() => {
        setFilteredInternships(store.posts);
      });
      // Filtering med type
    } else if (type.length !== 0) {
      console.log("Nr. 2")
      setFilteredInternships(
          store.posts.filter((post) =>
              type.some((type) =>
                  [post.type].toString().toLowerCase().includes(type.toLowerCase())
              )
          ).filter(post => post.title.toLowerCase().includes(search.toLowerCase()) || post.description.toLowerCase().includes(search.toLowerCase()))
      )
      // Filtrering med tekst
    } else if (type.length === 0 && search !== "") {
      console.log("Nr. 3")
      setFilteredInternships(
          store.posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()) || post.description.toLowerCase().includes(search.toLowerCase()))
      )
    }
    /*{
      setFilteredInternships(
          store.posts.filter((post) =>
          type.some((type) =>
            [post.type].includes(type.toLowerCase())
          )
        )
      );
    }*/
  }, [type, search]);

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
                      //value={query}
                      onChange={handleSearch}
                  />
                </React.Fragment>
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
