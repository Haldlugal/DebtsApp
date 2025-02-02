import {call, put} from "redux-saga/effects";
import * as types from './ActionTypes';
import * as debtTypes from '../debts/ActionTypes';
import personApi from '../../../api/PersonApi';
import authApi from "../../../api/AuthApi";
import {currencies} from "../../../helpers/Currencies";
import debtApi from "../../../api/DebtApi";
import {delay} from "q";

export function* getPersonsWithDebts() {
    try {
        yield put({ type: types.PERSON_FETCHING});
        const debts = yield call(debtApi.getDebts);
        const persons = yield call(personApi.fetchPersons);
        const personsWithDebts = yield call(searchPersonsWithDebts, persons, debts);
        const personsWithSortedDebts = yield call(sortPersonsDebts, personsWithDebts);

        yield put({ type: types.GET_PERSONS_SUCCESS, persons: personsWithSortedDebts });
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
        yield delay(2000);
        yield put({type: types.RESET_SUCCESS});
    } catch (error) {
        yield put({type: types.EDIT_PERSON_FAILURE, error});
        yield delay(4000);
        yield put({type: types.RESET_ERROR});
    }
}

export function* addPerson(action) {
    try {
        yield put({type: types.CREATE_PERSON_PROGRESS});
        action.payload.author_id = yield call(authApi.getUserLoggedIn);
        const personCreatedId = yield call(personApi.addPerson, action.payload);
        if (action.payload.fromDebt) {
            yield put({type: types.LAST_PERSON_CREATED, personCreatedId: personCreatedId[0]});
        }
        yield put({type: debtTypes.GET_ALL_PERSONS_REQUEST, from_add_person: true});
        yield put({type: types.CREATE_PERSON_SUCCESS});
    } catch (error) {
        yield put({type: types.CREATE_PERSON_FAILURE, error});
        yield delay(4000);
        yield put({type: types.RESET_ERROR});
    }
}

export function* deletePerson(action) {
    try {
        let debts = yield call(debtApi.getDebts);
        debts = debts.filter((debt)=> {
            return debt.Person===action.payload.id});
        for (let i = 0; i < debts.length; i++) {
            yield call(debtApi.deleteDebt, {id: debts[i].Nid});
        }
        yield call(personApi.deletePerson, action.payload);
        yield put({type: types.DELETE_PERSON_SUCCESS});
        yield call(getPersonsWithDebts);
    } catch (error) {
        yield put({type: types.DELETE_PERSON_FAILURE, error});
    }
}

export function searchPersonsWithDebts(persons,debts) {
    return persons && persons.map(person => {
        return {
            ...person,
            debts: debts.filter(debt => {
                return debt.Person === person.tid;
            })
        }
    });
}

export function sortPersonsDebts(personsWithDebts) {
    return personsWithDebts && personsWithDebts.map(person => {
        return {
            ...person,
            myDebtSummRub: person.debts.filter((debt) => debt.Debt < 0 && debt.Currency === currencies.russian)
                .reduce((resultDebt, currentDebt) => {
                    return resultDebt + currentDebt.Debt * 1
                }, 0),
            myDebtSummEur: person.debts.filter((debt) => debt.Debt < 0 && debt.Currency === currencies.european)
                .reduce((resultDebt, currentDebt) => {
                    return resultDebt + currentDebt.Debt * 1
                }, 0),
            myDebtSummDol: person.debts.filter((debt) => debt.Debt < 0 && debt.Currency === currencies.american)
                .reduce((resultDebt, currentDebt) => {
                    return resultDebt + currentDebt.Debt * 1
                }, 0),
            theirDebtSummRub: person.debts.filter((debt) => debt.Debt > 0 && debt.Currency === currencies.russian)
                .reduce((resultDebt, currentDebt) => {
                    return resultDebt + currentDebt.Debt * 1
                }, 0),
            theirDebtSummEur: person.debts.filter((debt) => debt.Debt > 0 && debt.Currency === currencies.european)
                .reduce((resultDebt, currentDebt) => {
                    return resultDebt + currentDebt.Debt * 1
                }, 0),
            theirDebtSummDol: person.debts.filter((debt) => debt.Debt > 0 && debt.Currency === currencies.american)
                .reduce((resultDebt, currentDebt) => {
                    return resultDebt + currentDebt.Debt * 1
                }, 0)
        }
    });
}