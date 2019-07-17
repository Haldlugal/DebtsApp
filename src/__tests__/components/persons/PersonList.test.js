import React from 'react'
import { render, fireEvent, waitForElement, waitForElementToBeRemoved} from '@testing-library/react'
import PersonList from '../../../components/persons/PersonList';
import {Provider} from "react-redux";
import configureMockStore from 'redux-mock-store';
import {MemoryRouter, Route, Switch} from 'react-router-dom';
import '@testing-library/jest-dom';
import "@testing-library/react/cleanup-after-each";
import renderer from "react-test-renderer";
import PersonCreate from "../../../components/persons/PersonCreate";

const mockStore = configureMockStore();
const store = mockStore({persons: { persons :[
        {first_name: 'Harry', second_name: 'FromThePot', tid: 1},
        {first_name: 'Albus', second_name: 'DumbleBeard', tid: 2}
    ]}
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
        const personCard = test.getByText('Harry FromThePot');
        fireEvent.click(personCard);
        await waitForElement(()=> test.getByTestId('fakeEditForm'));
    });

    test ('Person List snapshot', ()=>{
        const container = renderer.create(<MemoryRouter><Provider
            store={store}><PersonList/></Provider></MemoryRouter>).toJSON();
        expect(container).toMatchSnapshot();
    });

});