import {makeAutoObservable} from "mobx";
import postService from '../services/post-service'; 

//source: https://mono.software/2019/04/16/async-webapi-calls-using-react-with-mobx/

// const baseUrl = process.env.NODE_ENV === 'development' ? "http://localhost:3000/":"";
// const TestApi = "http://localhost:3000/api/post"
const API_URL = process.env.REACT_APP_API_LOCAL;

class PostStore {

    posts;
    selectedPost;
    postID;
    bannerImageID; 
    bannerImage;
    bannerImageListIDs = [];
    bannerImageList = [];

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    async fetchPosts() {
        await fetch(API_URL + "post")
                .then((response) => response.json())
                .then((responseJson) => {
                this.posts = responseJson;
            })
    }


    async uploadBannerImage(file) {
        await postService.uploadBannerImage(this.postID, file);
    }

    async fetchBannerImage(post) {
        await postService.getBannerImage(post).then((response) => {
            this.bannerImage = URL.createObjectURL(new Blob([response.data]));
        })
    }

    async fetchAllBannerImages(post) {
        await postService.getBannerImage(post).then((response) => {
            this.bannerImageList.push(post.bannerImageID)
            this.bannerImageList.push(URL.createObjectURL(new Blob([response.data])));
        })
    }

    // //todo: put, delete async functions
}

export const postStore = new PostStore(); 