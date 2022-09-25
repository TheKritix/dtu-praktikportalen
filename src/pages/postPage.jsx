import { Link } from "react-router-dom";
import PostContent from "../components/post-page/postContent"
import PostContactInfo from "../components/post-page/postContactInfo"
import "./postPage.css";
import postItem from "../components/post-page/postItem";
import {useState} from "react";


const PostPage = () => {

    const [post,setPost] = useState(postItem);
    
    return (
            <div className="post-container">
                <PostContent post={post}/>
                <PostContactInfo post={post}/>
            </div>
    );
}

export default PostPage; 