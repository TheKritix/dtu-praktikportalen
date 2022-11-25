import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import authService from "./services/auth-service";

// XXXX COMPONENTS XXXX
import Header from "./components/header/header.jsx";
import Profile from "./pages/profile";
import CreatePost from "./pages/createPost";
import PostPage from "./pages/postPage";
import InternshipList from "./components/internship-list/internship-list.jsx";
import EmployerContent from "./components/user-page/usercontent";
import Navigation from "./components/navbar/navigation.jsx";

function App() {
  document.title = "DTU Praktikportalen";
  return (
    <BrowserRouter /*basename={process.env.PUBLIC_URL}*/>
      <Navigation />
      <Routes>
        <Route path="/" element={<Header />} />
        <Route
          path="/profile"
          element={
            authService.getCurrentUser() != null ? (
              <Profile />
            ) : (
              <Navigate replace to={"/"} />
            )
          }
        />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/internships" element={<InternshipList />} />
        <Route path="/employer" element={<EmployerContent />} />
        {/* <Route path="/dtu-praktikportalen" element={<Navigate to="/" />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
