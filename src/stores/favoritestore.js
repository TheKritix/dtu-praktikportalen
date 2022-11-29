import { makeAutoObservable } from "mobx";
import axios from "axios";
import { profileStore } from "./profileStore";
import authHeader from "../services/auth-header";
/*
const baseUrl =
  //process.env.NODE_ENV === "development"
    ? "https://api.praktikportal.diplomportal.dk/"
    : ""; //Check if dev environment
*/
//const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "" //Check if dev environment
const baseUrl = process.env.REACT_APP_API

class Favoritestore {
  favorites = []

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  addFavorite = (postID) => {
    return axios.post(
      baseUrl + "favorite",
      {
        uid: profileStore.user.id,
        favorite: postID,
      },
      { headers: authHeader() }
    )
  }

  deleteFavorite = (user, postID) => {
    const favorite = {
      uid: user.id,
      favorite: postID,
    }
    return axios.put(baseUrl + "favorite", favorite, {
      headers: authHeader(),
    })
  }

  async fetchFavorite() {
    await axios
      .get(baseUrl + "favorite", { headers: authHeader() })
      .then((response) => {
        this.favorites = response.data
        
      }, (error) => {
        console.log("favorites fetched")
        console.log(error)
      })
  }
}

export const favoriteStore = new Favoritestore()
