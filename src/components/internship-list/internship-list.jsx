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
]

export const InternshipList = () => {
  const store = postStore

  const navigate = useNavigate()

  const [type, setType] = useState([])
  const [search, setSearch] = useState("")

  const [filteredInternships, setFilteredInternships] = useState([])

  const [staredInternships, setStaredInternships] = useState([])


  const gotoInternshipPost = (e) => {
    navigate(`/post/${e}`)
  }


  const addToFavorites = (id) => {
    setStaredInternships(staredInternships.concat(id))
    favoriteStore.addFavorite(id)
  }
  const removeFromFavorites = (id) => {
    let index = staredInternships.indexOf(id)
    let temp = [
      ...staredInternships.slice(0, index),
      ...staredInternships.slice(index + 1),
    ]
    setStaredInternships(temp)
    favoriteStore.deleteFavorite(profileStore.User, id)
  }

  const updateFavoritesLocally = () => {
    const localStaredInternships = []
    if (profileStore.user) {
      favoriteStore.fetchFavorite().then(() => {
        Array.from(favoriteStore.favorites).forEach((d) => {
          if (d.uid === profileStore.user.id) {
            localStaredInternships.push(d.favorite)
          }
        })
        setStaredInternships(localStaredInternships)
      })
    }
  }


  const handleTypeFiltering = (e) => {
    if (e.target.checked) {
      setType([...type, e.target.value])
    } else {
      setType(type.filter((id) => id !== e.target.value))
    }
  }


  const handleSearch = (e) => {
    if (!e.target.value) {
      setSearch("")
    } else {
      setSearch(e.target.value)
    }
  }


  useEffect(() => {
    updateFavoritesLocally()
    // Uden filtering
    if (type.length === 0 && search === "") {
      store.fetchPosts().then(() => {
        setFilteredInternships(store.posts)
      })
      // Filtering med type
    } else if (type.length !== 0) {
      setFilteredInternships(store.posts
          .filter((post) =>
            type.some((type) =>
              [post.type].toString().toLowerCase().includes(type.toLowerCase())
            ))
          .filter((post) =>
              post.title.toLowerCase().includes(search.toLowerCase()) ||
              post.description.toLowerCase().includes(search.toLowerCase())
          ))
      // Filtrering med tekst
    } else if (type.length === 0 && search !== "") {
      setFilteredInternships(store.posts.filter((post) =>
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.description.toLowerCase().includes(search.toLowerCase())
        ))
    }
  }, [type, search, store])


  const internshipCards = filteredInternships.map((d) => (
      <Card key={d._id} className="mb-3" id="internship-card">
        <Card.Title
            style={{ cursor: "pointer" }}
            onClick={() => gotoInternshipPost(d._id)}
        >
          {staredInternships.includes(d._id) ? "??? ??? " : null}
          {d.hasApplied ? "ANS??GT ??? " : null}
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
          Type: {d.type} ??? Startdato: {d.startDate} ??? Lokation: {d.location}
        </p>
        { /* Tilladt cypress-brugeren at tilf??je favoritter til tests, da vi ikke kan oprette student accounts*/ }
        {profileStore.User && (profileStore.user.studentID || (profileStore.User.username === "cypress") ) ? (
            <p
                style={{ cursor: "pointer" }}
                onClick={
                  staredInternships.includes(d._id)
                      ? () => removeFromFavorites(d._id)
                      : () => addToFavorites(d._id)
                }
            >
              {staredInternships.includes(d._id)
                  ? "Fjern fra favoritter"
                  : "Tilf??j til favoritter"}
            </p>
        ) : null}
      </Card>
  ))

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
              <h4 className="">Filtr??r s??gning:</h4>

              <Form id="form-type-search">
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

              <Form id="field-text-search">
                <h6>Friteksts??gning</h6>
                <React.Fragment>
                  <Form.Control
                    type="search"
                    placeholder="????"
                    onChange={handleSearch}
                  />
                </React.Fragment>
              </Form>
            </Col>

            <br />

            <Col className="col-1" />
            <Col className="opslag col-7">
              <Row className="">
                {internshipCards.length ? (
                  internshipCards
                ) : (
                  <p className="d-flex justify-content-center">
                    Ingen praktikopslag matcher dine s??gekriterier
                  </p>
                )}
              </Row>
            </Col>
            <Col className="col-1" />
          </Row>
        </Col>
      </Container>
    </div>
  )
}

export default observer(InternshipList)
