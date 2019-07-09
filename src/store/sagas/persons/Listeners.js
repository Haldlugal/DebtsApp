import * as types from "./ActionTypes";
import * as actions from "./Actions";
import { takeLatest } from "redux-saga/effects";


export function* personsSaga() {
    yield takeLatest(types.GET_PERSONS_REQUEST, actions.getPersons);
}

export function* singlePersonSaga() {
    yield takeLatest(types.GET_PERSON_REQUEST, actions.getSinglePerson);
}

export function* editPersonSaga() {
    yield takeLatest(types.EDIT_PERSON_REQUEST, actions.editPerson);
}

export function* addPersonSaga() {
    yield takeLatest(types.CREATE_PERSON_REQUEST, actions.addPerson);
}

export function* deletePersonSaga() {
    yield takeLatest(types.DELETE_PERSON_REQUEST, actions.deletePerson);
}

