import authApi from "../../api/AuthApi";


describe ('Auth api tests', ()=>{
    it('get token', async () => {
        window.fetch = jest.fn().mockImplementation((url, params) =>{
            expect(url).toBe('http://drupal7/services/session/token');
            expect(params).toMatchObject({ method: 'POST', headers: { 'content-type': 'plain/text', Accept: 'application/json' } });
        });
        await authApi.getToken();
    });

    it('sign in', async () => {
        const mockUser = {
            name: 'test',
            password: 'test'
        };
        window.fetch = jest.fn().mockImplementation((url, params) =>{
            expect(url).toBe('http://drupal7/api/user/login');
            expect(params).toMatchObject({
                method: 'POST',
                credentials: 'include',
                headers: {
                'content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({"username":mockUser.name,"password":mockUser.password})
                });
            return Promise.resolve({
                status: 200,
                json: () => Promise.resolve()
            });
        });
        await authApi.signIn(mockUser);
    });

    it('signIn throws error with status text if response status is not 200', async () => {
        const mockUser = {
            name: 'test',
            password: 'test'
        };

        window.fetch = jest.fn().mockImplementation((url) =>{
            expect(url).toBe('http://drupal7/api/user/login');
            return Promise.resolve({
                status: 400,
                statusText: 'test'
            });
        });
        await expect(authApi.signIn(mockUser)).rejects.toEqual(Error('test'));
    });


    it('logout', async () => {
        window.fetch = jest.fn().mockImplementation((url, params) =>{
            expect(url).toBe('http://drupal7/api/user/logout');
            expect(params).toMatchObject({
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                }

            });
            return Promise.resolve({
                status: 200,
                json: () => Promise.resolve()
            });
        });
        await authApi.logout();
    });

    it('logout throws error with status text if response status is not 200', async () => {
        window.fetch = jest.fn().mockImplementation((url, params) =>{
            expect(url).toBe('http://drupal7/api/user/logout');
            expect(params).toMatchObject({
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                }

            });
            return Promise.resolve({
                status: 400,
                statusText: 'test'
            });
        });
        await expect(authApi.logout()).rejects.toEqual(Error('test'));
    });

    it('get logged in user', async () => {
        window.fetch = jest.fn().mockImplementation((url, params) =>{
            expect(url).toBe('http://drupal7/api/current_user/');
            expect(params).toMatchObject({
                method: 'GET',
                credentials: 'include',
                mode: 'cors',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            return Promise.resolve({
                status: 200,
                json: () => Promise.resolve({0:{Uid: 11}})
            });
        });
        await authApi.getUserLoggedIn();
    });

    it('get logged in user throws error with status text if response status is not 200', async () => {
        window.fetch = jest.fn().mockImplementation((url, params) =>{
            expect(url).toBe('http://drupal7/api/current_user/');

            return Promise.resolve({
                status: 400,
                statusText: 'test'
            });
        });
        await expect(authApi.getUserLoggedIn()).rejects.toEqual(Error('test'));
    });

    it('signUp user', async () => {
        const mockedUserInfo ={
            login: 'Seamus',
            email: 'res@res.ru',
            password: 'myLovelyBelle',
            firstName: 'Resser'
        };
        const mockedUser = {
            "name": mockedUserInfo.login,
            "mail": mockedUserInfo.email,
            "pass": mockedUserInfo.password,
            "status": "1",
            "field_first_name": {
                "und": [
                    {
                        "value": mockedUserInfo.firstName
                    }
                ]
            }
        };

        window.fetch = jest.fn().mockImplementation((url, params) =>{
            expect(url).toBe('http://drupal7/api/user/');
            expect(params).toMatchObject({
                method: 'POST',
                credentials: 'include',
                mode: 'cors',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(mockedUser)
            });
            return Promise.resolve({
                status: 200,
                json: () => Promise.resolve({0:{Uid: 11}})
            });
        });
        await authApi.signUpUser(mockedUserInfo);
    });

    it('signUp user throws error with status text if response status is not 200', async () => {
        const mockedUserInfo ={
            login: 'Seamus',
            email: 'res@res.ru',
            password: 'myLovelyBelle',
            firstName: 'TheResser'
        };
        const mockedUser = {
            "name": mockedUserInfo.login,
            "mail": mockedUserInfo.email,
            "pass": mockedUserInfo.password,
            "status": "1",
            "field_first_name": {
                "und": [
                    {
                        "value": mockedUserInfo.firstName
                    }
                ]
            }
        };

        window.fetch = jest.fn().mockImplementation((url, params) =>{
            expect(url).toBe('http://drupal7/api/user/');
            expect(params).toMatchObject({
                method: 'POST',
                credentials: 'include',
                mode: 'cors',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(mockedUser)
            });
            return Promise.resolve({
                status: 400,
                statusText: 'test'
            });
        });
        await expect(authApi.signUpUser(mockedUserInfo)).rejects.toEqual(Error('test'));
    });

});
