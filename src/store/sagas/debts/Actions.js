import { call, put } from "redux-saga/effects";
import * as types from './ActionTypes';
import personApi from '../../../api/PersonApi';
import debtApi from '../../../api/DebtApi';

export function* getAllPersons() {
    try {
        const response = yield call(personApi.fetchAllPersons);
        yield put({ type: types.GET_ALL_PERSONS_SUCCESS, persons: response });
    } catch (error) {
        yield put({ type: types.GET_ALL_PERSONS_FAILURE, error });
    }
}

export function* createDebt(action) {
    try {
        yield call(debtApi.createDebt, action.debt);
        yield put({ type: types.CREATE_DEBT_SUCCESS});
    } catch (error) {
        yield put ({ type: types.CREATE_DEBT_FAILURE});
    }
}
