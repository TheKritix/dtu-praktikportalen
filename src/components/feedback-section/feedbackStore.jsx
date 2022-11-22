import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

//const baseUrl = process.env.NODE_ENV === 'development' ?  "http://localhost:3000/":""; //Check if dev environment
//const baseUrl = `https://api.praktikportal.diplomportal.dk/api/feedback`;
const baseUrl = 'http://localhost:3000/api/feedback';


class FeedbackStore {
  constructor() {
    makeAutoObservable(
      this,
      {},
      { autoBind: true } //For non-arrow-functions bind
    );
    this.fetchFeedback();

  }

  
  fetchFeedback = () => {
    fetch(baseUrl)
      .then((response) => response.json())
      .then((responseJson) => {
        runInAction(()=>this.feedbacks=responseJson)
        //this.feedbacks = responseJson;
        //console.log(`feedbackStore res: ${this.feedbacks}`)
      });
  };

  postFeedback = (feedback) => {
    return axios.post(baseUrl, {
      firstName: feedback.firstName,
      lastName: feedback.lastName,
      postedAt: feedback.postedAt,
      text: feedback.text,
      ratingOutOfFive: feedback.ratingOutOfFive,
      internshipId: feedback.internshipId,
    });
  };

}

export const feedbackStore = new FeedbackStore();