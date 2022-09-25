import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// XXXX COMPONENTS XXXX
import Navbar from './components/navbar/navbar.jsx'
import Header from './components/header/header.jsx'
import CreatePost from './pages/createPost';


function App() {

  return (
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Header/>}/>
          <Route path="/createpost" element={<CreatePost/>}/>
        </Routes>
    </BrowserRouter>
    
  );
}

export default App;
