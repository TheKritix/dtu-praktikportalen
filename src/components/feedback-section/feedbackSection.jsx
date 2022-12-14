import { useState, useEffect } from "react";

import { observer } from "mobx-react";
import "./feedbackStyles.css";

import FeedbackCard from "./feedbackCard";
import { feedbackStore } from "../../stores/feedbackStore";
import FeedbackInputSection from "./feedbackInputSection";

const FeedbackSection = (internshipId) => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fs = feedbackStore;
    const getFeedback = () => {
      fs.fetchFeedback().then(() => {
        setFeedbacks(
          fs.feedbacks.filter(
            (feedbacks) => feedbacks.internshipId === internshipId.internshipId
          )
        );
      });
    };
    getFeedback();
  }, [internshipId.internshipId]);

  return (
    <div className="">
      <h2 className="d-flex m-auto justify-content-center mx-2 mt-5 mb-4 pb-4 feedback-header">
        Feedback fra Tidligere Praktikanter
      </h2>
      {
        <FeedbackInputSection
          internshipId={internshipId.internshipId}
          feedbacks={feedbacks}
        />
      }
      {feedbacks.map((el) => (
        <FeedbackCard data={el} />
      ))}
    </div>
  );
};

export default observer(FeedbackSection);
