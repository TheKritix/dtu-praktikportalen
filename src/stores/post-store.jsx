import { makeAutoObservable } from "mobx";

const baseUrl = process.env.NODE_ENV === 'development' ? "http://localhost:3000/":"";

class PostStore {
    //needs fixing/revising
    posts = [
        {  
            postId: "1",
            createdAtDate: "25-09-2022",
            position: "Studentermedhjælper",
            type: "Praktik",
            description: "Vi leder efter en studentmedhjælper der kan smørre madder og lave kaffe",
            //bannerImg: bannerPlaceholder,
            location: "København",
            country: "Denmark",
            timeframe: "Oktober 2022",
            company: "firma.com",
            contact: "Per Son",
            phonenumber: "10203040",
            email: "person@mail.com"
        }
    ]

    constructor() {
        makeAutoObservable(this,
            {},
            {autoBind:true}
        )
    }

    //todo: fetch post

    //todo: fetch post

    //todo: delete post

    //todo: edit post 
}