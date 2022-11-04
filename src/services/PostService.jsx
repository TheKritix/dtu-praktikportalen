import axios from "axios";

const ApiUrl = "https://api.praktikportal.diplomportal.dk/api/post"

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

    export const fetchPosts = () => {
        fetch(`https://api.praktikportal.diplomportal.dk/api/post`)
        .then((response) => response.json())
        .then((responseJson) =>  {
            //Temporary: should instead fetch only one object identified with useParams();
            console.log(responseJson[0]);
            return responseJson[0];
        }) 
    }

    // //todo: post

    // //todo: put

    // //todo: delete

const postService = {
    fetchPosts,
};

export default postService;