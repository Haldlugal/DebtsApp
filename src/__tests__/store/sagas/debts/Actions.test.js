import { call, put } from "redux-saga/effects";
import * as types from "../../../../store/sagas/debts/ActionTypes";
import * as actions from "../../../../store/sagas/debts/Actions";
import personApi from "../../../../api/PersonApi";
import authApi from "../../../../api/AuthApi";
import debtApi from "../../../../api/DebtApi";
import {getDebts} from "../../../../store/sagas/debts/Actions";


describe('sagas debts actions', () => {
    it('get all persons', () => {
        const generator = actions.getAllPersons();

        expect(generator.next().value)
            .toEqual(put ({ type: types.FETCHING}));
        expect(generator.next().value)
            .toEqual(call(personApi.fetchPersons));
        expect(generator.next().value)
            .toEqual(put({ type: types.GET_ALL_PERSONS_SUCCESS, persons: undefined }));
        expect(generator.next().value)
            .toEqual(put ({ type: types.FETCHING_RESET}));
        expect(generator.throw('error').value)
            .toEqual(put({ type: types.GET_ALL_PERSONS_FAILURE, error:'error' }));
        expect(generator.next().value)
            .toEqual(put ({ type: types.FETCHING_RESET}));
    });

    it('create debt', () => {
        const fakePayload = {
            debt: 'fakeDebt'
        };
        const generator = actions.createDebt(fakePayload);

        expect(generator.next().value)
            .toEqual(call(authApi.getToken));
        expect(generator.next().value)
            .toEqual(call(debtApi.createDebt, fakePayload.debt));
        expect(generator.next().value)
            .toEqual(put({ type: types.CREATE_DEBT_SUCCESS}));
        expect(generator.throw('error').value)
            .toEqual(put ({ type: types.FAILURE, error:'error'}));
    });

    it('get debts', () => {
        const generator = actions.getDebts();

        expect(generator.next().value)
            .toEqual(put ({ type: types.FETCHING}));
        expect(generator.next().value)
            .toEqual(call(debtApi.getDebts));
        expect(generator.next().value)
            .toEqual(put({type: types.GET_DEBTS_SUCCESS, debts: undefined}));
        expect(generator.next().value)
            .toEqual(put ({ type: types.FETCHING_RESET}));
        expect(generator.throw('error').value)
            .toEqual(put ({ type: types.GET_DEBTS_FAILURE}));
        expect(generator.next().value)
            .toEqual(put ({ type: types.FETCHING_RESET}));
    });

    it('delete debt', () => {
        const fakePayload = {
            payload: 'fake'
        };
        const generator = actions.deleteDebt(fakePayload);

        expect(generator.next().value)
            .toEqual(call(debtApi.deleteDebt, fakePayload.payload));
        expect(generator.next().value)
            .toEqual(call(getDebts));
        expect(generator.next().value)
            .toEqual(put({type: types.DELETE_DEBT_SUCCESS}));
        expect(generator.throw('error').value)
            .toEqual(put ({ type: types.FAILURE, error:'error'}));
    });

    it('get single debt', () => {
        const fakePayload = {
            payload: 'fake'
        };
        const generator = actions.getSingleDebt(fakePayload);

        expect(generator.next().value)
            .toEqual(call(debtApi.getSingleDebt, fakePayload.payload));
        expect(generator.next().value)
            .toEqual(put({type: types.GET_DEBT_SUCCESS, debt: undefined}));
        expect(generator.throw('error').value)
            .toEqual(put ({ type: types.GET_DEBT_FAILURE, error:'error'}));
    });

    it('edit debt', () => {
        const fakePayload = {
            debt: 'fake'
        };
        const generator = actions.editDebt(fakePayload);

        expect(generator.next().value)
            .toEqual(call(authApi.getToken));
        expect(generator.next().value)
            .toEqual(call(debtApi.editDebt, fakePayload.debt));
        expect(generator.next().value)
            .toEqual(put({type: types.EDIT_DEBT_SUCCESS}));
        expect(generator.throw('error').value)
            .toEqual(put ({ type: types.EDIT_DEBT_FAILURE, error:'error'}));
    });

    it('statistics', () => {
        const generator = actions.getStatistics();

        expect(generator.next().value)
            .toEqual(put({type: types.FETCHING}));
        expect(generator.next('test').value)
            .toEqual(call(debtApi.getDebts));
        expect(generator.next().value)
            .toEqual(put({type: types.GET_STATISTICS_SUCCESS, myDebts: {"eur": null, "rub": null, "usd": null}, theirDebts: {"eur": null, "rub": null, "usd": null}}));
        expect(generator.throw('error').value)
            .toEqual(put ({ type: types.FAILURE, error:'error'}));
    });
});

