import PostContent from "../components/post-page/postContent";
import PostContactInfo from "../components/post-page/postContactInfo";
import "./postPage.css";
import {useState, useEffect} from "react";
import {observer} from 'mobx-react-lite';
import FeedbackSection from '../components/feedback-section/feedbackSection';
// import { useParams } from "react-router-dom";
import { postStore } from "../stores/post-store";
// import { fetchPosts } from "../services/PostService"





const PostPage = () => {
    
    // const { _id } = useParams();
    // const postId = parseInt(_id); 

    //should take id from url with useParams
    const TempPostId = '63665d74b69993bfc623890a'
    const TempPostId2 = '637765dfbda9c12623b36d0a'

    const store = postStore;

    // eslint-disable-next-line no-unused-vars
     const [fetchedPosts, setFetchedPosts] = useState([]);
    
    // useEffect(() => {
    //     store.fetchPost();
    //     setFetchedPosts(store.posts);
    // }, [])

    const getPost = () => {
        store.fetchPosts().then(() => {
          setFetchedPosts(store.posts);
        });
        
      };
    
      useEffect(() => {
        getPost();
      }, []);
    
    return (
        <div>
            {fetchedPosts?.filter((posts) => posts._id === TempPostId2).map((post, i) => (
                <div className="post-container">
                    <PostContent post={post}/>
                    <PostContactInfo post={post}/>
                </div>
                ))
            }
            <div><FeedbackSection/></div>
            
        </div>
    );

}

export default PostPage;
