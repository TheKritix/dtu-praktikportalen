import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header/header.jsx'


// XXXX IMAGES XXXX
import header_img from './res/images/landingpage_header.png'
import student from './res/images/student.png'
import employee from './res/images/employee.png'


//XXXX Bootstrap XXXX
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {

  return (
    <BrowserRouter>

    <Header/>

    <Container className='pt-3' fluid >
      <Row>
        <Col sm={5}>
          <div className="ms-5">
            <p className='pre-h-text'>Find din drøme praktikplads</p>
            <h1 className='landingpage-header'>Skab kontakt til virksomheder</h1>
            <p className='header-text'>Login med Campus Net og begyndt din søgen efter praktikophold gennem vores brugervenlige portal</p>
            <div className="d-flex flex-row landingpage-buttons">
              <button className='me-2 student'><img src={student}/>Student <span>Login</span></button>
              <button className='ms-5 employee'><img src={employee}/>Employee <span>Login</span></button>
            </div>
          </div>
          
        </Col>
        <Col sm={7}>
          <img className='ms-5' src={header_img} alt="Image of DTU"/>
        </Col>
      </Row>
    </Container>

    <div className='d-flex flex-column landingpage-content-h mt-5'>
      <p className='mx-auto mt-5'>Se alle opslag</p>
      <h2 className='mx-auto'>Udvalgte Praktik Pladser</h2>
    </div>
    





      <Routes className="ms-5">
        <Route path="/" element={Header}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
