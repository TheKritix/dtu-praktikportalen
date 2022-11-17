import axios from "axios";
import authHeader from "./auth-header";

const TestApi = "http://localhost:3000/api/post"
// const ApiUrl = "https://api.praktikportal.diplomportal.dk/api/post"

    // const fetchPosts = async () => {
    //     const response = await axios.get(TestApi, { headers: authHeader() });
    //     return response;     
    // }
    
    // export const getPosts = () => {
    //     fetch(TestApi)
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             return responseJson;
    //         })
    // }
    

    //more values to be added
    export const uploadPost = (post) => {
        return axios.post(TestApi, {
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

    export const uploadBannerImage = (post, image) => {
        var formData = new FormData(); 
        formData.append(post._id, image);
        console.log(formData);
        return axios.put(TestApi, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    // //todo: put

    // //todo: delete

const postService = {
    fetchPosts,
    getPosts,
    uploadPost,
    uploadBannerImage
};

export default postService;