import { call, put, delay } from "redux-saga/effects";
import * as types from './ActionTypes';
import personApi from '../../../api/PersonApi';

export function* getPersons() {
    try {
        const response = yield call(personApi.fetchPersons);
        yield put({ type: types.GET_PERSONS_SUCCESS, persons: response });
    } catch (error) {
        yield put({ type: types.GET_PERSONS_FAILURE, error });
    }
}

export function* getSinglePerson(action) {
    try {
        yield put({ type: types.PERSON_FETCHING});
        yield delay(1000);
        if (typeof action.payload.id!== 'undefined') {
            const response = yield call(personApi.fetchSinglePerson, action.payload.id);
            yield put({type: types.GET_PERSON_SUCCESS, person: response});
        }
        else {
            yield put({type: types.GET_PERSON_SUCCESS, person: {
                    firstName: '',
                    secondName: ''
                }});
        }
    } catch (error) {
        console.log(error);
        yield put({ type: types.GET_PERSON_FAILURE, error});
    }
}

export function* editPerson(action) {
    try {
        yield call(personApi.editPerson, action.payload);
        yield put({type: types.EDIT_PERSON_SUCCESS, action});
    } catch (error) {
        yield put({type: types.EDIT_PERSON_FAILURE, error});
    }
}

export function* addPerson(action) {
    try {
        yield call(personApi.addPerson, action.payload);
        yield put({type: types.CREATE_PERSON_SUCCESS});
    } catch (error) {
        yield put({type: types.CREATE_PERSON_FAILURE, error});
    }
}

export function* deletePerson(action) {
    try {
        yield call(personApi.deletePerson, action.payload);
        yield put({type: types.DELETE_PERSON_SUCCESS});
        yield call(getPersons);
    } catch (error) {
        yield put({type: types.DELETE_PERSON_FAILURE, error});
    }
}