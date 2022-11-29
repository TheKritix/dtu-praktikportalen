import { makeAutoObservable } from "mobx";
import axios from "axios";
import { profileStore } from "./profileStore";
import authHeader from "../services/auth-header";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? "https://api.praktikportal.diplomportal.dk/"
    : ""; //Check if dev environment
//const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000/" : ""; //Check if dev environment

class FavoriteStore {
  favorites = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  addFavorite = (postID) => {
    return axios.post(
      baseUrl + "api/favorite",
      {
        uid: profileStore.user.id,
        favorite: postID,
      },
      { headers: authHeader() }
    );
  };

  deleteFavorite = (user, postID) => {
    const favorite = {
      uid: user.id,
      favorite: postID,
    };
    console.log("OMEGA SHIT");
    return axios.put(baseUrl + "api/favorite", favorite, {
      headers: authHeader(),
    });
  };

  async fetchFavorite() {
    await axios
      .get(baseUrl + "api/favorite", { headers: authHeader() })
      .then((response) => {
        this.favorites = response.data;
        
      }, (error) => {
        console.log("favorites fetched");
        console.log(error);
      });
  }
}

export const favoriteStore = new FavoriteStore();
