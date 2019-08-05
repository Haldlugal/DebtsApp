class PersonApi {

    static fetchPersons() {
        return fetch('http://drupal7/api/persons_api/', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else throw Error(response.statusText);
        })
        .catch(error=> {
            throw error.message;
        });
    }

    static fetchSinglePerson(id) {
        return fetch('http://drupal7/api/terms/'+id, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else throw Error(response.statusText);
        })
        .then(result => {return {
            firstName: result.field_persons_first_name.und[0].value,
            secondName: result.field_persons_second_name.und[0].value
        }})
        .catch(error=> {
            throw error.message;
        });
    }

    static editPerson(person) {
        const body = {
            "tid": person.id,
            "name": person.firstName+" "+person.secondName,
            "vocabulary_machine_name": "persons",
            "field_persons_first_name": {
                "und": [
                    {
                        "value": person.firstName
                    }
                ]
            },
            "field_persons_second_name": {
                "und": [
                    {
                        "value": person.secondName
                    }
                ]
            }
        };
        return fetch('http://drupal7/api/terms/', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
                },
            body: JSON.stringify(body)
            })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else throw Error(response.statusText);
            })
            .catch(error=> {
                throw error.message;
            });
    }

    static addPerson(person) {
        const body = {
            "vid": "2",
            "name": person.firstName+" "+person.secondName,
            "field_author_id": {
                "und": [
                    {
                        "value": person.author_id
                    }
                ]
            },
            "field_persons_first_name": {
                "und": [
                    {
                        "value": person.firstName
                    }
                ]
            },
            "field_persons_second_name": {
                "und": [
                    {
                        "value": person.secondName
                    }
                ]
            }
        };

        return fetch('http://drupal7/api/terms', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((response)=>{
            if (response.status!==200){
                throw Error(response.statusText);
            } else {
                return response.json();
            }
        }).then(response=>response)

        .catch(error=> {
            throw error;
        });
    }

    static deletePerson(person) {
        return fetch('http://drupal7/api/terms/'+person.id, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else throw Error(response.statusText);
        })
        .catch(error=> {
            throw error.message;
        });
    }
}

export default PersonApi;