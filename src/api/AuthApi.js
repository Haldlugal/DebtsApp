import {getCookie} from "../helpers/Cookie";



class AuthApi {
    static getToken() {
        return fetch('http://drupal7/services/session/token', {
            method: 'POST',
            headers: {
                'content-type': 'plain/text',
                'Accept': 'application/json',
            }
        });
    }

    static signIn(login) {
        const body = {
            "username": login.name,
            "password": login.password
        };

        return AuthApi.getToken()
        .then(() => {
            return fetch('http://drupal7/api/user/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(body)
            })
            .then(response => {
                if(response.status === 200) {
                    return response.json();
                } else if (response.status === 406) {
                    return response.json()
                }
                else {
                    document.cookie = "id=0";
                    throw Error(response.statusText);
                }
            })
            .then(response => {
                document.cookie = "id="+response.user.uid;
            })
            .catch(error => {
                throw error;
            })
        });
    }

    static logout() {
        return fetch('http://drupal7/api/user/logout', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((response) => {
            document.cookie = "id=0";
            return response;
        })
        .catch((error) => {
            console.log(error);
        })
    }

    static getUserLoggedIn() {
        return fetch('http://drupal7/api/current_user/', {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else throw(Error());
        })
        .catch(error=>{
            throw error;
        });

    }

    static signUpUser(userInfo) {
        const body = {
            "name": userInfo.login,
            "mail": userInfo.email,
            "pass": userInfo.password,
            "status": "1",
            "field_first_name": {
                "und": [
                    {
                        "value": userInfo.firstName
                    }
                ]
            }
        };

        return AuthApi.getToken()
        .then(response=>{
            return response.text();
        })
        .then( () => {
            const axios = require('axios');
            return axios.post('http://drupal7/api/user/', body)
            .then(response => {
                return response;
            })
            .catch( (error) => {
                throw error.response.statusText;
            })
        })
    }
}

export default AuthApi;