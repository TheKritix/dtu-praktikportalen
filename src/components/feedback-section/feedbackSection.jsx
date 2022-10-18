import {useState} from "react";
import "./feedbackStyles.css";
 
import FeedbackCard from "./feedbackCard";
import feedbackData from "./feedbackData";


const FeedbackSection = () => {

    // eslint-disable-next-line no-unused-vars
    const [data, setFeedback] = useState(feedbackData);
    
    return (
            <div className="">
                <h2 className="d-flex m-auto justify-content-center mt-5">Feedback fra Tidligere Ansatte</h2>
                {data.map((el) => 
                        <FeedbackCard data={el}/>
                    )}
            </div>
    );
}

export default FeedbackSection; 