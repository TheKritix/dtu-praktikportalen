import {useState, useEffect} from "react";
import { observer, inject } from 'mobx-react';
import "./feedbackStyles.css";
 
import FeedbackCard from "./feedbackCard";
//import feedbackData from "./feedbackData";
import {feedbackStore} from "./feedbackStore";

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
                <h2 className="d-flex m-auto justify-content-center mt-5">Feedback fra Tidligere Praktikanter</h2>
                {feedbacks?.map((el) => 
                        <FeedbackCard data={el}/>
                    )}
            </div>
    );
}

export default (observer(FeedbackSection)); 