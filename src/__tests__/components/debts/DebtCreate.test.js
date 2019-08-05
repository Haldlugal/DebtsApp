import configureMockStore from "redux-mock-store";
import {act, fireEvent, render, waitForElement} from "@testing-library/react";
import {Provider} from "react-redux";
import React from "react";
import DebtCreate from "../../../components/debts/DebtCreate";
import renderer from "react-test-renderer";
import {MemoryRouter, Route, Switch} from "react-router-dom";
import "@testing-library/react/cleanup-after-each";
import moment from "moment";
import * as types from "../../../store/sagas/debts/ActionTypes";

const mockStore = configureMockStore();
const store = mockStore({
        persons: {
            creating: false,
        },
        debts: {
            persons: [{
                tid: 1,
                first_name: "Frodo",
                second_name: "Baggins"
            },
            {
                tid: 2,
                first_name: "Saruman",
                second_name: "TheWhite"
            }]}},
    );

const defaultProps = {
    match: { params: { id: undefined } }
};

const mockDebt = {
    amount: '200',
    person: 'Frodo Baggins',
    currency: 'USD',
    dateCreated: moment().format('MM/DD/YYYY'),
    dateExpires: moment().format('MM/DD/YYYY')
};
beforeEach(()=>{
   store.clearActions();
});
describe('DebtCreate', () => {

    test('successful create redirects to /debts', async () => {
        const store = mockStore({
                debts: {
                    success: true,
                    persons: [{
                        tid: 1,
                        first_name: "Frodo",
                        second_name: "Baggins"
                    },
                    {
                        tid: 2,
                        first_name: "Saruman",
                        second_name: "TheWhite"
                    }]},
                persons: {
                    creating: false,
                }},
                );
        const Container = () => <Provider store={store}><DebtCreate {...defaultProps}/></Provider>;
        const FakeDebts = () => <div data-testid="fakeDebts"/>;
        const {getByTestId} = render(
            <MemoryRouter>
                <Switch>
                    <Route exact path="/" component={Container}/>
                    <Route path="/debts" component={FakeDebts}/>
                </Switch>
            </MemoryRouter>,
        );
        await waitForElement(() => getByTestId("fakeDebts"));
    });

    test ('pressing create button dispatches CREATE_DEBT_REQUEST', async () =>{
        const container = render(<Provider store={store}><DebtCreate {...defaultProps}/></Provider>);
        store.clearActions();
        const createButton = container.getByText('Create').closest('button');
        const inputAmount = container.getByLabelText('Amount');

        let inputPerson;
        let inputCurrency;
        await waitForElement(() => inputPerson = document.getElementById('react-select-3-input'));
        await waitForElement(() => inputCurrency = document.getElementById('react-select-2-input'));

        fireEvent.change(inputAmount, {target: {value: mockDebt.amount}});
        fireEvent.change(inputPerson, {target: {value: mockDebt.person}});
        fireEvent.change(inputCurrency, {target: {value: mockDebt.currency}});
        console.log(inputCurrency);

        fireEvent.click(createButton);
        expect(store.getActions()).toEqual([{
            type: 'CREATE_DEBT_REQUEST', debt: mockDebt
        }])
    });

    test ('error snackbar is shown in case of error', ()=> {
        const defaultProps = {
            match: {params: {id: undefined}},
        };
        const store = mockStore({
            debts: {
                persons: [{
                    tid: 1,
                    first_name: "Frodo",
                    second_name: "Baggins"
                },
                    {
                        tid: 2,
                        first_name: "Saruman",
                        second_name: "TheWhite"
                }],
                success: false,
                error: 'i am error message!'
            }
        });
        const container = render(<Provider store={store}><DebtCreate {...defaultProps}/></Provider>);
        const snackbar = container.getByText('i am error message!');
        expect(snackbar).toBeDefined();
    });

    test('DebtCreate dispatches GET_ALL_PERSONS_REQUEST', async () => {
        act(()=>{render(<Provider store={store}><DebtCreate {...defaultProps}/></Provider>)});
        expect(store.getActions()[0]).toEqual({type: types.GET_ALL_PERSONS_REQUEST});

    });

    test('debt create snapshot', () => {
        const container = renderer.create(<Provider
            store={store}><DebtCreate {...defaultProps}/></Provider>).toJSON();
        expect(container).toMatchSnapshot();
    });
});