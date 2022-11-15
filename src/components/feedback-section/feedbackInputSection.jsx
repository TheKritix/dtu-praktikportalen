import "./feedbackStyles.css";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { feedbackStore } from "./feedbackStore";
import Button from "react-bootstrap/Button";

//XXXX Bootstrap XXXX
import "bootstrap/dist/css/bootstrap.min.css";

const FeedbackInputSection = ({ internshipId }) => {
  const fs = feedbackStore;

  console.log("INTERNSHIP ID:");
  console.log(internshipId);

  //const internship = internshipId;

  const defaultFeedback = () => ({
    firstName: "testName",
    lastName: "testSurname",
    postedAt: "2022-01-01",
    text: "",
    ratingOutOfFive: "",
    internshipId: internshipId,
  });

  const [newFeedback, setNewFeedback] = useState(defaultFeedback);
  const [validated, setValidated] = useState(false);

  const changeFeedback = (e) => {
    setNewFeedback({
      ...newFeedback,
      [e.target.name]: e.target.value,
    });
  };

  const setDefaultState = () => {
    setNewFeedback(defaultFeedback);
  };

  const postFeedback = (e) => {
    console.log(newFeedback);
    e.preventDefault();
    if (newFeedback.text === "" || newFeedback.ratingOutOfFive === "") {
      e.stopPropagation();
      window.alert("Venligst udfyld alle påkrævede felter");
      setValidated(true);
    } else if (window.confirm("Vil du oprette dette opslag?")) {
      fs.postFeedback(newFeedback);
      console.log(newFeedback);
      setDefaultState();
      setValidated(false);
    }
  };

  return (
    <Form
      className="feedback-input-container"
      noValidate
      validated={validated}
      onSubmit={postFeedback}
    >
      <div className="feedback-input-content">
        <Form.Group>
          <h3 className="feedback-input-header">XX ud af XX anmeldelser</h3>
          <Form.Control
            className="text-input"
            placeholder="Giv feedback"
            name="text"
            value={newFeedback.text}
            required
            onChange={changeFeedback}
          ></Form.Control>
          <Form.Select
            className="rating-input"
            placeholder="Vælg rating"
            name="ratingOutOfFive"
            value={newFeedback.ratingOutOfFive}
            required
            onChange={changeFeedback}
          >
            <option value="">Rating</option>
            <option value="1">1 stjerne</option>
            <option value="2">2 stjerner</option>
            <option value="3">3 stjerner</option>
            <option value="4">4 stjerner</option>
            <option value="5">5 stjerner</option>
          </Form.Select>
        </Form.Group>
      </div>
      <div className="submit-feedback-button-container">
        <Button className="submit-feedback-button" type="submit" size="lg">
          Indsend feedback
        </Button>
      </div>
    </Form>
  );
};

export default FeedbackInputSection;
