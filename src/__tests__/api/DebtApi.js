import debtApi from "../../api/DebtApi";

describe ('Debt api tests', ()=>{
    it('create debt', async () => {
        const mockDebt = {
            person: 'mrTest',
            currency: 'EUR',
            amount: 1000,
            dateCreated: '10 July 2017',
            dateExpires: '10 July 2017'
        };

        const mockBody = {
            "title": "Debt",
            "type" :"debt",
            "field_person": {
                "und": [
                    {
                        "target_id": " ("+mockDebt.person+")"
                    }
                ]
            },
            "field_currency": {
                "und": [
                    {
                        "currency_code": mockDebt.currency
                    }
                ]
            },
            "field_debt": {
                "und": [
                    {
                        "value": mockDebt.amount
                    }
                ]
            },
            "field_creation_date": {
                "und": [
                    {
                        "value": {
                            "date": mockDebt.dateCreated
                        }
                    }
                ]
            },
            "field_expiration_date": {
                "und": [
                    {
                        "value": {
                            "date": mockDebt.dateExpires
                        }
                    }
                ]
            }
        };
        window.fetch = jest.fn().mockImplementation((url, params) =>{
            expect(url).toBe('http://drupal7/api/node/');
            expect(params).toMatchObject({
                method: 'POST',
                credentials: 'include',
                mode: 'cors',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(mockBody)
            });
            return Promise.resolve({
                status: 200,
                json: () => Promise.resolve()
            });
        });
        await debtApi.createDebt(mockDebt);
    });

    it('create debt throws error if response status is not 200', async () => {
        const mockDebt = {
            person: 'mrTest',
            currency: 'EUR',
            amount: 1000,
            dateCreated: '10 July 2017',
            dateExpires: '10 July 2017'
        };
        window.fetch = jest.fn().mockImplementation((url, params) =>{
            expect(url).toBe('http://drupal7/api/node/');

            return Promise.resolve({
                status: 400,
                statusText: 'test'
            });
        });
        await expect(debtApi.createDebt(mockDebt)).rejects.toEqual('test');
    });

    it('get debts', async () => {
        window.fetch = jest.fn().mockImplementation((url, params) =>{
            expect(url).toBe('http://drupal7/api/debts_list/');
            expect(params).toMatchObject({
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json'
                    }
                },
            );
            return Promise.resolve({
                status: 200,
                json: () => Promise.resolve()
            });
        });
        await debtApi.getDebts();
    });

    it('get debts throws error if response status is not 200', async () => {
        window.fetch = jest.fn().mockImplementation((url, params) =>{
            expect(url).toBe('http://drupal7/api/debts_list/');
            expect(params).toMatchObject({
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json'
                    }
                },
            );
            return Promise.resolve({
                status: 400,
                statusText: 'test'
            });
        });
        await expect(debtApi.getDebts()).rejects.toEqual('test');
    });

    it('delete debt', async () => {
        const mockDebt = {
            id: 10
        };
        window.fetch = jest.fn().mockImplementation((url, params) =>{
            expect(url).toBe('http://drupal7/api/node/'+mockDebt.id);
            expect(params).toMatchObject({
                    method: 'DELETE',
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json'
                    }
                },
            );
            return Promise.resolve({
                status: 200,
                json: () => Promise.resolve()
            });
        });
        await debtApi.deleteDebt(mockDebt);
    });

    it('delete debt throws error if response status is not 200', async () => {
        const mockDebt = {
            id: 10
        };
        window.fetch = jest.fn().mockImplementation((url) =>{
            expect(url).toBe('http://drupal7/api/node/'+mockDebt.id);
            return Promise.resolve({
                status: 400,
                statusText: 'test'
            });
        });
        await expect(debtApi.deleteDebt(mockDebt)).rejects.toEqual('test');
    });

    it('get single debt', async () => {
        const mockDebt = {
            id: 10
        };
        window.fetch = jest.fn().mockImplementation((url, params) =>{
            expect(url).toBe('http://drupal7/api/debt?nid='+mockDebt.id);
            expect(params).toMatchObject({
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                }
            });
            return Promise.resolve({
                status: 200,
                json: () => Promise.resolve({0:'something'})
            });
        });
        await debtApi.getSingleDebt(mockDebt.id);
    });

    it('get single debt throws error if response status is not 200', async () => {
        const mockDebt = {
            id: 10
        };
        window.fetch = jest.fn().mockImplementation((url) =>{
            expect(url).toBe('http://drupal7/api/debt?nid='+mockDebt.id);
            return Promise.resolve({
                status: 400,
                statusText: 'test'
            });
        });
        await expect(debtApi.getSingleDebt(mockDebt.id)).rejects.toEqual('test');
    });

    it('edit debt', async () => {
        const mockDebt = {
            id: 10,
            person: 'mrTest',
            currency: 'EUR',
            amount: 1000,
            dateCreated: '10 July 2017',
            dateExpires: '10 July 2017'
        };

        const mockBody = {
            "title": "Debt",
            "type" :"debt",
            "field_person": {
                "und": [
                    {
                        "target_id": " ("+mockDebt.person+")"
                    }
                ]
            },
            "field_currency": {
                "und": [
                    {
                        "currency_code": mockDebt.currency
                    }
                ]
            },
            "field_debt": {
                "und": [
                    {
                        "value": mockDebt.amount
                    }
                ]
            },
            "field_creation_date": {
                "und": [
                    {
                        "value": {
                            "date": mockDebt.dateCreated
                        }
                    }
                ]
            },
            "field_expiration_date": {
                "und": [
                    {
                        "value": {
                            "date": mockDebt.dateExpires
                        }
                    }
                ]
            }
        };
        window.fetch = jest.fn().mockImplementation((url, params) =>{
            expect(url).toBe('http://drupal7/api/node/'+ mockDebt.id);
            expect(params).toMatchObject({
                method: 'PUT',
                credentials: 'include',
                mode: 'cors',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(mockBody)

            });
            return Promise.resolve({
                status: 200,
                json: () => Promise.resolve()
            });
        });
        await debtApi.editDebt(mockDebt);
    });

    it('edit debt throws error if response status is not 200', async () => {
        const mockDebt = {
            id: 10,
            person: 'mrTest',
            currency: 'EUR',
            amount: 1000,
            dateCreated: '10 July 2017',
            dateExpires: '10 July 2017'
        };

        window.fetch = jest.fn().mockImplementation((url) =>{
            expect(url).toBe('http://drupal7/api/node/'+ mockDebt.id);

            return Promise.resolve({
                status: 400,
                statusText: 'test'
            });
        });
        await expect(debtApi.editDebt(mockDebt)).rejects.toEqual('test');
    });
});
