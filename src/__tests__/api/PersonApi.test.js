import personApi from "../../api/PersonApi";

describe('PersonApi', () => {
    const mockPersons = [
        {"first_name": "test1", "second_name": "test1", "name": "test1", "tid": "1"},
        {"first_name": "test2", "second_name": "test2", "name": "test2", "tid": "2"}
    ];

    const mockPerson = {
        "tid": "65",
        "name": "1asdfa1 1fasdfsda",
        "field_persons_first_name": {
            "und": [
                {
                    "value": "1asdfa1",
                    "format": null,
                    "safe_value": "1asdfa1"
                }
            ]
        },
        "field_persons_second_name": {
            "und": [
                {
                    "value": "1fasdfsda",
                    "format": null,
                    "safe_value": "1fasdfsda"
                }
            ]
        }
    };

    const mockPersonToEdit = {
        id: 65,
        firstName: 'Dobby',
        secondName: 'TheSock'
    };

    const mockPersonToDelete = {
        id: 65
    };

    const mockPersonToCreate = {
        firstName: 'Dobby',
        secondName: 'TheSock',
        author_id: 1
    };


    it('fetch for single person', async () => {
        window.fetch = jest.fn().mockImplementation((url) =>{
            expect(url).toBe('http://drupal7/api/terms/'+mockPerson.tid);
            return Promise.resolve({
                status: 200,
                json: () => Promise.resolve(mockPerson)
        })});
        const response = await personApi.fetchSinglePerson(mockPerson.tid);
        expect(response).toStrictEqual( {
            firstName: mockPerson.field_persons_first_name.und[0].value,
            secondName: mockPerson.field_persons_second_name.und[0].value
        })
    });

    it('fetch for single person throws error if response status is not 200', async () => {
        window.fetch = jest.fn().mockImplementation((url) => {
            expect(url).toBe('http://drupal7/api/terms/' + mockPerson.tid);
            return Promise.resolve({
                status: 400,
                statusText: 'test'
            });
        });
        await expect(personApi.fetchSinglePerson(mockPerson.tid)).rejects.toEqual('test');
    });

    it('fetch for list of persons', async () => {
        window.fetch = jest.fn().mockImplementation((url) =>{
            expect(url).toBe('http://drupal7/api/persons_api/');
            return Promise.resolve({
                status: 200,
                json: () => Promise.resolve(mockPersons)
            })});
        const response = await personApi.fetchPersons();
        expect(response).toEqual(mockPersons);
    });

    it('fetch for list of persons throws error if response status is not 200', async()=>{
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            status: 400,
            statusText: 'test'
        }));
        await expect(personApi.fetchPersons()).rejects.toEqual('test');
    });

    it('edit person', async () => {
        window.fetch = jest.fn().mockImplementation((url, params) =>{
            expect(params.body).toBe(JSON.stringify({
                "tid": mockPersonToEdit.id,
                "name": mockPersonToEdit.firstName+" "+mockPersonToEdit.secondName,
                "vocabulary_machine_name": "persons",
                "field_persons_first_name": {
                    "und": [
                        {
                            "value": mockPersonToEdit.firstName
                        }
                    ]
                },
                "field_persons_second_name": {
                    "und": [
                        {
                            "value": mockPersonToEdit.secondName
                        }
                    ]
                }
            }));
            return Promise.resolve({status: 200, json: () => Promise.resolve()});
        });
        await personApi.editPerson(mockPersonToEdit);
    });

    it('edit person throws error if response status is not 200', async () => {
        window.fetch = jest.fn().mockImplementation(() => {
            return Promise.resolve({
                status: 400,
                statusText: 'test'
            });
        });

        await expect(personApi.editPerson(mockPersonToEdit)).rejects.toEqual('test');
    });

    it('delete person', async () => {
        window.fetch = jest.fn().mockImplementation((url, params) =>{
            expect(url).toBe('http://drupal7/api/terms/'+mockPersonToDelete.id);
            return Promise.resolve({status: 200, json: () => Promise.resolve()});
        });
        await personApi.deletePerson(mockPersonToDelete);
    });

    it('delete person throws error if response status is not 200', async () => {
        window.fetch = jest.fn().mockImplementation((url, params) =>{
            return Promise.resolve({
                status: 400,
                statusText: 'test'
            });
        });
        await expect(personApi.deletePerson(mockPersonToDelete)).rejects.toEqual('test');
    });

    it('create person', async () => {
        window.fetch = jest.fn().mockImplementation((url, params) =>{
            expect(params.body).toBe(JSON.stringify({
                "vid": "2",
                "name": mockPersonToCreate.firstName+" "+mockPersonToCreate.secondName,
                "field_author_id": {
                    "und": [
                        {
                            "value": mockPersonToCreate.author_id
                        }
                    ]
                },
                "field_persons_first_name": {
                    "und": [
                        {
                            "value": mockPersonToCreate.firstName
                        }
                    ]
                },
                "field_persons_second_name": {
                    "und": [
                        {
                            "value": mockPersonToCreate.secondName
                        }
                    ]
                }
            }));
            return Promise.resolve({status: 200});
        });
        await personApi.addPerson(mockPersonToCreate);
    });

    it('create person throws error if response status is not 200', async () => {
        window.fetch = jest.fn().mockImplementation(() =>{
            return Promise.resolve({
                status: 400,
                statusText: 'test'
            });
        });
        await expect(personApi.addPerson(mockPersonToCreate)).rejects.toEqual(Error('test'));
    });

});