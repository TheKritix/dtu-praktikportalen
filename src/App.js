import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// XXXX COMPONENTS XXXX
import Navbar from './components/navbar/navbar.jsx'
import Header from './components/header/header.jsx'
import InternshipList from "./components/internship-list/internship-list";


function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <InternshipList/>
    </BrowserRouter>
    
  );
}

export default App;
