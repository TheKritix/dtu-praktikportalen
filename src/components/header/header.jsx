import React from "react";
import "./header.css";
import dtulogo from "../../res/images/dtu-logo.png";
import {Link} from "react-router-dom"


//XXXX Bootstrap XXXX
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export const Header = () => {
  return (
    <Container className="mb-5 mt-5 ms-3 me-3 w-auto p-0 overflow-hidden" fluid>
      <Row xs={{ gutterX: 5 }}>


        <Col>
          <Container className="ms-4">
            <Row>
              <Col sm={2} className="d-flex flex-row">
                <img className="dtulogo" src={dtulogo} alt="DTU-Logo" />
              </Col>
              <Col sm={6} className="d-flex flex-row mt-4">
                <h4>DTU Praktikportalen</h4>
              </Col>
            </Row>
          </Container>
        </Col>
        

        <Col>
          <Container className="ms-5 me-5">
            <Row>
              <Col sm={4} className="d-flex flex-row-reverse  mt-4">
                <a style={{ textDecoration: 'none', color: 'black'}} className="mx-auto">Praktik pladser</a>
              </Col>
              <Col sm={2} className="d-flex flex-row-reverse  mt-4">
                <a style={{ textDecoration: 'none', color: 'black' }} className="mx-auto">



                <Link to="/profile">Info</Link>
                  </a>
              </Col>
              <Col sm={5} className="d-flex flex-row-reverse">
                <button className="ms-auto bg-white p-2 mt-3 rounded-3">Login Campus Net</button>
              </Col>
            </Row>
            
          </Container>
        </Col>


      </Row>
    </Container>
  );
};

export default Header;
