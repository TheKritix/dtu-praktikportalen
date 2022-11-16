const url = 'http://localhost:3000/api/feedback'

class FeedbackService {
    
    get = async () => {
        const options = {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                }
        }
     const request = new Request(url, options); 
     debugger;
     console.log(request);
     const response = await fetch(request);
     console.log(response);
     return response;
    }
    post = async (model) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        var options = {
            method: "POST",
            headers,
            body: JSON.stringify(model)
        }
        const request = new Request(url, options);
        const response = await fetch(request);
        return response;
    }
    put = async (model) => {
        const headers = new Headers()
        headers.append("Content-Type", "application/json");
        var options = {
            method: "PUT",
            headers,
            body: JSON.stringify(model)
        }
        const request = new Request(url, options);
        const response = await fetch(request);
        return response;
    }
    delete = async (id) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const options = {
            method: "DELETE",
            headers
        }
        const request = new Request(url + "/" + id, options);
        const response = await fetch(request);
        return response;
    }
}
    export default FeedbackService;