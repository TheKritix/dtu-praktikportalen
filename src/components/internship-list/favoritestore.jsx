import {makeAutoObservable, runInAction} from "mobx";
import axios from "axios";
import {profileStore} from "../../stores/profileStore";
import authHeader from "../../services/auth-header";

//TODO("Ombyt")
//const baseUrl = process.env.NODE_ENV === 'development' ?  "https://api.praktikportal.diplomportal.dk/":""; //Check if dev environment
const baseUrl = process.env.NODE_ENV === 'development' ?  "http://localhost:3000/":""; //Check if dev environment

class FavoriteStore {
    favorites = []

    constructor() {
        makeAutoObservable(this,{},{autoBind:true})
    }

    addFavorite = (postID) => {
        return axios.post(baseUrl +"api/favorite",{
            uid: profileStore.user.id,
            favorite: postID
        }, { headers: authHeader()})
    }

    deleteFavorite = (user, postID) => {
        const thingyIWantToSend = {
            uid: user.id,
            favorite: postID
        }
        console.log("OMEGA SHIT")
        return axios.put(baseUrl + "api/favorite", thingyIWantToSend, { headers: authHeader() })
    }

    async fetchFavorite (){
        await axios.get(baseUrl + "api/favorite", { headers: authHeader() }).then((response) => {
            this.favorites = response.data;
        })
    }

}

export const favoriteStore = new FavoriteStore();