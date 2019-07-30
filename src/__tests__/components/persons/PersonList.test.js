import React from 'react'
import {render, fireEvent, waitForElement, act} from '@testing-library/react'
import PersonList from '../../../components/persons/PersonList';
import {Provider} from "react-redux";
import {MemoryRouter, Route, Switch} from 'react-router-dom';
import '@testing-library/jest-dom';
import "@testing-library/react/cleanup-after-each";
import renderer from "react-test-renderer";
import {store} from '../helpers/personsMockStore';


afterEach(() => {
    store.clearActions();
});

describe('PersonList', () => {
    test('Pressing create person button leads to create person form', async ()=>{
        const Container = () =><Provider store={store}><PersonList/></Provider>;
        const FakeCreateForm = () => <div data-testid="fakeCreateForm" />;
        const test  = render(
        <MemoryRouter>
            <Switch>
                <Route exact path="/" component={Container} />
                <Route path="/persons/create" component={FakeCreateForm} />
            </Switch>
        </MemoryRouter>);
        const createButton = test.getByText('Create Person').closest('button');
        fireEvent.click(createButton);
        await waitForElement(() => test.getByTestId("fakeCreateForm"));
    });

    test ('Pressing on Person Card leads to edit person form', async () => {
        const Container = () =><Provider store={store}><PersonList/></Provider>;
        const FakeCreateForm = () => <div data-testid="fakeEditForm" />;
        const test  = render(
            <MemoryRouter>
                <Switch>
                    <Route exact path="/" component={Container} />
                    <Route path="/persons/edit/:id" component={FakeCreateForm} />
                </Switch>
            </MemoryRouter>);
        const personCard = test.getByText('Ulix Turner');
        fireEvent.click(personCard);
        await waitForElement(()=> test.getByTestId('fakeEditForm'));
    });

    test('PersonList dispatches GET_PERSONS_REQUEST', async () => {
        act(()=>{render(<MemoryRouter><Provider store={store}><PersonList/></Provider></MemoryRouter>)});
        expect(store.getActions()).toEqual([{
            type: 'GET_PERSONS_REQUEST'
        }])
    });

    test('Searching filters the list of persons', () => {
        const container = render(<MemoryRouter><Provider store={store}><PersonList/></Provider></MemoryRouter>);
        const searchField = container.getByLabelText('Search');
        fireEvent.change(searchField, { target: { value: 'Ulix' } });
        expect(container).toMatchSnapshot();
    });

    test('Sorting by name sorts the list of persons by name', () =>{
        const container = render(<MemoryRouter><Provider store={store}><PersonList/></Provider></MemoryRouter>);
        const sortField = container.getByLabelText('Sort By');
        fireEvent.change(sortField, { target: { value: 'name' } });
        expect(container).toMatchSnapshot();
    });

    test('Sorting by debt in rubles sorts the list of persons by debt in rubles (Descending)', () =>{
        const container = render(<MemoryRouter><Provider store={store}><PersonList/></Provider></MemoryRouter>);
        const sortField = container.getByLabelText('Sort By');
        fireEvent.change(sortField, { target: { value: 'rubDebt' } });
        expect(container).toMatchSnapshot();
    });

    test('Sorting by debt in euro sorts the list of persons by debt in euro (Ascending)', () =>{
        const container = render(<MemoryRouter><Provider store={store}><PersonList/></Provider></MemoryRouter>);
        const sortField = container.getByLabelText('Sort By');
        const sortOrder = container.getByLabelText('sortOrder');
        fireEvent.change(sortField, { target: { value: 'eurDebt' } });
        fireEvent.change(sortOrder, { target: { value: 'asc' } });
        expect(container).toMatchSnapshot();
    });

    test('Sorting by debt in usd sorts the list of persons by debt in usd (Descending)', () =>{
        const container = render(<MemoryRouter><Provider store={store}><PersonList/></Provider></MemoryRouter>);
        const sortField = container.getByLabelText('Sort By');
        const sortOrder = container.getByLabelText('sortOrder');
        fireEvent.change(sortField, { target: { value: 'usdDebt' } });
        fireEvent.change(sortOrder, { target: { value: 'desc' } });
        expect(container).toMatchSnapshot();
    });

    test ('Person List snapshot', ()=>{
        const container = renderer.create(<MemoryRouter><Provider
            store={store}><PersonList/></Provider></MemoryRouter>).toJSON();
        expect(container).toMatchSnapshot();
    });
});

/*test('PersonList invoke getPersonsWithDebts saga', async () => {
        const mockSuccessResponse = {};
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
        const mockFetchPromise = Promise.resolve({ // 3
            status: 200,
            json: () => mockJsonPromise,
        });
       window.fetch = jest.fn().mockImplementation(()=> mockFetchPromise );

       act(()=>{render(wrapWithProvider(<MemoryRouter><PersonList/></MemoryRouter>))});
   });*/



