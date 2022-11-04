import axios from "axios";

const ApiUrl = "https://api.praktikportal.diplomportal.dk/api/post"


    // export const fetchPosts = () => {
    //     axios.get(ApiUrl)
    //     .then((response) => {
    //         console.log(response.data)
    //         return response.data
    //     })     
    // } 
    



    //more values to be added
    export const uploadPost = (post) => {
        return axios.post(ApiUrl, {
            company: post.company,
            location: post.location,
            description: post.description,
        });
    };

    // //todo: put

    // //todo: delete

const postService = {
    //fetchPosts,
    uploadPost
};

export default postService;