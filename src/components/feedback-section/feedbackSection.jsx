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

  
  

  useEffect(() => {
    const fs = feedbackStore;
    fs.fetchFeedback();
    setFeedbacks(fs.feedbacks);
    //console.log(`fs.feedback: ${fs.feedbacks}`)
    //console.log(`Feedbacks fetched: ${feedbacks}`);
  }, []);

  
  //console.log(feedbackStore.res);

  //console.log(`feedbacks length: ${feedbacks.length}`)
  
  const total = 0;
  const avg = 0;

  const relevant_feedbacks = feedbacks?.filter((feedbacks) => feedbacks.internshipId === internshipId);
  //console.log(`Relevant feedbacks: ${relevant_feedbacks}`)


  return (
    <div className="">
      <h2 className="d-flex m-auto justify-content-center mx-2 mt-5 mb-4 pb-4 feedback-header">
        Feedback fra Tidligere Praktikanter
      </h2>
      {<FeedbackInputSection internshipId={internshipId} feedbacks={relevant_feedbacks} />}
      {feedbacks
        ?.filter((feedbacks) => feedbacks.internshipId === internshipId)
        .map((el) => (
          <FeedbackCard data={el} />
        ))}
    </div>
  );
};

export default observer(FeedbackSection);
