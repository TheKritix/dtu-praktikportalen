import {makeAutoObservable, runInAction} from "mobx";
import axios from "axios";
import {profileStore} from "../../stores/profileStore";

//const baseUrl = process.env.NODE_ENV === 'development' ?  "https://api.praktikportal.diplomportal.dk/":""; //Check if dev environment
const baseUrl = process.env.NODE_ENV === 'development' ?  "http://localhost:3000/":""; //Check if dev environment

class FavoriteStore {
    favorites = []

    constructor() {
        makeAutoObservable(this,{},{autoBind:true})
        this.fetchFavorite()
    }

    addFavorite = (postID) => {
        return axios.post(baseUrl +"api/favorite", {
            uid: profileStore.user.id,
            favorite: postID
        })
        //this.internships.push(favorite);
    }

    fetchFavorite (){
        fetch(baseUrl + "api/favorite").then(
            (response)=> response.json().then(
                (json)=> runInAction(()=>this.favorites=json)
            )
        )
    }

}

export const favoriteStore = new FavoriteStore();