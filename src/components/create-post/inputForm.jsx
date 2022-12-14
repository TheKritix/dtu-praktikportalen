import Form from "react-bootstrap/Form";
import bannerPlaceholder from "../../res/images/PlaceholderBanner.png";
import Button from "react-bootstrap/Button";
import "../create-post/inputForm.css";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import PostContent from "../post-page/postContent"
import PostContactInfo from "../post-page/postContactInfo";
import { postStore } from "../../stores/post-store";
import postService from "../../services/post-service"

//Source: https://react-bootstrap.github.io/forms/overview/

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
    bannerImg: bannerPlaceholder,
  });
  const [createdPost, setCreatedPost] = useState(defaultObject);
  const [previewImage, setPreviewImage] = useState(bannerPlaceholder);
  const [validated, setValidated] = useState(false);
  const [previewShow, setPreviewShow] = useState(false);
  const [uploadImage, setUploadImage] = useState();
  const isReview = true;

  const handleShow = () => {
    if (
      createdPost.title !== "" ||
      createdPost.type !== "" ||
      createdPost.company !== "" ||
      createdPost.location !== "" ||
      createdPost.startdate !== "" ||
      createdPost.description !== "" ||
      createdPost.contact !== "" ||
      createdPost.applyToEmail !== "" ||
      createdPost.website !== ""
    ) {
      setPreviewShow(true);
      setValidated(true);
    } else {
      window.alert("Du har ikke udfyldt nogen felter");
    }
  }

  const handleClose = () => setPreviewShow(false);

  const handleChangeImage = (e) => {
    if (!e.target.files[0]) {
      return;
    } else {

      const imgObject = new Image();
      imgObject.src = URL.createObjectURL(e.target.files[0]);
      
      setPreviewImage(imgObject.src);
      //til preview post
      setCreatedPost({...createdPost,
        bannerImg: imgObject.src})
      //fil til upload
      setUploadImage(e.target.files[0])
    }
  };

  const handleChangePost = (e) => {
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
      window.alert("Venligst udfyld alle p??kr??vede felter");
      setValidated(true);
    } else if (window.confirm("Vil du oprette dette opslag?")) {
      //skal fikses til bedre identifier
      postStore.postID = createdPost.title;
      postService.uploadPost(createdPost)
      postStore.uploadBannerImage(uploadImage);
      setDefaultState();
      setValidated(false);
    }
  };

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
              placeholder="Titel p?? stillingen"
              name="title"
              value={createdPost.title}
              required
              onChange={handleChangePost}
            ></Form.Control>

            <h3 className="form-titel-text">Stillingstype</h3>
            <Form.Select
              className="form-input"
              placeholder="v??lg stillingens type"
              name="type"
              value={createdPost.type}
              required
              onChange={handleChangePost}
            >
              <option value="">V??lg type</option>
              <option value="elev">Elev</option>
              <option value="praktik">Praktik</option>
              <option value="fuldtid">Fuldtid</option>
              <option value="deltid">Deltid</option>
            </Form.Select>

            <h3 className="form-titel-text">Firmanavn</h3>
            <Form.Control
              className="form-input"
              name="company"
              placeholder="Navn p?? firmaet"
              value={createdPost.company}
              required
              onChange={handleChangePost}
            ></Form.Control>

            <h3 className="form-titel-text">Placering</h3>
            <Form.Control
              className="form-input"
              name="location"
              placeholder="F.eks. K??benhavn"
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
              placeholder="Tilf??j beskrivelse af stilling"
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
              placeholder="Navn p?? kontaktperson"
              name="contact"
              value={createdPost.contact}
              required
              onChange={handleChangePost}
            ></Form.Control>

            <h3 className="form-titel-text">Ans??gning Email</h3>
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
              // disabled
              onChange={handleChangeImage}
            />
          </Form.Group>
        </div>
      </div>
      <div className="form-button-div">
        <Button className="preview-button" size="lg" onClick={handleShow}>
          Preview opslag
        </Button>
        <Button className="form-submit-button" type="submit" size="lg">
          Opret stilling
        </Button>
      </div>
      <Modal 
        dialogClassName="preview-post" 
        show={previewShow} 
        onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Preview over dit praktikopslag</Modal.Title>
          </Modal.Header>
            <div className="modal-container">
              <PostContent post={createdPost} review={isReview}/>
              <PostContactInfo post={createdPost}/>
            </div>
        </Modal>
    </Form>
  );
};

export default InputForm;
