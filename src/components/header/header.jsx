import React from "react";
import "./header.css";
import "@fontsource/poppins";


//XXXX Bootstrap XXXX
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


//XXXX IMAGES XXXX
import header_img from '../../res/images/landingpage_header.png'
import student from '../../res/images/student.png'
import employee from '../../res/images/employee.png'


export const Header = () => {
  return (
    <div>
      <Container className='pt-3 w-100 overflow-hidden' fluid='true'>
        <Row className='overflow-hidden'>
          <Col sm={5} className='mb-5'>
            <div className="mx-5">
              <p className='pre-h-text'>Find din drøme praktikplads</p>
              <h1 className='landingpage-header'>Skab kontakt til virksomheder</h1>
              <p className='header-text'>Login med Campus Net og begyndt din søgen efter praktikophold gennem vores brugervenlige portal</p>
              <div className="d-flex flex-row landingpage-buttons">
                <button className='me-2 student'><img src={student} alt="student"/>Student <span>Login</span></button>
                <button className='ms-5 employee'><img src={employee} alt="employee"/>Employee <span>Login</span></button>
              </div>
            </div>
            
          </Col>
          <Col sm={7} className='d-flex flex-row p-0 overflow-hidden'>
            <img className='img-responsive img-fluid ms-auto px-5 overflow-hidden' src={header_img} alt="DTU entrance"/>
          </Col>
        </Row>
      </Container>

      <div className='d-flex flex-column landingpage-content-h mt-5'>
        <p className='mx-auto mt-5'>Se alle opslag</p>
        <h2 className='mx-auto'>Udvalgte Praktik Pladser</h2>
      </div>
    </div>
    
  );
};

export default Header;