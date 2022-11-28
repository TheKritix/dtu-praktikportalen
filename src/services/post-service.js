import axios from "axios";
import authHeader from "./auth-header";

// const Api = "http://localhost:3000/api/"
// const TestApi = "http://localhost:3000/api/post"
// const BannerApi = "http://localhost:3000/api/bannerImage"
// const ApiUrl = "https://api.praktikportal.diplomportal.dk/api/post"

const API_URL = process.env.REACT_APP_API_LOCAL;

    export const fetchPosts = () => {
    axios.get(API_URL + "post").then((response) => {
            console.log(response.data);
            return response.data;
        });
    };

    export const getAllPosts = (params) => {
        return axios.get(API_URL + "post", { params });
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

    //(post, image)
    //formData.append(post._id, image);
    export const uploadBannerImage = (post, image) => {
        var formData = new FormData(); 
        formData.append(post, image);
        console.log(formData);
        return axios.put(API_URL + "bannerImage", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    export const getBannerImage = (post) => {
        return axios
            .get(API_URL + `bannerImage/${post.bannerImageID}`, {
                header: authHeader(),
                responseType: "blob"
            })
            .then((response) => {
                return response
            })
    }

    // //todo: put

    // //todo: delete

const postService = {
    // fetchPosts,
    // getPosts,
    uploadPost,
    uploadBannerImage,
    getBannerImage
};

export default postService;