import FeedbackService from '../feedbackService';

import { makeAutoObservable, observable, runInAction, decorate } from 'mobx';
import axios from 'axios';


const baseUrl = process.env.NODE_ENV === 'development' ?  "http://localhost:3000/":""; //Check if dev environment
console.log(baseUrl)

class FeedbackStore {
  /*feedbackData = [
    {
      feedbackId: "1",
      firstName: "Victor",
      lastName: "Kongsbak",
      postedAt: "25-09-2022",
      text: "Jeg var på praktik hos XXXX sidste semester og det var blah blah blah. De var meget flexible ift. mit studie, hvilket var lækkert da jeg også havde nogle kurser samtidig. God løn.",
      ratingOutOfFive: "4"
    },
    {
      feedbackId: "2",
      firstName: "Jakob",
      lastName: "Jakobsen",
      postedAt: "25-09-2022",
      text: "Jeg var meget glad for min tid hos XXXX. Meget lærerig og spændende arbejdsplads, som gav mig meget nyttigt med",
      ratingOutOfFive: "5"
    },
    {
      feedbackId: "3",
      firstName: "Christian",
      lastName: "Chrstiansen",
      postedAt: "25-09-2022",
      text: "Jeg havde en mindre god oplevelse",
      ratingOutOfFive: "2"
    },
    {
      feedbackId: "4",
      firstName: "Peter",
      lastName: "Holt",
      postedAt: "25-09-2022",
      text: "GLAD blah blah blah blah blah blah blah blah blah blah blah blah ",
      ratingOutOfFive: "4"
    },
    {
      feedbackId: "5",
      firstName: "Matthias",
      lastName: "Svensson",
      postedAt: "25-09-2022",
      text: "Spændendne praktikplads - 5 stjerner her fra! Tak for denne gang og på gensyn!",
      ratingOutOfFive: "5"
    },
  ];*/

  constructor() {
    makeAutoObservable(this,
        {},
        {autoBind:true}//For non-arrow-functions bind
    )

    
  }

  

  /*addFeedback = (feedback) => {
    this.feedbackData.push(feedback);
  }*/

  /*fetchFeedback (){
    fetch(baseUrl + "api/feedback", {mode:'cors'}).then(
        (response)=> response.json().then(
            (json)=>  runInAction(()=>this.feedbackData=json)
        )
    )
  } */

  /*fetchTest () {
    const fs = new FeedbackService();
    const response = fs.get();
    console.log('test')
    this.response = response;
    return response;
  }*/

  fetchFeedback = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/feedback', {mode:'cors'});
      const data = await response.json();
      this.res = data;
      console.log({ data })
    }
    catch (e) {
      console.log(e)
    }
  }
  

  /*async fetchTest() {
    const url = baseUrl + "api/feedback";
    const response = await fetch(url);
    this.response = response;
    return await response.json();
  }*/



}

//export default feedbackData;
//export default new FeedbackStore();
export const feedbackStore = new FeedbackStore();