import * as types from "./ActionTypes";
import * as actions from "./Actions";
import { takeLatest } from "redux-saga/effects";


export function* personsSaga() {
    yield takeLatest(types.GET_ALL_PERSONS_REQUEST, actions.getAllPersons);
}

export function* createDebtSaga() {
    yield takeLatest(types.CREATE_DEBT_REQUEST, actions.createDebt);
}

