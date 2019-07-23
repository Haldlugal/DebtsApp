import { call, put } from "redux-saga/effects";
import * as types from './ActionTypes';
import personApi from '../../../api/PersonApi';
import debtApi from '../../../api/DebtApi';
import {currencies} from "../../../helpers/Currencies";

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

export function* getDebts() {
    try {
        const response = yield call(debtApi.getDebts);
        yield put({type: types.GET_DEBTS_SUCCESS, debts: response});
    } catch (error) {
        yield put({type: types.GET_DEBTS_FAILURE});
    }
}

export function* deleteDebt(action) {
    try {
        yield call(debtApi.deleteDebt, action.payload);
        yield put({type: types.DELETE_DEBT_SUCCESS});
        yield call(getDebts);
    } catch (error) {
        yield put({type: types.DELETE_DEBT_FAILURE, error});
    }
}


export function* getSingleDebt(action) {
    try {
        const debt = yield call(debtApi.getSingleDebt, action.payload);
        yield put({type: types.GET_DEBT_SUCCESS, debt: debt[0]});
    } catch (error) {
        yield put({type: types.GET_DEBT_FAILURE, error});
    }
}

export function* editDebt(action) {
    try {
        yield call(debtApi.editDebt, action.debt);
        yield put({type: types.EDIT_DEBT_SUCCESS});
    } catch (error) {
        yield put({type: types.EDIT_DEBT_FAILURE, error});
    }
}

export function* getStatistics() {
    try {
        const debts = yield call(debtApi.getDebts);
        const theirDebts = {
            rub: debts.filter((debt)=>debt.Debt>0 && debt.Currency===currencies.russian).reduce((result,current)=>result+current.Debt*1, 0),
            usd: debts.filter((debt)=>debt.Debt>0 && debt.Currency===currencies.american).reduce((result,current)=>result+current.Debt*1, 0),
            eur: debts.filter((debt)=>debt.Debt>0 && debt.Currency===currencies.european).reduce((result,current)=>result+current.Debt*1, 0)
        };
        const myDebts = {
            rub: debts.filter((debt)=>debt.Debt<0 && debt.Currency===currencies.russian).reduce((result,current)=>result+current.Debt*1, 0),
            usd: debts.filter((debt)=>debt.Debt<0 && debt.Currency===currencies.american).reduce((result,current)=>result+current.Debt*1, 0),
            eur: debts.filter((debt)=>debt.Debt<0 && debt.Currency===currencies.european).reduce((result,current)=>result+current.Debt*1, 0)
        };
        yield put({type: types.GET_STATISTICS_SUCCESS, myDebts: myDebts, theirDebts: theirDebts});

    } catch (error) {
        yield put({type: types.GET_STATISTICS_FAILURE, error});
    }

}