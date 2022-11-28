import { makeAutoObservable } from "mobx";
import axios from "axios";
import authHeader from "../services/auth-header";

//const baseUrl = process.env.NODE_ENV === 'development' ?  "http://localhost:3000/":""; //Check if dev environment
const baseUrl = `https://api.praktikportal.diplomportal.dk/api/feedback`;
//const baseUrl = 'http://localhost:3000/api/feedback';

class FeedbackStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async fetchFeedback() {
    await fetch(baseUrl)
      .then((response) => response.json())
      .then((responseJson) => {
        this.feedbacks = responseJson;
      });
  }

  postFeedback = (feedback) => {
    return axios.post(
      baseUrl,
      {
        firstName: feedback.firstName,
        lastName: feedback.lastName,
        postedAt: feedback.postedAt,
        text: feedback.text,
        ratingOutOfFive: feedback.ratingOutOfFive,
        internshipId: feedback.internshipId,
      },
      { headers: authHeader() }
    );
  };
}

export const feedbackStore = new FeedbackStore();
