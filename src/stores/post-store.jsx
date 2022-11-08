import axios from "axios";
import {makeAutoObservable, observable, action, runInAction} from "mobx";
import {fetchPosts} from '../services/PostService'; 

 //source: https://mono.software/2019/04/16/async-webapi-calls-using-react-with-mobx/

// const baseUrl = process.env.NODE_ENV === 'development' ? "http://localhost:3000/":"";
const TestApi = "http://localhost:3000/api/post"

class PostStore {

    posts = [];

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
        this.getPosts();
    }

    getPosts = () => {
        try {
            const data = fetchPosts()
            .then(
            runInAction(() => {
                this.posts = data;
                console.log(data)
            }))
        } catch (error) {
            runInAction(() => {
                this.status = "error"; 
            })
        }
    }

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