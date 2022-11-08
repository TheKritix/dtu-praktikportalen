import FeedbackService from './DEPRECATEDfeedbackService';

import { makeAutoObservable, observable, runInAction, decorate } from 'mobx';
import axios from 'axios';

//const baseUrl = process.env.NODE_ENV === 'development' ?  "http://localhost:3000/":""; //Check if dev environment



const baseUrl = `https://api.praktikportal.diplomportal.dk/api/feedback`;
//const baseUrl = 'http://localhost:3000/api/feedback';
console.log(baseUrl)

class FeedbackStore {

  constructor() {
    makeAutoObservable(this,
        {},
        {autoBind:true}//For non-arrow-functions bind
    )


    
  }

  /*fetchFeedback = async () => {
    try {
      const response = await fetch(baseUrl, {mode:'cors'});
      const data = await response.json();
      this.res = data;
      console.log({ data })
    }
    catch (e) {
      console.log(e)
    }
  }*/
  /*fetchFeedback = () => {
    fetch(baseUrl)
        .then((response) => response.json())
        .then((responseJson) =>  {
            this.feedbacks = responseJson;
        }) 
  }*/
  fetchFeedback = async () => {
    try {
      const response = await fetch(baseUrl, {mode:'cors'});
      const data = await response.json();
      this.feedbacks = data;
      //console.log({ data })
    }
    catch (e) {
      console.log(e)
    }
  }

  


}

//export default feedbackData;
//export default new FeedbackStore();
export const feedbackStore = new FeedbackStore();