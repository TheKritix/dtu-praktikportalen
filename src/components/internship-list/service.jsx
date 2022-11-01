const apiUrl = "https://api.praktikportal.diplomportal.dk/api/post"

class UrlService {
    get = async(urlParams) => {
        const options = {
            method: "GET",
        }
        const request = new Request(apiUrl + "?" + urlParams, options)
        const response = await fetch(request)
        return response.json()
    }
}

export default UrlService