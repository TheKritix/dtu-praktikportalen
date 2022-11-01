import axios from "axios";

const ApiUrl = "https://api.praktikportal.diplomportal.dk/api/post"

class PostService {

    getPosts = () => {
        return axios.get(ApiUrl);
    };

    // get = async () => {
    //     const options = {
    //         method: "GET",
    //     }

    //     //keep this for later (fetchings specific posts)
    //     //const request = new Request(ApiUrl + "?" + urlParams, options);
        
    //     const request = new Request(ApiUrl, options);
    //     const response = await fetch(request);
    //     return response.json();
    // }

    // //todo: post

    // //todo: put

    // //todo: delete
}

export default PostService;