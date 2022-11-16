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
  }, []);


  const relevant_feedbacks = feedbacks?.filter((feedbacks) => feedbacks.internshipId === internshipId);

  return (
    <div className="">
      <h2 className="d-flex m-auto justify-content-center mx-2 mt-5 mb-4 pb-4 feedback-header">
        Feedback fra Tidligere Praktikanter
      </h2>
      {<FeedbackInputSection internshipId={internshipId} feedbacks={relevant_feedbacks} />}
      {relevant_feedbacks.map((el) => (
          <FeedbackCard data={el} />
        ))}
    </div>
  );
};

export default observer(FeedbackSection);
