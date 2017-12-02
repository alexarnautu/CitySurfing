import {ToastAndroid} from 'react-native'

export default class AuthenticationService {

    static apiBaseUrl = "http://city-surfingapi.azurewebsites.net/api"

    constructor(options = {}) {

        var identity = () => {};
        var scope = options.scope || this;

        this.loginSuccess = (options.loginSuccess || identity).bind(scope);
        this.loginFailure = (options.loginFailure || identity).bind(scope);
        this.loginAlways = (options.loginAlways || identity).bind(scope);
        this.beforeLogin = (options.beforeLogin || identity).bind(scope);

    }

    login(username, password) {
        this.beforeLogin();
        fetch(`${AuthenticationService.apiBaseUrl}/Users/Login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                Username: username,
                Password: password
            })
        })
        .then((response) => {
            
            switch(response.status) {
                case 400:
                    alert("Username or password incorrect!");
                    break;
                case 200:
                    ToastAndroid.show("Login successful!", ToastAndroid.SHORT)
            }

        })
        .then(this.loginSuccess)
        .catch(this.loginFailure)
        .finally(this.loginAlways)
    }

}