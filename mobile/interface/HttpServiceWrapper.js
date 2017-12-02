
export default class HttpServiceWrapper {

    static apiBaseUrl = "http://city-surfingapi.azurewebsites.net/api"

    static post(to, json) {
        return fetch(HttpServiceWrapper.apiBaseUrl + to, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(json)
        });
    }

}