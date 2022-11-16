import axios from "axios";

const TestApi = "http://localhost:3000/api/post"
// const ApiUrl = "https://api.praktikportal.diplomportal.dk/api/post"
const API_URL = process.env.REACT_APP_API;

export const fetchPosts = () => {
  axios.get(API_URL + "post").then((response) => {
    console.log(response.data);
    return response.data;
  });
};

//more values to be added
export const uploadPost = (post) => {
  return axios.post(API_URL + "post", {
    title: post.title,
    type: post.type,
    company: post.company,
    location: post.location,
    startdate: post.startdate,
    description: post.description,
    contact: post.contact,
    applyToEmail: post.applyToEmail,
    website: post.website,
    bannerImg: post.bannerImg,
  });
};

// //todo: put

// //todo: delete

const postService = {
  fetchPosts,
  uploadPost,
};

export default postService;
