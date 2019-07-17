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
        secondName: 'TheSock'
    };

    it('fetch for list of persons', async () => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve(mockPersons)
        }));
        const response = await personApi.fetchPersons();
        expect(response).toBe(mockPersons);
    });

    it('fetch for single person', async () => {
        window.fetch = jest.fn().mockImplementation((url) =>{
            expect(url).toBe('http://drupal7/api/terms/'+mockPerson.tid);
            return Promise.resolve({
                json: () => Promise.resolve(mockPerson)
        })});
        const response = await personApi.fetchSinglePerson(mockPerson.tid);
        expect(response).toStrictEqual( {
            firstName: mockPerson.field_persons_first_name.und[0].value,
            secondName: mockPerson.field_persons_second_name.und[0].value
        })
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
        });
        await personApi.editPerson(mockPersonToEdit);
    });

    it('delete person', async () => {
        window.fetch = jest.fn().mockImplementation((url, params) =>{
            expect(url).toBe('http://drupal7/api/terms/'+mockPersonToDelete.id);
        });
        await personApi.deletePerson(mockPersonToDelete);
    });

    it('create person', async () => {
        window.fetch = jest.fn().mockImplementation((url, params) =>{
            expect(params.body).toBe(JSON.stringify({
                "vid": "2",
                "name": mockPersonToCreate.firstName+" "+mockPersonToCreate.secondName,
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
        });
        await personApi.addPerson(mockPersonToCreate);
    });

});