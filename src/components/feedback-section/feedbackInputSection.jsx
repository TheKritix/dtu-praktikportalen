import "./feedbackStyles.css";
import Form from "react-bootstrap/Form";
import {useState, useEffect} from "react";
import {feedbackStore} from "./feedbackStore";
import Button from "react-bootstrap/Button";



//XXXX Bootstrap XXXX
import 'bootstrap/dist/css/bootstrap.min.css';



const FeedbackInputSection = () => {

    const fs = feedbackStore;

    const defaultFeedback = () => ({
        firstName: "testName",
        lastName: "testSurname",
        postedAt: "2022-01-01",
        text: "",
        ratingOutOfFive: ""
    })

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
        if (
            newFeedback.text === "" ||
            newFeedback.ratingOutOfFive === ""
        ) {
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
        className="form-container"
        noValidate
        validated={validated}
        onSubmit={postFeedback}
        >
            <div className="form-content">
                <Form.Group>
                    <h3 className="form-titel-text">Jobtitel</h3>
                    <Form.Control
                    className="input"
                    placeholder="Giv feedback"
                    name="text"
                    value={newFeedback.text}
                    required
                    onChange={changeFeedback}
                    ></Form.Control>
                    <Form.Select
                    className="form-input"
                    placeholder="vælg stillingens type"
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
            <div>
                <Button className="form-submit-button" type="submit" size="lg">
                    Opret stilling
                </Button>
            </div>
        </Form>
            
    );
}

export default FeedbackInputSection; 


