import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

import authHeader from "../services/auth-header";
import {profileStore} from "./profileStore";


//const baseUrl = process.env.NODE_ENV === 'development' ?  "http://localhost:3000/":""; //Check if dev environment
//const baseUrl = `https://api.praktikportal.diplomportal.dk/api/feedback`;
const baseUrl = 'http://localhost:3000/api/feedback';


class FeedbackStore {
  constructor() {
    makeAutoObservable(
      this,
      {},
      { autoBind: true }
    );
  }

  
  async fetchFeedback() {
    await fetch(baseUrl)
      .then((response) => response.json())
      .then((responseJson) => {
        this.feedbacks=responseJson;

      });
  };

  postFeedback = (feedback) => {
    const name_arr = profileStore.user.name.split(' ');
    const firstName = name_arr[0];
    const lastName = profileStore.user.name.replace(firstName, '');
    var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/" 
                  + currentdate.getFullYear() + " @ "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes()
    return axios.post(baseUrl, {
      firstName: firstName,
      lastName: lastName,
      postedAt: datetime,
      text: feedback.text,
      ratingOutOfFive: feedback.ratingOutOfFive,
      internshipId: feedback.internshipId,
    }, { headers: authHeader()});
  };

}

export const feedbackStore = new FeedbackStore();