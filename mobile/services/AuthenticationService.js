import {ToastAndroid} from 'react-native'
import HttpServieWrapper from '../interface/HttpServiceWrapper'
import HttpServiceWrapper from '../interface/HttpServiceWrapper';

export default class AuthenticationService {

    constructor(options = {}) {

        var noop = () => {};
        options.scope = options.scope || this;
        ['loginSuccess', 'loginFailure', 'loginAlways', 'beforeLogin',
        'registerSuccess', 'registerFailure', 'registerAlways', 'beforeRegister'
        ].forEach(x => 
            options[x] = (options[x] || noop).bind(options.scope));
        
        this.options = options;

    }

    login(username, password) {
        this.options.beforeLogin();
        HttpServiceWrapper.post('/Users/Login', {
            Username: username,
            Password: password
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
        .then(this.options.loginSuccess)
        .catch(this.options.loginFailure)
        .finally(this.options.loginAlways)
    }

    register(registerData) {
        this.options.beforeRegister();
        HttpServiceWrapper.post('/Users', {
            Email: registerData.email,
            FullName: registerData.fullName,
            PhoneNumber: registerData.phoneNumber,
            About: registerData.about,
            UserName: registerData.email,
            Password: registerData.password
        })
        .then(this.options.registerSuccess)
        .catch(this.options.registerFailure)
        .finally(this.options.registerAlways)

    }

}