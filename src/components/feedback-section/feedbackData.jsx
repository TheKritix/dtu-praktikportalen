import FeedbackService from './feedbackService';
import { observable, runInAction, decorate } from 'mobx';


class FeedbackStore {

  constructor(){
    this.feedbackService = new FeedbackService();
  }


  data = {
    model: []
  };
  status = 'initial';
  searchQuery = '';
  
   getFeedbackAsync = async () => {
    try {
        var params = {
            
        };
        const urlParams = new URLSearchParams(Object.entries(params));
        const data = await this.countryService.get(urlParams)
        runInAction(() => {
            this.data = data;
        });
    } catch (error) {
        runInAction(() => {
            this.status = "error";
        });
    }
  };

}


const feedbackData = [
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
];

export default feedbackData;
//export default new FeedbackStore();