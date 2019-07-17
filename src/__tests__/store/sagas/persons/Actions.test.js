import { call, put } from "redux-saga/effects";
import * as types from "../../../../store/sagas/persons/ActionTypes";
import * as actions from "../../../../store/sagas/persons/Actions";
import personApi from "../../../../api/PersonApi";


describe('sagas actions', () => {
    it('fetching persons', () => {
        const generator = actions.getPersons();
        expect(generator.next().value)
            .toEqual(call(personApi.fetchPersons));
        expect(generator.next().value)
            .toEqual(put({type: 'GET_PERSONS_SUCCESS', persons: undefined}));
        expect(generator.throw('error').value)
            .toEqual(put({ type: types.GET_PERSONS_FAILURE, error:'error' }));
    });

    it('fetching single person if id is defined', () => {
        const fakePayload = {
            type: types.GET_PERSON_REQUEST,
            payload: {
                id: 65
            }
        };
        const generator = actions.getSinglePerson(fakePayload);
        expect(generator.next().value)
            .toEqual(put({ type: types.PERSON_FETCHING}));
        expect(generator.next().value)
            .toEqual(call(personApi.fetchSinglePerson,fakePayload.payload.id));
        expect(generator.next().value)
            .toEqual(put({type: types.GET_PERSON_SUCCESS, person: undefined}));
        expect(generator.throw('error').value)
            .toEqual(put({ type: types.GET_PERSON_FAILURE, error:'error' }));
    });

    it('fetching single person if id is undefined', () => {
        const fakePayload = {
            payload: {
                id: undefined
            }
        };
        const generator = actions.getSinglePerson(fakePayload);
        expect(generator.next().value)
            .toEqual(put({ type: types.PERSON_FETCHING}));
        expect(generator.next().value)
            .toEqual(put({type: types.GET_PERSON_SUCCESS, person: {firstName: '', secondName: ''}}));
        expect(generator.throw('error').value)
            .toEqual(put({ type: types.GET_PERSON_FAILURE, error:'error' }));
    });

    it('editing person', () => {
        const fakeAction = {
            payload: 65
        };
        const generator = actions.editPerson(fakeAction);
        expect(generator.next().value)
            .toEqual(call(personApi.editPerson,fakeAction.payload));
        expect(generator.next().value)
            .toEqual(put({type: types.EDIT_PERSON_SUCCESS}));
        expect(generator.throw('error').value)
            .toEqual(put({type: types.EDIT_PERSON_FAILURE, error:'error'}));
    });

    it('adding person', () => {
        const fakeAction = {
            payload: {
                firstName: 'test1',
                secondName: 'test2'
            }
        };
        const generator = actions.addPerson(fakeAction);
        expect(generator.next().value)
            .toEqual(call(personApi.addPerson, fakeAction.payload));
        expect(generator.next().value)
            .toEqual(put({type: types.CREATE_PERSON_SUCCESS}));
        expect(generator.throw('error').value)
            .toEqual(put({type: types.CREATE_PERSON_FAILURE, error:'error'}));
    });

    it('deleting person', () => {
        const fakeAction = {
            payload: {
                id: 65
            }
        };
        const generator = actions.deletePerson(fakeAction);
        expect(generator.next().value)
            .toEqual(call(personApi.deletePerson, fakeAction.payload));
        expect(generator.next().value)
            .toEqual(put({type: types.DELETE_PERSON_SUCCESS}));
        expect(generator.next().value)
            .toEqual(call(actions.getPersons));
        expect(generator.throw('error').value)
            .toEqual(put({type: types.DELETE_PERSON_FAILURE, error:'error'}));
    });

});

