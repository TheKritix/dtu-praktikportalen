import PostContent from "../components/post-page/postContent";
import PostContactInfo from "../components/post-page/postContactInfo";
import "./postPage.css";
import { useState, useEffect } from "react";
import FeedbackSection from "../components/feedback-section/feedbackSection";
import { useParams } from "react-router-dom";
import { postStore } from "../stores/post-store";
// import { fetchPosts } from "../services/PostService"

const PostPage = () => {
  const postId = useParams();
  const store = postStore;

  // eslint-disable-next-line no-unused-vars
  const [fetchedPosts, setFetchedPosts] = useState([]);

  const getPost = () => {
    store.fetchPosts().then(() => {
      setFetchedPosts(
        store.posts.filter((posts) => posts._id === postId.postId)
      );
    });
  };

  useEffect(() => {
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {fetchedPosts?.map((post, i) => (
        <div className="post-container">
          <PostContent post={post} review={false} />
          <PostContactInfo post={post} />
        </div>
      ))}
      <div>
        <FeedbackSection internshipId={postId.postId} />
      </div>
    </div>
  );
};

export default PostPage;
