import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header/header.jsx'

function App() {

  return (
    <BrowserRouter>
    <Header/>
        <Routes>
          <Route path="/" element={Header}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
