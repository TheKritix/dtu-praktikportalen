import {runInAction, makeAutoObservable, observable} from "mobx";
import PostService from '../services/PostService'; 

 //source: https://mono.software/2019/04/16/async-webapi-calls-using-react-with-mobx/

// const baseUrl = process.env.NODE_ENV === 'development' ? "http://localhost:3000/":"";


class PostStore {
    constructor() {
        makeAutoObservable(this);
        this.postService = new PostService(); 
    }
    postData = {
        model: []
    };
    status = "initial";
    searchQuery = "";

    getPosts = () => {
        try {
            const data = this.postService.getPosts();
            runInAction(() => {
                this.postData = data;
                console.log(data)
            });
        } catch (error) {
            runInAction(() => {
                this.status = "error"; 
            })
        }
    }

    getPostsAsync = async () => {
        try {
            const data = await this.postService.getPosts();
            runInAction(() => {
                this.postData = data;
                console.log(data)
            });
        } catch (error) {
            runInAction(() => {
                this.status = "error"; 
            })
        }
    }

    //todo: post, put, delete async functions
}

export const postStore = new PostStore(); 