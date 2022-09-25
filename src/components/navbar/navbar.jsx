import React from "react";
import "./navbar.css";
import dtulogo from "../../res/images/dtu-logo.png";
import { Link } from 'react-router-dom';


//XXXX Bootstrap XXXX
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from "react-bootstrap";



const Navbar = () => {
 
  return (
    <Container className="mb-5 mt-5 ms-3 me-3 w-auto p-0 overflow-hidden" fluid>
      <Row>
        <Col>
          <div sm={8} className="d-flex flex-row">
            <Link to="/"><img className="dtulogo ms-4" src={dtulogo} alt="DTU-Logo" /></Link>
            <h4 className="d-flex flex-row mt-4 ms-5">DTU Praktikportalen</h4>
          </div>
        </Col>
        <Col>
          <div className="d-flex flex-row mt-4 ms-auto me-2">
            {/* <a> DISSE BURDE VÆRE <Link> */}
            <Link to="/" style={{ textDecoration: 'none', color: 'black'}} className=" me-5 mt-1 ms-auto">Praktik pladser</Link>
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }} className=" me-5 mt-1">Info</Link>
            <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }} className=" me-5 mt-1">Profil(TEMP)</Link>
            <Link to="/post" style={{ textDecoration: 'none', color: 'black' }} className=" me-5 mt-1">Post(TEMP)</Link>
            <Link to="/createpost" style={{ textDecoration: 'none', color: 'black' }} className=" me-5 mt-1">CreatePost(TEMP)</Link>
            <Button variant="outline-danger" href="https://auth.dtu.dk/dtu/login?menulanguage=da-DK">Login Campus Net</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Navbar;
