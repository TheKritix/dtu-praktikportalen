import PostContent from "../components/post-page/postContent"
import PostContactInfo from "../components/post-page/postContactInfo"
import "./postPage.css";
import {useState, useEffect, Component} from "react";
import {observer} from 'mobx-react-lite';
import {postStore} from "../stores/post-store";
import {fetchPosts} from '../services/PostService'; 



const PostPage = () => {


    //should take from url - useParams
    const TempPostId = '6360cebb89372848cb7d162c'
    // eslint-disable-next-line no-unused-vars
    const [fetchedPosts, setFetchedPosts] = useState([]);

    //Should fetch from services and store in poststore. 
    //delete eventually - use for now
    const fetchPosts = () => {
        fetch(`https://api.praktikportal.diplomportal.dk/api/post`)
        .then((response) => response.json())
        .then((responseJson) =>  {
            setFetchedPosts(responseJson);
            console.log(responseJson);
        }) 
    }

    
    useEffect(() => {   
        fetchPosts();
        //setFetchedPosts(fetchPosts());
        console.log(fetchedPosts)
    }, [])
    
    return (
        <>
            {fetchedPosts.filter((posts) => posts._id === TempPostId).map((post) => (
                <div className="post-container">
                    <PostContent post={post}/>
                    <PostContactInfo post={post}/>
                </div>
                ))
            }
        </>
    );

}

export default observer(PostPage);