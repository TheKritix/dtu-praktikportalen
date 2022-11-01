import {useState} from "react";
import { observer, inject } from 'mobx-react';
import "./feedbackStyles.css";
 
import FeedbackCard from "./feedbackCard";
//import feedbackData from "./feedbackData";
import {feedbackStore} from "./feedbackData";

//import FeedbackService from './feedbackService';


const FeedbackSection = () => {

    feedbackStore.fetchFeedback();

    console.log(feedbackStore.res);
    
    return (
            <div className="">
                <h2 className="d-flex m-auto justify-content-center mt-5">Feedback fra Tidligere Praktikanter</h2>
                {feedbackStore.res.map((el) => 
                        <FeedbackCard data={el}/>
                    )}
            </div>
    );
}

export default (observer(FeedbackSection)); 