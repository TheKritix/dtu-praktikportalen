import {makeAutoObservable, runInAction} from "mobx";

const baseUrl = process.env.NODE_ENV === 'development' ?  "http://localhost:8080/":""; //Check if dev environment

class InternshipListStore {
    internships = [
        {
            id: 1,
            title: "Cleaning assistant in the DTU cafeteria",
            description: "The DTU cafeteria is looking for a new cleaning assistant to get rid of disgusting grease stains",
            startDate: "24/12/2022",
            location: "Danmark",
            compensation: "no_salary",
            hasApplied: false,
            socialBenefits: ["fridaybar", "lunch"]
        },
        {
            id: 2,
            title: "Fiskehandler hos Byens FiSK",
            description: "Vi mangler en ny kollega til at skære grimasser i fiskehoveder. OG det gør vi bare! Vi bliver superglade for at få dig med :D",
            startDate: "24/12/2022",
            location: "Sverige",
            compensation: "parttime_salary",
            hasApplied: true,
            socialBenefits: ["lunch"]
        }
    ]

    constructor() {
        makeAutoObservable(this,
            {},
            {autoBind:true}//For non-arrow-functions bind
        )
    }

    addInternship = (internship)=> {
        this.internships.push(internship);
    }

    fetchInternships (){
        fetch(baseUrl + "api/giraffes").then(
            (response)=> response.json().then(
                (json)=> runInAction(()=>this.internships=json)
            )
        )
    }

}

export const internshipListStore = new InternshipListStore();