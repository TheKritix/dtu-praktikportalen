import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// XXXX COMPONENTS XXXX
import Navbar from './components/navbar/navbar.jsx'
import Header from './components/header/header.jsx'
import Profile from './components/profile/profile.jsx'


function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Header/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
