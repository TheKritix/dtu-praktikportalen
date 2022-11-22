import { useState, useEffect } from "react";

import { observer } from "mobx-react";
import "./feedbackStyles.css";

import FeedbackCard from "./feedbackCard";
import { feedbackStore } from "./feedbackStore";
import FeedbackInputSection from "./feedbackInputSection";

//import FeedbackService from './feedbackService';

const FeedbackSection = () => {
  const internshipId = "636a5d14775c2771061f0988";

  const [feedbacks, setFeedbacks] = useState([]);

  
  
  /*const fs = feedbackStore;

  useEffect(() => {
    fs.fetchFeedback();
    setFeedbacks(fs.feedbacks);
  }, [fs]);*/

  //const baseUrl = `https://api.praktikportal.diplomportal.dk/api/feedback`;
  const baseUrl = 'http://localhost:3000/api/feedback';

  useEffect(() => {
    fetch(baseUrl)
      .then((response) => response.json())
      .then((responseJson) => {
        setFeedbacks(responseJson);
      });
    // setFetchedPosts(postStore.posts);
  }, [baseUrl]);


  const relevant_feedbacks = feedbacks?.filter((feedbacks) => feedbacks.internshipId === internshipId);
  console.log(relevant_feedbacks);
  return (
    <div className="">
      <h2 className="d-flex m-auto justify-content-center mx-2 mt-5 mb-4 pb-4 feedback-header">
        Feedback fra Tidligere Praktikanter
      </h2>
      {<FeedbackInputSection internshipId={internshipId} feedbacks={relevant_feedbacks}/>}
      {relevant_feedbacks.map((el) => (
          <FeedbackCard data={el} />
        ))}
    </div>
  );
};

export default observer(FeedbackSection);