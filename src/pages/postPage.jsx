import PostContent from "../components/post-page/postContent"
import PostContactInfo from "../components/post-page/postContactInfo"
import "./postPage.css";
import postItem from "../components/post-page/postItem";
import {useState, useEffect, Component} from "react";
import {observer} from 'mobx-react-lite';
import {postStore} from "../stores/post-store";


const PostPage = () => {

    const [postApi, setPostApi] = useState([{}]);


    //delete eventually - use for now
    const fetchPosts = () => {
        fetch(`https://api.praktikportal.diplomportal.dk/api/post`)
        .then((response) => response.json())
        .then((responseJson) =>  {
            setPostApi(responseJson);
            console.log(postApi)
        }) 
    }

    useEffect(() => {
        //postStore.getPostsAsync()
        fetchPosts();
    }, [])



    // eslint-disable-next-line no-unused-vars
    const [post, setPost] = useState(postItem);
    
    return (
            <div className="post-container">
                <PostContent post={postApi}/>
                <PostContactInfo post={post}/>
            </div>
    );

}

export default observer(PostPage);