class PersonApi {
    static fetchPersons() {
        return fetch('http://drupal7/api/persons_api', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Cookie': 'NACCWqASBbd2DqA1hsThD-Ez1mKrovcYipsflL9w8As=NACCWqASBbd2DqA1hsThD-Ez1mKrovcYipsflL9w8As'
            }
        })
        .then(response => {return response.json();});

    }

    static fetchSinglePerson(id) {
        return fetch('http://drupal7/api/terms/'+id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Cookie': 'NACCWqASBbd2DqA1hsThD-Ez1mKrovcYipsflL9w8As=NACCWqASBbd2DqA1hsThD-Ez1mKrovcYipsflL9w8As'
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
                'Accept': 'application/json',
                'Cookie': 'NACCWqASBbd2DqA1hsThD-Ez1mKrovcYipsflL9w8As=NACCWqASBbd2DqA1hsThD-Ez1mKrovcYipsflL9w8As'
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
                'Accept': 'application/json',
                //'X-CSRF-Token': 'qZxmGKITTToGzzmfmvwI866bVn03K4Os1enTZ5okODc',
                'Cookie': 'NACCWqASBbd2DqA1hsThD-Ez1mKrovcYipsflL9w8As=NACCWqASBbd2DqA1hsThD-Ez1mKrovcYipsflL9w8As'
            },
            body: JSON.stringify(body)
        })
        .then(response => {return response;});
    }

    static deletePerson(person) {
        return fetch('http://drupal7/api/terms/'+person.id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Cookie': 'NACCWqASBbd2DqA1hsThD-Ez1mKrovcYipsflL9w8As=NACCWqASBbd2DqA1hsThD-Ez1mKrovcYipsflL9w8As'
            }
        })
    }
}

export default PersonApi;