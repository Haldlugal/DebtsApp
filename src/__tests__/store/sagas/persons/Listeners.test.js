import { put, takeLatest } from 'redux-saga/effects';
import * as types from "../../../../store/sagas/persons/ActionTypes";
import * as actions from "../../../../store/sagas/persons/Actions";

import {
    addPersonSaga,
    deletePersonSaga,
    editPersonSaga,
    personsSaga,
    singlePersonSaga
} from "../../../../store/sagas/persons/Listeners";

describe('sagas personListeners', () => {
    it('should dispatch action "GET_PERSONS_REQUEST" ', () => {
        const generator = personsSaga();
        expect(generator.next().value)
            .toEqual(takeLatest(types.GET_PERSONS_REQUEST, actions.getPersons));
        expect(generator.next().done).toBeTruthy();
    })
    it('should dispatch action "GET_PERSON_REQUEST" ', () => {
        const generator = singlePersonSaga();
        expect(generator.next().value)
            .toEqual(takeLatest(types.GET_PERSON_REQUEST, actions.getSinglePerson));
        expect(generator.next().done).toBeTruthy();
    })
    it('should dispatch action "EDIT_PERSON_REQUEST" ', () => {
        const generator = editPersonSaga();
        expect(generator.next().value)
            .toEqual(takeLatest(types.EDIT_PERSON_REQUEST, actions.editPerson));
        expect(generator.next().done).toBeTruthy();
    })
    it('should dispatch action "CREATE_PERSON_REQUEST" ', () => {
        const generator = addPersonSaga();
        expect(generator.next().value)
            .toEqual(takeLatest(types.CREATE_PERSON_REQUEST, actions.addPerson));
        expect(generator.next().done).toBeTruthy();
    })
    it('should dispatch action "DELETE_PERSON_REQUEST" ', () => {
        const generator = deletePersonSaga();
        expect(generator.next().value)
            .toEqual(takeLatest(types.DELETE_PERSON_REQUEST, actions.deletePerson));
        expect(generator.next().done).toBeTruthy();
    })
});