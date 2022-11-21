import {makeAutoObservable, runInAction} from "mobx";

const baseUrl = process.env.NODE_ENV === 'development' ?  "https://api.praktikportal.diplomportal.dk/":""; //Check if dev environment
const testApi = "http://localhost:3000/api/post"

class InternshipListStore {
    internships = []

    constructor() {
        makeAutoObservable(this,{},{autoBind:true})
        this.fetchInternships()
    }

    addInternship = (internship)=> {
        this.internships.push(internship);
    }

    fetchInternships (){
        fetch(testApi).then(
            (response)=> response.json().then(
                (json)=> runInAction(()=>this.internships=json)
            )
        )
    }

}

export const internshipListStore = new InternshipListStore();