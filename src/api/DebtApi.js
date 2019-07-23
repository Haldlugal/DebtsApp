import AuthApi from "./AuthApi";


export default class DebtApi {

    static createDebt(debt) {
        const body = {
            "title": "Debt",
            "type" :"debt",
            "field_person": {
                "und": [
                    {
                        "target_id": " ("+debt.person+")"
                    }
                ]
            },
            "field_currency": {
                "und": [
                    {
                        "currency_code": debt.currency
                    }
                ]
            },
            "field_debt": {
                "und": [
                    {
                        "value": debt.amount
                    }
                ]
            },
            "field_creation_date": {
                "und": [
                    {
                        "value": {
                            "date": debt.dateCreated
                        }
                    }
                ]
            },
            "field_expiration_date": {
                "und": [
                    {
                        "value": {
                            "date": debt.dateExpires
                        }
                    }
                ]
            }
        };

        return AuthApi.getToken()
            .then( () => {
                return fetch('http://drupal7/api/node/', {
                    method: 'POST',
                    credentials: 'include',
                    mode: 'cors',
                    headers: {
                        'content-type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
                .then(response => {
                    return response;
                })
                .catch( (error) => {
                    throw error.response.statusText;
                })
            })
    }

    static getDebts() {
        return fetch('http://drupal7/api/debts_list/', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                return response.json();
            })
            .catch(error => {
                throw error.response.statusText;
            });
    }

    static deleteDebt(debt) {
        return fetch('http://drupal7/api/node/'+debt.id, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        })
    }

    static getSingleDebt(debtId) {
        return fetch('http://drupal7/api/debt?nid='+debtId, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {return response.json();})
    }

    static editDebt(debt) {
        const body = {
            "title": "Debt",
            "type" :"debt",
            "field_person": {
                "und": [
                    {
                        "target_id": " ("+debt.person+")"
                    }
                ]
            },
            "field_currency": {
                "und": [
                    {
                        "currency_code": debt.currency
                    }
                ]
            },
            "field_debt": {
                "und": [
                    {
                        "value": debt.amount
                    }
                ]
            },
            "field_creation_date": {
                "und": [
                    {
                        "value": {
                            "date": debt.dateCreated
                        }
                    }
                ]
            },
            "field_expiration_date": {
                "und": [
                    {
                        "value": {
                            "date": debt.dateExpires
                        }
                    }
                ]
            }
        };

        return AuthApi.getToken()
            .then( () => {
                return fetch('http://drupal7/api/node/'+debt.id, {
                    method: 'PUT',
                    credentials: 'include',
                    mode: 'cors',
                    headers: {
                        'content-type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
                    .then(response => {
                        return response;
                    })
                    .catch( (error) => {
                        throw error.response.statusText;
                    })
            })
    }
}
