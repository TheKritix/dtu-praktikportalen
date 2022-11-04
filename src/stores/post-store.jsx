import axios from "axios";
import {runInAction, makeAutoObservable, observable, action} from "mobx";
import PostService from '../services/PostService'; 

 //source: https://mono.software/2019/04/16/async-webapi-calls-using-react-with-mobx/

// const baseUrl = process.env.NODE_ENV === 'development' ? "http://localhost:3000/":"";


class PostStore {

    posts = [];

    constructor() {
        makeAutoObservable(this, {
            posts: observable,
            getPosts: action,
        })
    }

    getPosts = async () => {
        return await axios.get(`https://api.praktikportal.diplomportal.dk/api/post`);
    }

    get = async () => {
        const response = await this.getPosts();
        this.posts = response;
        console.log(response);
    }





    // constructor() {
    //     makeAutoObservable(this);
    //     this.postService = new PostService(); 
    // }
    // postData = {
    //     model: []
    // };
    // status = "initial";
    // searchQuery = "";

    // // getPosts = () => {
    // //     try {
    // //         const data = this.postService.getPosts()
    // //             .then(
    // //             runInAction(() => {
    // //             this.postData = data;
    // //             console.log(data)
    // //         }))
    // //     } catch (error) {
    // //         runInAction(() => {
    // //             this.status = "error"; 
    // //         })
    // //     }
    // // }

    // getPostsAsync = async () => {
    //     try {
    //         const data = await this.postService.fetchPosts()
    //         runInAction(() => {
    //             this.postData = data;
    //             console.log(data)
    //         })
    //     } catch (error) {
    //         runInAction(() => {
    //             this.status = "error"; 
    //         })
    //     }
    // }

    // //todo: post, put, delete async functions
}

export const postStore = new PostStore(); 