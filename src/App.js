import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header/header.jsx'
import CreatePost from './pages/createPost';

function App() {

  return (
    <BrowserRouter>
    <Header/>
        <Routes>
          <Route path="/" element={Header}/>
          <Route path="/post" element={<CreatePost/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
