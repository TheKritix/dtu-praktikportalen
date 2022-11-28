import "./feedbackStyles.css";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { feedbackStore } from "../../stores/feedbackStore";
import Button from "react-bootstrap/Button";

//XXXX Bootstrap XXXX
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

import {profileStore} from "../../stores/profileStore";


const FeedbackInputSection = ({ internshipId, feedbacks }) => {
  const fs = feedbackStore;

  const name_arr = profileStore.user.name.split(' ');
  const firstName = name_arr[0];
  const lastName = profileStore.user.name.replace(firstName, '');
  var currentdate = new Date(); 
  var datetime = currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/" 
                  + currentdate.getFullYear() + " @ "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes()

  console.log("TEST INPUT SECTION")
  console.log(datetime)


  const defaultFeedback = () => ({
    firstName: firstName,
    lastName: lastName,
    postedAt: datetime,
    text: "",
    ratingOutOfFive: "",
    internshipId: internshipId,
  });

  const [newFeedback, setNewFeedback] = useState(defaultFeedback);
  const [validated, setValidated] = useState(false);
  const [avgRating, setAverageRating] = useState();

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

  useEffect(() => {
    var total = 0;
    const amount = feedbacks.length;
    console.log('LENGTH')
    console.log(amount)
    for (let i = 0; i < feedbacks.length; i++) {
      console.log(feedbacks[i])
      const rating = parseInt(feedbacks[i].ratingOutOfFive)
      total = total + rating
    };
    const avg = total / amount;
    console.log("AVERAGE RATING:");
    console.log(avg);
    setAverageRating(avg);
  });


  return (
    <Form
      className="feedback-input-container"
      noValidate
      validated={validated}
      onSubmit={postFeedback}
    >
      <div className="feedback-input-content">
        <Form.Group>
          <h3 className="feedback-input-header"><span id="avgRating">{avgRating}</span>/5 stjerner baseret på {feedbacks.length} feedbacks</h3>
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