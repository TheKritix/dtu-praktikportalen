import PostContent from "../components/post-page/postContent"
import PostContactInfo from "../components/post-page/postContactInfo"
import "./postPage.css";
import postItem from "../components/post-page/postItem";
import {useState} from "react";
import FeedbackSection from "../components/feedback-section/feedbackSection"
import "../components/feedback-section/feedbackStyles.css"



const PostPage = () => {

    // eslint-disable-next-line no-unused-vars
    const [post, setPost] = useState(postItem);
    
    return (
            <div>
                <div className="post-container">
                    <PostContent post={post}/>
                    <PostContactInfo post={post}/>
                </div>
                <div className="feedback-container">
                    <FeedbackSection/>
                </div>
            </div>
    );
}

export default PostPage; 