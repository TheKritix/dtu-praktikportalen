import { makeAutoObservable, runInAction } from "mobx";

const baseUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:3000/" : ""; //Check if dev environment

const API_URL = process.env.REACT_APP_API;
class InternshipListStore {
  internships = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.fetchInternships();
  }

  addInternship = (internship) => {
    this.internships.push(internship);
  };

  fetchInternships() {
    fetch(API_URL + "post").then((response) =>
      response
        .json()
        .then((json) => runInAction(() => (this.internships = json)))
    );
  }
}

export const internshipListStore = new InternshipListStore();
