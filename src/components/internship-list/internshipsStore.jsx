import { observable, runInAction, decorate} from "mobx";
import UrlService from "./service"

class InternshipsStore {
    constructor() {
        this.urlService = new UrlService()
    }
    internshipData = {
        model: []
    }
    status = "initial"
    searchQuery = "";

    fetchInternships = async () => {
        try {
            var params = {

            }
        }
    }
}