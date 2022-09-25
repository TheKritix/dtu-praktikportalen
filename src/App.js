import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// XXXX COMPONENTS XXXX
import Navbar from './components/navbar/navbar.jsx'
import Header from './components/header/header.jsx'
import CreatePost from './pages/createPost';
import PostPage from './pages/postPage';


function App() {

  return (
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Header/>}/>
          <Route path="/createpost" element={<CreatePost/>}/>
          <Route path="/post" element={<PostPage/>}></Route>
        </Routes>
    </BrowserRouter>
    
  );
}

export default App;
