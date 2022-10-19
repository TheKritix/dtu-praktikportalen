import {useState} from "react";
import { observer, inject } from 'mobx-react';
import "./feedbackStyles.css";
 
import FeedbackCard from "./feedbackCard";
import feedbackData from "./feedbackData";
import FeedbackStore from "./feedbackData";

import FeedbackService from './feedbackService';


function feedback(){

}

const FeedbackSection = () => {

    // eslint-disable-next-line no-unused-vars
    //console.log(this.props.FeedbackStore.getFeedbackAsync());
    //const feedbackStore = new FeedbackStore();
    //feedbackStore.getFeedbackAsync();
    const fs = new FeedbackService();

    const response = fs.get()

    const [data, setFeedback] = useState(feedbackData);

    
    return (
            <div className="">
                <h2 className="d-flex m-auto justify-content-center mt-5">Feedback fra Tidligere Praktikanter</h2>
                {data.map((el) => 
                        <FeedbackCard data={el}/>
                    )}
            </div>
    );
}

export default (observer(FeedbackSection)); 