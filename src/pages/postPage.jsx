import PostContent from "../components/post-page/postContent";
import PostContactInfo from "../components/post-page/postContactInfo";
import "./postPage.css";
import {useState, useEffect} from "react";
import FeedbackSection from '../components/feedback-section/feedbackSection';
// import { useParams } from "react-router-dom";
import { postStore } from "../stores/post-store";
// import { fetchPosts } from "../services/PostService"





const PostPage = () => {
    
    // const { _id } = useParams();
    // const postId = parseInt(_id); 

    //should take id from url with useParams
    // eslint-disable-next-line no-unused-vars
    const TempPostId = '63665d74b69993bfc623890a'
    const TempPostId2 = '637805eccc1e18b7cc68ecb2'

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
      console.log(fetchedPosts)
    }, []);
    
    return (
        <div>
            {fetchedPosts?.filter((posts) => posts._id === TempPostId2).map((post, i) => (
                <div className="post-container">
                    <PostContent post={post} review={false}/>
                    <PostContactInfo post={post}/>
                </div>
                ))
            }
            <div><FeedbackSection/></div>
            
        </div>
    );

}

export default PostPage;
