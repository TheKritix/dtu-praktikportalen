import React from "react";
import "./navbar.css";
import dtulogo from "../../res/images/dtu-logo.png";


//XXXX Bootstrap XXXX
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export const Navbar = () => {
  return (
    <Container className="mb-5 mt-5 ms-3 me-3 w-auto p-0 overflow-hidden" fluid>
      <Row>
        <Col>
          <div sm={8} className="d-flex flex-row">
            <img className="dtulogo ms-4" src={dtulogo} alt="DTU-Logo" />
            <h4 className="d-flex flex-row mt-4 ms-5">DTU Praktikportalen</h4>
          </div>
        </Col>
        <Col>
          <div className="d-flex flex-row mt-4 ms-auto me-2">
            <a style={{ textDecoration: 'none', color: 'black'}} className=" me-5 mt-1 ms-auto">Praktik pladser</a>
            <a style={{ textDecoration: 'none', color: 'black' }} className=" me-5 mt-1">Info</a>
            <button className="bg-white p-2 rounded-3 me-2">Login Campus Net</button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Navbar;
