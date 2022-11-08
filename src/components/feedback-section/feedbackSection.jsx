import {useState, useEffect} from "react";

import { observer } from 'mobx-react';
import "./feedbackStyles.css";
 
import FeedbackCard from "./feedbackCard";
//import feedbackData from "./feedbackData";
import {feedbackStore} from "./feedbackStore";
import FeedbackInputSection from "./feedbackInputSection";


//import FeedbackService from './feedbackService';


const FeedbackSection = () => { 

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
                <h2 className="d-flex m-auto justify-content-center mt-5 mb-5">Feedback fra Tidligere Praktikanter</h2>
                {<FeedbackInputSection/>
                }
                {feedbacks?.map((el) => 
                        <FeedbackCard data={el}/>
                    )}
            </div>
    );
}

export default (observer(FeedbackSection)); 