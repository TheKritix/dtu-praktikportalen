import Form from "react-bootstrap/Form";
import bannerPlaceholder from "../../res/images/PlaceholderBanner.png";
import Button from "react-bootstrap/Button";
import "../create-post/inputForm.css";
import { useState } from "react";
import { uploadPost } from "../../services/PostService";

const InputForm = () => {
  const defaultObject = () => ({
    title: "",
    type: "",
    company: "",
    location: "",
    startdate: "",
    description: "",
    contact: "",
    applyToEmail: "",
    website: "",
    //bannerImg: bannerImage,
  });
  const [createdPost, setCreatedPost] = useState(defaultObject);
  const [previewImage, setPreviewImage] = useState(bannerPlaceholder);
  const [validated, setValidated] = useState(false);

  // const saveFile = (e) => {
  //     const img = JSON.stringify(URL.createObjectURL(e.target.files[0]))
  //     setCreatedPost({
  //         ...createdPost,
  //         bannerImg: img
  //     })
  //     // setBannerImage(imgObject);
  //     setPreviewImage(URL.createObjectURL(e.target.files[0]));
  // }

  const handleChangePost = (e) => {
    // if (e.target.name === "bannerImg") {
    //     saveFile(e);
    // } else
    setCreatedPost({
      ...createdPost,
      [e.target.name]: e.target.value,
    });
  };

  const setDefaultState = () => {
    setCreatedPost(defaultObject);
    setPreviewImage(bannerPlaceholder);
  };

  const submitPost = (e) => {
    console.log(createdPost);
    e.preventDefault();
    if (
      createdPost.title === "" ||
      createdPost.type === "" ||
      createdPost.company === "" ||
      createdPost.location === "" ||
      createdPost.startdate === "" ||
      createdPost.description === "" ||
      createdPost.contact === "" ||
      createdPost.applyToEmail === "" ||
      createdPost.website === ""
    ) {
      e.stopPropagation();
      window.alert("Venligst udfyld alle påkrævede felter");
      setValidated(true);
    } else if (window.confirm("Vil du oprette dette opslag?")) {
      uploadPost(createdPost);
      console.log(createdPost);
      setDefaultState();
      setValidated(false);
    }
  };

  // useEffect(() => {
  //     setCreatedPost([defaultObject])
  // }, [])

  return (
    <Form
      className="form-container"
      noValidate
      validated={validated}
      onSubmit={submitPost}
    >
      <div className="form-content">
        <div className="left-input-content">
          <Form.Group>
            <h3 className="form-titel-text">Jobtitel</h3>
            <Form.Control
              className="form-input"
              placeholder="Titel på stillingen"
              name="title"
              value={createdPost.title}
              required
              onChange={handleChangePost}
            ></Form.Control>

            <h3 className="form-titel-text">Stillingstype</h3>
            <Form.Select
              className="form-input"
              placeholder="vælg stillingens type"
              name="type"
              value={createdPost.type}
              required
              onChange={handleChangePost}
            >
              <option value="">Vælg type</option>
              <option value="elev">Elev</option>
              <option value="praktik">Praktik</option>
              <option value="fuldtid">Fuldtid</option>
              <option value="deltid">Deltid</option>
            </Form.Select>

            <h3 className="form-titel-text">Firmanavn</h3>
            <Form.Control
              className="form-input"
              name="company"
              placeholder="Navn på firmaet"
              value={createdPost.company}
              required
              onChange={handleChangePost}
            ></Form.Control>

            <h3 className="form-titel-text">Placering</h3>
            <Form.Control
              className="form-input"
              name="location"
              placeholder="F.eks. København"
              value={createdPost.location}
              required
              onChange={handleChangePost}
            ></Form.Control>

            <h3 className="form-titel-text">Startdato</h3>
            <Form.Control
              className="form-input"
              name="startdate"
              placeholder="F.eks. Februar 2023"
              value={createdPost.startdate}
              required
              onChange={handleChangePost}
            ></Form.Control>

            <h3 className="form-titel-text">Beskrivelse</h3>
            <Form.Control
              className="form-description"
              name="description"
              as="textarea"
              rows={8}
              placeholder="Tilføj beskrivelse af stilling"
              value={createdPost.description}
              required
              onChange={handleChangePost}
            ></Form.Control>
          </Form.Group>
        </div>
        <div className="right-input-content">
          <Form.Group>
            <h3 className="form-titel-text">Kontaktperson</h3>
            <Form.Control
              className="form-input"
              type="text"
              placeholder="Navn på kontaktperson"
              name="contact"
              value={createdPost.contact}
              required
              onChange={handleChangePost}
            ></Form.Control>

            <h3 className="form-titel-text">Ansøgning Email</h3>
            <Form.Control
              className="form-input"
              type="email"
              placeholder="Indtast Email"
              name="applyToEmail"
              value={createdPost.applyToEmail}
              required
              onChange={handleChangePost}
            ></Form.Control>

            <h3 className="form-titel-text">Hjemmeside</h3>
            <Form.Control
              className="form-input"
              type="text"
              placeholder="Virksomhedens hjemmeside"
              name="website"
              value={createdPost.website}
              required
              onChange={handleChangePost}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <h3 className="form-titel-text">Upload billede</h3>
            <img
              className="form-banner-image"
              src={previewImage}
              alt="bannerImg"
            ></img>
            <Form.Control
              className="form-banner-input"
              name="bannerImg"
              type="file"
              accept="image/*"
              disabled
              onChange={handleChangePost}
            />
          </Form.Group>
        </div>
      </div>
      <div className="form-button-div">
        <Button className="preview-button" size="lg" disabled>
          Preview opslag
        </Button>
        <Button className="form-submit-button" type="submit" size="lg">
          Opret stilling
        </Button>
      </div>
    </Form>
  );
};

export default InputForm;
