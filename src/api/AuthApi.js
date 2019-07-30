class AuthApi {
    static getToken() {
        return fetch('http://drupal7/services/session/token', {
            method: 'POST',
            headers: {
                'content-type': 'plain/text',
                'Accept': 'application/json',
            }
        })
    }

    static signIn(login) {
        const body = {
            "username": login.name,
            "password": login.password
        };

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
            }
            else {
                throw Error(response.statusText);
            }
        })
        .catch(error => {
            throw error;
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
            if(response.status === 200) {
                return response.json();
            }
            else {
                throw Error(response.statusText);
            }
        })
        .catch((error) => {
            throw error;
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
            } else throw(Error(response.statusText));
        })
        .then(response => response[0].Uid)
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

        return fetch('http://drupal7/api/user/', {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then( (response) => {
          if (response.status === 200){
              return response;
          }  else throw Error(response.statusText);
        })

    }
}

export default AuthApi;