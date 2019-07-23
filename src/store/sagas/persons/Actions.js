import { call, put } from "redux-saga/effects";
import * as types from './ActionTypes';
import personApi from '../../../api/PersonApi';
import authApi from "../../../api/AuthApi";
import {currencies} from "../../../helpers/Currencies";
import debtApi from "../../../api/DebtApi";

export function* getPersons() {
    try {
        const persons = yield call(personApi.fetchPersons);
        const debts = yield call(debtApi.getDebts);

        let personsWithDebts = persons.map(person=>{
            return {
                ...person,
                debts: debts.filter(debt=>{
                    return debt.Person === person.tid;
                })
            }
        });

        personsWithDebts = personsWithDebts.map(person=>{
            return{
                ...person,
                myDebtSummRub: person.debts.filter((debt)=>debt.Debt<0 && debt.Currency===currencies.russian)
                    .reduce((resultDebt, currentDebt)=> {
                        return resultDebt + currentDebt.Debt*1
                    }, 0),
                myDebtSummEur: person.debts.filter((debt)=>debt.Debt<0 && debt.Currency===currencies.european)
                    .reduce((resultDebt, currentDebt)=> {
                        return resultDebt + currentDebt.Debt*1
                    }, 0),
                myDebtSummDol: person.debts.filter((debt)=>debt.Debt<0 && debt.Currency===currencies.american)
                    .reduce((resultDebt, currentDebt)=> {
                        return resultDebt + currentDebt.Debt*1
                    }, 0),
                theirDebtSummRub: person.debts.filter((debt)=>debt.Debt>0 && debt.Currency===currencies.russian)
                    .reduce((resultDebt, currentDebt)=> {
                        return resultDebt + currentDebt.Debt*1
                    }, 0),
                theirDebtSummEur: person.debts.filter((debt)=>debt.Debt>0 && debt.Currency===currencies.european)
                    .reduce((resultDebt, currentDebt)=> {
                        return resultDebt + currentDebt.Debt*1
                    }, 0),
                theirDebtSummDol: person.debts.filter((debt)=>debt.Debt>0 && debt.Currency===currencies.american)
                    .reduce((resultDebt, currentDebt)=> {
                        return resultDebt + currentDebt.Debt*1
                    }, 0)
            }
        });

        yield put({ type: types.GET_PERSONS_SUCCESS, persons: personsWithDebts });
    } catch (error) {
        yield put({ type: types.GET_PERSONS_FAILURE, error });
    }
}

export function* getSinglePerson(action) {
    try {
        yield put({ type: types.PERSON_FETCHING});
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
        yield put({ type: types.GET_PERSON_FAILURE, error});
    }
}

export function* editPerson(action) {
    try {
        yield call(personApi.editPerson, action.payload);
        yield put({type: types.EDIT_PERSON_SUCCESS});
    } catch (error) {
        yield put({type: types.EDIT_PERSON_FAILURE, error});
    }
}

export function* addPerson(action) {
    try {
        const auth = yield call(authApi.getUserLoggedIn);
        action.payload.author_id = auth[0].Uid;
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