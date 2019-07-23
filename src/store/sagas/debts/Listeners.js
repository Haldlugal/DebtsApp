import * as types from "./ActionTypes";
import * as actions from "./Actions";
import { takeLatest } from "redux-saga/effects";


export function* personsSaga() {
    yield takeLatest(types.GET_ALL_PERSONS_REQUEST, actions.getAllPersons);
}

export function* createDebtSaga() {
    yield takeLatest(types.CREATE_DEBT_REQUEST, actions.createDebt);
}

export function* debtsSaga() {
    yield takeLatest(types.GET_DEBTS_REQUEST, actions.getDebts);
}

export function* deleteDebtSaga() {
    yield takeLatest(types.DELETE_DEBT_REQUEST, actions.deleteDebt);
}

export function* getSingleDebtSaga() {
    yield takeLatest(types.GET_DEBT_REQUEST, actions.getSingleDebt);
}

export function* editDebtSaga() {
    yield takeLatest(types.EDIT_DEBT_REQUEST, actions.editDebt);
}

export function* getStatisticsSaga() {
    yield takeLatest(types.GET_STATISTICS_REQUEST, actions.getStatistics);
}