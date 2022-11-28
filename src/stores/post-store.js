import {makeAutoObservable} from "mobx";
import postService from '../services/post-service'; 

//source: https://mono.software/2019/04/16/async-webapi-calls-using-react-with-mobx/

// const baseUrl = process.env.NODE_ENV === 'development' ? "http://localhost:3000/":"";
const TestApi = "http://localhost:3000/api/post"

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

       //burde bruge den her, men virker ikke helt
    // async fetchPost() {
    //     await postService.fetchPosts().then((response) => {
    //         this.posts = response;
    //     })
    // }

    async fetchPosts() {
        await fetch(TestApi)
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

    // //todo: post, put, delete async functions
}

export const postStore = new PostStore(); 