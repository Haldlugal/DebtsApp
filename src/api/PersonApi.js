class PersonApi {

    static fetchAllPersons() {
        return fetch('http://drupal7/api/persons_api', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                return response.json();
            });
    }


    static fetchPersons() {
        return fetch('http://drupal7/api/persons_api', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            return response.json();
        });
    }

    static fetchSinglePerson(id) {
        return fetch('http://drupal7/api/terms/'+id, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {return response.json();})
        .then(result => {return {
            firstName: result.field_persons_first_name.und[0].value,
            secondName: result.field_persons_second_name.und[0].value
        }});
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
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
                },
            body: JSON.stringify(body)
            });
    }

    static addPerson(person) {
        const body = {
            "vid": "2",
            "name": person.firstName+" "+person.secondName,
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
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
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
    }
}

export default PersonApi;