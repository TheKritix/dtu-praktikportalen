import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/header.jsx";
import Navbar from "./components/navbar/Navbar.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={Header} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
