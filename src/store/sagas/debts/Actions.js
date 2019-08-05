import { call, put } from "redux-saga/effects";
import * as types from './ActionTypes';
import personApi from '../../../api/PersonApi';
import debtApi from '../../../api/DebtApi';
import {currencies} from "../../../helpers/Currencies";
import AuthApi from "../../../api/AuthApi";
import {delay} from "q";

export function* getAllPersons(action) {
    try {
        if (!action.from_add_person){
            yield put ({ type: types.FETCHING});
        }
        const response = yield call(personApi.fetchPersons);
        yield put({ type: types.GET_ALL_PERSONS_SUCCESS, persons: response });
        yield put ({ type: types.FETCHING_RESET});
    } catch (error) {
        yield put({ type: types.GET_ALL_PERSONS_FAILURE, error });
        yield put ({ type: types.FETCHING_RESET});
    }
}

export function* createDebt(action) {
    try {
        yield call(AuthApi.getToken);
        yield call(debtApi.createDebt, action.debt);
        yield put({ type: types.CREATE_DEBT_SUCCESS});
        yield delay(2000);
        yield put({type: types.RESET_SUCCESS});
    } catch (error) {
        yield put ({ type: types.FAILURE, error});
        yield delay(2000);
        yield put({type: types.RESET_ERROR});
    }
}

export function* getDebts() {
    try {
        yield put ({ type: types.FETCHING});
        const response = yield call(debtApi.getDebts);
        yield put({type: types.GET_DEBTS_SUCCESS, debts: response});
        yield put ({ type: types.FETCHING_RESET});
    } catch (error) {
        yield put({type: types.GET_DEBTS_FAILURE});
        yield put ({ type: types.FETCHING_RESET});
    }
}

export function* deleteDebt(action) {
    try {
        yield call(debtApi.deleteDebt, action.payload);
        yield call(getDebts);
        yield put({type: types.DELETE_DEBT_SUCCESS});
    } catch (error) {
        yield put({type: types.FAILURE, error});
    }
}


export function* getSingleDebt(action) {
    try {
        const debt = yield call(debtApi.getSingleDebt, action.payload);
        yield put({type: types.GET_DEBT_SUCCESS, debt: debt});
    } catch (error) {
        yield put({type: types.GET_DEBT_FAILURE, error});
    }
}

export function* editDebt(action) {
    try {
        yield call(AuthApi.getToken);
        yield call(debtApi.editDebt, action.debt);
        yield put({type: types.EDIT_DEBT_SUCCESS});
        yield delay(2000);
        yield put({type: types.RESET_SUCCESS});
    } catch (error) {
        yield put({type: types.EDIT_DEBT_FAILURE, error});
        yield delay(2000);
        yield put({type: types.RESET_ERROR});
    }
}

export function* getStatistics() {
    try {
        yield put({type: types.FETCHING});
        const debts = yield call(debtApi.getDebts);
        const theirDebts = {
            rub: debts? debts.filter((debt)=>debt.Debt>0 && debt.Currency===currencies.russian).reduce((result,current)=>result+current.Debt*1, 0) : null,
            usd: debts? debts.filter((debt)=>debt.Debt>0 && debt.Currency===currencies.american).reduce((result,current)=>result+current.Debt*1, 0) : null,
            eur: debts? debts.filter((debt)=>debt.Debt>0 && debt.Currency===currencies.european).reduce((result,current)=>result+current.Debt*1, 0) : null
        };
        const myDebts = {
            rub: debts? debts.filter((debt)=>debt.Debt<0 && debt.Currency===currencies.russian).reduce((result,current)=>result+current.Debt*1, 0) : null,
            usd: debts? debts.filter((debt)=>debt.Debt<0 && debt.Currency===currencies.american).reduce((result,current)=>result+current.Debt*1, 0) : null,
            eur: debts? debts.filter((debt)=>debt.Debt<0 && debt.Currency===currencies.european).reduce((result,current)=>result+current.Debt*1, 0) : null
        };
        yield put({type: types.GET_STATISTICS_SUCCESS, myDebts: myDebts, theirDebts: theirDebts});

    } catch (error) {
        yield put({type: types.FAILURE, error});
    }
}
