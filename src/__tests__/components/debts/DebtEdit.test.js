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
const store = mockStore({debts: {
        debt: {
            CreationDate: "2019-07-24 00:00:00",
            Currency: "RUB",
            Debt: "1.00",
            ExpirationDate: "2019-07-24 00:00:00",
            person_id: "72"
        },
        persons: [{
            tid: 1,
            first_name: "Frodo",
            second_name: "Baggins"
        },
            {
                tid: 2,
                first_name: "Saruman",
                second_name: "TheWhite"
            }]}});

const defaultProps = {
    match: { params: { id: 1 } }
};

const mockDebt = {
    amount: '200',
    person: '1',
    currency: 'USD',
    dateCreated: moment().format('MM/DD/YYYY'),
    dateExpires: moment().format('MM/DD/YYYY')
};

describe('DebtEdit', () => {

    test('there is edit button if id is defined', () => {
        const container = render(<Provider store={store}><DebtCreate {...defaultProps}/></Provider>);
        const editButton = container.getByText('Edit').closest('button');
        expect(editButton).toBeDefined();
    });

    test('successful deleting redirects to /debts', async () => {
        const store = mockStore({debts: {
                debtDeleted: true,
                debt: {
                    CreationDate: "2019-07-24 00:00:00",
                    Currency: "RUB",
                    Debt: "1.00",
                    ExpirationDate: "2019-07-24 00:00:00",
                    person_id: "72"
                },
                persons: [{
                    tid: 1,
                    first_name: "Frodo",
                    second_name: "Baggins"
                },
                    {
                        tid: 2,
                        first_name: "Saruman",
                        second_name: "TheWhite"
                    }]}});
        const Container = () => <Provider store={store}><DebtCreate {...defaultProps}/></Provider>;
        const FakeDebts = () => <div data-testid="fakeDebts"/>;
        const container = render(
            <MemoryRouter>
                <Switch>
                    <Route exact path="/" component={Container}/>
                    <Route path="/debts" component={FakeDebts}/>
                </Switch>
            </MemoryRouter>,
        );

        await waitForElement(() => container.getByTestId("fakeDebts"));
    });

    test ('pressing delete button dispatches DELETE_DEBT_REQUEST', () =>{
        const container = render(<Provider store={store}><DebtCreate {...defaultProps}/></Provider>);
        const deleteButton = container.getByText('Delete Debt').closest('button');
        store.clearActions();
        fireEvent.click(deleteButton);
        expect(store.getActions()).toEqual([{
            type: 'DELETE_DEBT_REQUEST', payload: {id: defaultProps.match.params.id}
        }])
    });

    test ('pressing edit button dispatches EDIT_DEBT_REQUEST', () => {
        const container = render(<Provider store={store}><DebtCreate {...defaultProps}/></Provider>);
        const editButton = container.getByText('Edit').closest('button');
        store.clearActions();
        fireEvent.click(editButton);
        expect(store.getActions()).toEqual([{
            type: 'EDIT_DEBT_REQUEST',
            debt: {
                id: defaultProps.match.params.id,
                amount: "1.00",
                person: '72',
                currency: 'RUB',
                dateCreated: "07/24/2019",
                dateExpires: "07/24/2019"
            }
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

    test('DebtEdit dispatches GET_DEBT_REQUEST and GET_ALL_PERSONS_REQUEST', async () => {
        store.clearActions();
        act(()=>{render(<Provider store={store}><DebtCreate {...defaultProps}/></Provider>)});
        expect(store.getActions()[0]).toEqual({type: types.GET_ALL_PERSONS_REQUEST});
        expect(store.getActions()[1]).toEqual({type: types.GET_DEBT_REQUEST, payload: defaultProps.match.params.id});
    });

    test('debt edit snapshot', () => {
        const container = renderer.create(<Provider
            store={store}><DebtCreate {...defaultProps}/></Provider>).toJSON();
        expect(container).toMatchSnapshot();
    });
});