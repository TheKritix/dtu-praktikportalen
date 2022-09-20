import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// XXXX COMPONENTS XXXX
import Navbar from './components/navbar/navbar.jsx'
import Header from './components/header/header.jsx'


// XXXX IMAGES XXXX



//XXXX Bootstrap XXXX
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={Header}/>
      </Routes>


      <Navbar/>
      <Header/>

    </BrowserRouter>
    
  );
}

export default App;
