import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header/header.jsx'

function App() {

  return (
    <BrowserRouter>
    <Header/>
        <Routes>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
