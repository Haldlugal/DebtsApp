import { call, put } from "redux-saga/effects";
import * as types from "../../../../store/sagas/persons/ActionTypes";
import * as actions from "../../../../store/sagas/persons/Actions";
import personApi from "../../../../api/PersonApi";
import authApi from "../../../../api/AuthApi";
import debtApi from "../../../../api/DebtApi";
import {searchPersonsWithDebts,sortPersonsDebts} from "../../../../store/sagas/persons/Actions";

const mockPersons = [
        {
            Author_id: "1",
            first_name: "Shadowy ",
            name: "Shadowy  Person",
            second_name: "Person",
            tid: "89"
        },
        {
            Author_id: "1",
            first_name: "Dark ",
            name: "Dark  Person",
            second_name: "Person",
            tid: "90"
        },
];

const mockDebts = [
        {
            Currency: "RUB",
            Debt: "1000.00",
            Name: "Shadowy  Person",
            Nid: "371",
            Person: "89"
        },
        {
            Currency: "RUB",
            Debt: "-500.00",
            Name: "Shadowy  Person",
            Nid: "372",
            Person: "89"
        },
        {
            Currency: "EUR",
            Debt: "200.00",
            Name: "Shadowy  Person",
            Nid: "373",
            Person: "89"
        },
    ];
const mockPersonsWithDebts = [
    {
        Author_id: "1",
        debts: mockDebts,
        first_name: "Shadowy ",
        name: "Shadowy  Person",
        second_name: "Person",
        tid: "89"
    },
    {
        Author_id: "1",
        debts: [],
        first_name: "Dark ",
        name: "Dark  Person",
        second_name: "Person",
        tid: "90"
    },
];

const mockPersonsWithDebtsSorted = [
    {
        Author_id: "1",
        debts: mockDebts,
        first_name: "Shadowy ",
        name: "Shadowy  Person",
        second_name: "Person",
        tid: "89",
        myDebtSummDol: 0,
        myDebtSummEur: 0,
        myDebtSummRub: -500,
        theirDebtSummDol: 0,
        theirDebtSummEur: 200,
        theirDebtSummRub: 1000
    },
    {
        Author_id: "1",
        debts: [],
        first_name: "Dark ",
        name: "Dark  Person",
        second_name: "Person",
        tid: "90",
        myDebtSummDol: 0,
        myDebtSummEur: 0,
        myDebtSummRub: 0,
        theirDebtSummDol: 0,
        theirDebtSummEur: 0,
        theirDebtSummRub: 0
    },
];
describe('sagas persons actions', () => {
    it('fetching persons with debts', () => {
        const generator = actions.getPersonsWithDebts();

        expect(generator.next().value)
            .toEqual(put({ type: types.PERSON_FETCHING}));
        expect(generator.next().value)
            .toEqual(call(debtApi.getDebts));
        expect(generator.next(mockDebts).value)
            .toEqual(call(personApi.fetchPersons));
        expect(generator.next(mockPersons).value)
            .toEqual(call(searchPersonsWithDebts, mockPersons, mockDebts));
        expect(generator.next(mockPersonsWithDebts).value)
            .toEqual(call (sortPersonsDebts, mockPersonsWithDebts));
        expect(generator.next().value)
            .toEqual(put({type: 'GET_PERSONS_SUCCESS', persons: undefined}));
        expect(generator.throw('error').value)
            .toEqual(put({ type: types.GET_PERSONS_FAILURE, error:'error' }));
    });

    it('fetching single person if id is defined', () => {
        const fakePayload = {
            type: types.GET_PERSON_REQUEST,
            payload: {
                id: 65
            }
        };
        const generator = actions.getSinglePerson(fakePayload);
        expect(generator.next().value)
            .toEqual(put({ type: types.PERSON_FETCHING}));
        expect(generator.next().value)
            .toEqual(call(personApi.fetchSinglePerson,fakePayload.payload.id));
        expect(generator.next('test').value)
            .toEqual(put({type: types.GET_PERSON_SUCCESS, person: 'test'}));
        expect(generator.throw('error').value)
            .toEqual(put({ type: types.GET_PERSON_FAILURE, error:'error' }));
    });

    it('fetching single person if id is undefined', () => {
        const fakePayload = {
            payload: {
                id: undefined
            }
        };
        const generator = actions.getSinglePerson(fakePayload);
        expect(generator.next().value)
            .toEqual(put({ type: types.PERSON_FETCHING}));
        expect(generator.next().value)
            .toEqual(put({type: types.GET_PERSON_SUCCESS, person: {firstName: '', secondName: ''}}));
        expect(generator.throw('error').value)
            .toEqual(put({ type: types.GET_PERSON_FAILURE, error:'error' }));
    });

    it('editing person', () => {
        const fakeAction = {
            payload: 65
        };
        const generator = actions.editPerson(fakeAction);
        expect(generator.next().value)
            .toEqual(call(personApi.editPerson,fakeAction.payload));
        expect(generator.next().value)
            .toEqual(put({type: types.EDIT_PERSON_SUCCESS}));
        expect(generator.throw('error').value)
            .toEqual(put({type: types.EDIT_PERSON_FAILURE, error:'error'}));
    });

    it('adding person', async () => {
        const fakeAction = {
            payload: {
                firstName: 'test1',
                secondName: 'test2',
                author_id: 42
            }
        };
        const generator = actions.addPerson(fakeAction);
        authApi.getUserLoggedIn = jest.fn().mockImplementation(() => Promise.resolve(42));
        expect(generator.next().value)
            .toEqual(call(authApi.getUserLoggedIn));
        expect(generator.next().value)
            .toEqual(call(personApi.addPerson, fakeAction.payload));
        expect(generator.next().value)
            .toEqual(put({type: types.CREATE_PERSON_SUCCESS}));
        expect(generator.throw('error').value)
            .toEqual(put({type: types.CREATE_PERSON_FAILURE, error:'error'}));
    });

    it('deleting person', () => {
        const fakeAction = {
            payload: {
                id: 65
            }
        };
        const generator = actions.deletePerson(fakeAction);
        expect(generator.next().value)
            .toEqual(call(personApi.deletePerson, fakeAction.payload));
        expect(generator.next().value)
            .toEqual(put({type: types.DELETE_PERSON_SUCCESS}));
        expect(generator.next().value)
            .toEqual(call(actions.getPersonsWithDebts));
        expect(generator.throw('error').value)
            .toEqual(put({type: types.DELETE_PERSON_FAILURE, error:'error'}));
    });

    it ('searchPersonsWithDebts from the list of persons and list of debts', ()=>{
        expect(searchPersonsWithDebts(mockPersons, mockDebts)).toEqual(mockPersonsWithDebts);
    });

    it ('sortPersonsDebts summs up all debts of person into currency categories', ()=>{
        expect(sortPersonsDebts(mockPersonsWithDebts)).toEqual(mockPersonsWithDebtsSorted);
    })

});

