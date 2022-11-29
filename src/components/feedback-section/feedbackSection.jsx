import { useState, useEffect } from "react";

import { observer } from "mobx-react";
import "./feedbackStyles.css";

import FeedbackCard from "./feedbackCard";
import { feedbackStore } from "../../stores/feedbackStore";
import FeedbackInputSection from "./feedbackInputSection";


//import FeedbackService from './feedbackService';

const FeedbackSection = (internshipId) => {
  //const internshipId = "636a5d14775c2771061f0988";
  console.log("internshipId");
  console.log(internshipId);
  const [feedbacks, setFeedbacks] = useState([]);


  //const baseUrl = `https://api.praktikportal.diplomportal.dk/api/feedback`;
  //const baseUrl = 'http://localhost:3000/api/feedback';
  const fs = feedbackStore;
  const getFeedback = () => {
    fs.fetchFeedback().then(() => {
      setFeedbacks(fs.feedbacks.filter((feedbacks) => feedbacks.internshipId === internshipId.internshipId))
    })
  }
  /*useEffect(() => {
    fetch(baseUrl)
      .then((response) => response.json())
      .then((responseJson) => {
        setFeedbacks(responseJson);
      });
    // setFetchedPosts(postStore.posts);
  }, []);*/
  useEffect(() =>{
    getFeedback();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  //const relevant_feedbacks = feedbacks?.filter((feedbacks) => feedbacks.internshipId === internshipId.internshipId);
  //console.log(relevant_feedbacks);
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