import {Provider} from "react-redux";
import {store} from "../helpers/debtsMockStore";
import {act, fireEvent, render, waitForElement} from "@testing-library/react";
import renderer from "react-test-renderer";
import React from "react";
import "@testing-library/react/cleanup-after-each";
import DebtList from "../../../components/debts/DebtList";
import {MemoryRouter, Route, Switch} from 'react-router-dom';

afterEach(()=>{
   store.clearActions();
});

describe('DebtList', () => {
    test('Pressing create debt button leads to create debt form', async ()=>{
        const Container = () =><Provider store={store}><DebtList/></Provider>;
        const FakeCreateForm = () => <div data-testid="fakeCreateForm" />;
        const test  = render(
            <MemoryRouter>
                <Switch>
                    <Route exact path="/" component={Container} />
                    <Route path="/debts/create" component={FakeCreateForm} />
                </Switch>
            </MemoryRouter>);
        const createButton = test.getByText('Create Debt').closest('button');
        fireEvent.click(createButton);
        await waitForElement(() => test.getByTestId("fakeCreateForm"));
    });

    test ('Pressing on Debt Card leads to edit person form', async () => {
        const Container = () =><Provider store={store}><DebtList/></Provider>;
        const FakeCreateForm = () => <div data-testid="fakeEditForm" />;
        const test  = render(
            <MemoryRouter>
                <Switch>
                    <Route exact path="/" component={Container} />
                    <Route path="/debts/edit/:id" component={FakeCreateForm} />
                </Switch>
            </MemoryRouter>);
        const personCard = test.getByText('Marcus TheWild');
        fireEvent.click(personCard);
        await waitForElement(()=> test.getByTestId('fakeEditForm'));
    });

    test('DebtList dispatches GET_DEBTS_REQUEST', async () => {
        store.clearActions();
        act(()=>{render(<MemoryRouter><Provider store={store}><DebtList/></Provider></MemoryRouter>)});
        expect(store.getActions()).toContainEqual({
            type: 'GET_DEBTS_REQUEST'
        })
    });

    test('Searching filters the list of debts', () => {
        const container = render(<MemoryRouter><Provider store={store}><DebtList/></Provider></MemoryRouter>);
        const searchField = container.getByLabelText('Search');
        fireEvent.change(searchField, { target: { value: 'Marcus' } });
        expect(container).toMatchSnapshot();
    });

    test('Sorting by name sorts the list of debts by name', () =>{
        const container = render(<MemoryRouter><Provider store={store}><DebtList/></Provider></MemoryRouter>);
        const sortField = container.getByLabelText('Sort By');
        fireEvent.change(sortField, { target: { value: 'Name' } });
        expect(container).toMatchSnapshot();
    });

    test('Sorting by currency sorts the list of debts by currency (Descending)', () =>{
        const container = render(<MemoryRouter><Provider store={store}><DebtList/></Provider></MemoryRouter>);
        const sortField = container.getByLabelText('Sort By');
        fireEvent.change(sortField, { target: { value: 'Currency' } });
        expect(container).toMatchSnapshot();
    });

    test('Sorting by amount sorts the list of debts by amount (Ascending)', () =>{
        const container = render(<MemoryRouter><Provider store={store}><DebtList/></Provider></MemoryRouter>);
        const sortField = container.getByLabelText('Sort By');
        const sortOrder = container.getByLabelText('sortOrder');
        fireEvent.change(sortField, { target: { value: 'Amount' } });
        fireEvent.change(sortOrder, { target: { value: 'asc' } });
        expect(container).toMatchSnapshot();
    });

    test('Sorting by deadline sorts the list of debts by deadline (Descending)', () =>{
        const container = render(<MemoryRouter><Provider store={store}><DebtList/></Provider></MemoryRouter>);
        const sortField = container.getByLabelText('Sort By');
        const sortOrder = container.getByLabelText('sortOrder');
        fireEvent.change(sortField, { target: { value: 'Deadline' } });
        fireEvent.change(sortOrder, { target: { value: 'desc' } });
        expect(container).toMatchSnapshot();
    });

    test('Sorting by date taken sorts the list of debts by date taken (Descending)', () =>{
        const container = render(<MemoryRouter><Provider store={store}><DebtList/></Provider></MemoryRouter>);
        const sortField = container.getByLabelText('Sort By');
        const sortOrder = container.getByLabelText('sortOrder');
        fireEvent.change(sortField, { target: { value: 'date taken' } });
        fireEvent.change(sortOrder, { target: { value: 'desc' } });
        expect(container).toMatchSnapshot();
    });

    test ('DebtList snapshot', ()=>{
        const container = renderer.create(<MemoryRouter><Provider
            store={store}><DebtList/></Provider></MemoryRouter>).toJSON();
        expect(container).toMatchSnapshot();
    });
});