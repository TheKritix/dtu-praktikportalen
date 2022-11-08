import PostContent from "../components/post-page/postContent";
import PostContactInfo from "../components/post-page/postContactInfo";
import "./postPage.css";
<<<<<<< HEAD
import postItem from "../components/post-page/postItem";
import {useState} from "react";
import FeedbackSection from "../components/feedback-section/feedbackSection"
import "../components/feedback-section/feedbackStyles.css"
=======
import {useState, useEffect} from "react";
import {observer} from 'mobx-react-lite';
// import { useParams } from "react-router-dom";
// import { postStore } from "../stores/post-store";
// import { fetchPosts } from "../services/PostService"


>>>>>>> 0e1ef1ccb6cdaa5814516ae4ccedc30a83937e87



const PostPage = () => {

    // const { _id } = useParams();
    // const postId = parseInt(_id); 

    //should take id from url with useParams
    const TempPostId = '63665d74b69993bfc623890a'

    // eslint-disable-next-line no-unused-vars
    const [fetchedPosts, setFetchedPosts] = useState([]);

    //Should fetch from services and store in poststore. 
    //delete eventually - use for now
    const fetchPosts = () => {
        fetch(`https://api.praktikportal.diplomportal.dk/api/post`)
        .then((response) => response.json())
        .then((responseJson) =>  {
            setFetchedPosts(responseJson);
        }) 
    }
    
    
    useEffect(() => {
        fetchPosts()
        // setFetchedPosts(postStore.posts);
    }, [])
    
    return (
<<<<<<< HEAD
            <div>
=======
        <>
            {fetchedPosts?.filter((posts) => posts._id === TempPostId).map((post, i) => (
>>>>>>> 0e1ef1ccb6cdaa5814516ae4ccedc30a83937e87
                <div className="post-container">
                    <PostContent post={post}/>
                    <PostContactInfo post={post}/>
                </div>
<<<<<<< HEAD
                <div className="feedback-container">
                    <FeedbackSection/>
                </div>
            </div>
=======
                ))
            }
        </>
>>>>>>> 0e1ef1ccb6cdaa5814516ae4ccedc30a83937e87
    );

}

export default observer(PostPage);
