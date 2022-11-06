import InputForm from "../components/create-post/inputForm.jsx";
import "./createPost.css";

const CreatePost = () => {
  return (
    <div className="create-container">
      <div className="create-top">
        <h1 className="create-top-text">Opret Praktikopslag</h1>
      </div>
      <div className="create-content">
        <InputForm />
      </div>
    </div>
  );
};

export default CreatePost;
