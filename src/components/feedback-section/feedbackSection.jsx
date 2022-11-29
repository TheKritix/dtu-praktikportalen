import { useState, useEffect } from "react";

import { observer } from "mobx-react";
import "./feedbackStyles.css";

import FeedbackCard from "./feedbackCard";
import { feedbackStore } from "../../stores/feedbackStore";
import FeedbackInputSection from "./feedbackInputSection";


const FeedbackSection = (internshipId) => {
  console.log("internshipId");
  console.log(internshipId);
  const [feedbacks, setFeedbacks] = useState([]);

  const fs = feedbackStore;
  const getFeedback = () => {
    fs.fetchFeedback().then(() => {
      setFeedbacks(fs.feedbacks.filter((feedbacks) => feedbacks.internshipId === internshipId.internshipId))
    })
  }

  useEffect(() =>{
    getFeedback();
  }, []);


  return (
    <div className="">
      <h2 className="d-flex m-auto justify-content-center mx-2 mt-5 mb-4 pb-4 feedback-header">
        Feedback fra Tidligere Praktikanter
      </h2>
      {<FeedbackInputSection internshipId={internshipId.internshipId} feedbacks={feedbacks}/>}
      {feedbacks.map((el) => (
          <FeedbackCard data={el} />
        ))}
    </div>
  );
};

export default observer(FeedbackSection);