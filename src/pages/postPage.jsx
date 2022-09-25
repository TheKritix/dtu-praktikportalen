import { Link } from "react-router-dom";
import PostContent from "../components/post-page/postContent"
import PostContactInfo from "../components/post-page/postContactInfo"
import "./postPage.css";


const PostPage = () => {
    
    
    return (
            <div className="post-container">
                <PostContent/>
                <PostContactInfo/>
            </div>
    );
}

export default PostPage; 