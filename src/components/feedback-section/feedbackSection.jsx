import {useState, useEffect} from "react";

import { observer } from 'mobx-react';
import "./feedbackStyles.css";
 
import FeedbackCard from "./feedbackCard";
//import feedbackData from "./feedbackData";
import {feedbackStore} from "./feedbackStore";
import FeedbackInputSection from "./feedbackInputSection";


//import FeedbackService from './feedbackService';


const FeedbackSection = () => { 

    const TempInternshipId = '636a5d14775c2771061f0988';

    const [feedbacks, setFeedbacks] = useState();

    const fs = feedbackStore;


    useEffect(() => {
        fs.fetchFeedback();
        setFeedbacks(fs.feedbacks);
    }, [])

        

    console.log(feedbacks);
    //console.log(feedbackStore.res);

    
    
    return (
            <div className="">
                <h2 className="d-flex m-auto justify-content-center mx-2 mt-5 mb-4 pb-4 feedback-header">Feedback fra Tidligere Praktikanter</h2>
                {<FeedbackInputSection TempInternshipId={TempInternshipId}/>
                }
                {feedbacks?.filter((feedbacks) => feedbacks.internshipId === TempInternshipId).map((el, index) => 
                        <FeedbackCard data={el} key={index}/>
                    )}
            </div>
    );
}

export default (observer(FeedbackSection)); 