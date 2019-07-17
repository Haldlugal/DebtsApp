import React from 'react'
import { render, fireEvent, waitForElement} from '@testing-library/react'
import PersonCreate from '../../../components/persons/PersonCreate';
import {Provider} from "react-redux";
import configureMockStore from 'redux-mock-store';
import {MemoryRouter, Route, Switch} from 'react-router-dom';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import "@testing-library/react/cleanup-after-each";
import personApi from "../../../api/PersonApi";
import {wrapWithProvider} from "../../providerWrapper";

const mockStore = configureMockStore();
const store = mockStore({persons: {
    }});

const defaultProps = {
    match: { params: { id: undefined } },
};

const mockPersonToCreate = {
    firstName: 'Dobby',
    secondName: 'TheSock'
};

describe('PersonCreate', () => {
    test('there is create button if id is undefined', () => {
        const container = render(<Provider store={store}><PersonCreate {...defaultProps}/></Provider>);
        const editButton = container.getByText('Create').closest('button');
    });

    test('change firstName field', () => {
        const container = render(<Provider store={store}><PersonCreate {...defaultProps}/></Provider>);
        const inputNode = container.getByLabelText('First Name');
        fireEvent.change(inputNode, {target: {value: 'test'}});
        expect(inputNode.value).toBe('test');
    });

    test('change secondName field', () => {
        const container = render(<Provider store={store}><PersonCreate {...defaultProps}/></Provider>);
        const inputNode = container.getByLabelText('Second Name');
        fireEvent.change(inputNode, {target: {value: 'test'}});
        expect(inputNode.value).toBe('test');
    });

    test('press create with empty firstName field, firstName label should change', () => {
        const container = render(<Provider store={store}><PersonCreate {...defaultProps}/></Provider>);

        const inputNode = container.getByLabelText('First Name');
        const inputNodeLabel = container.getByText('First Name');
        const editButton = container.getByText('Create').closest('button');
        fireEvent.change(inputNode, {target: {value: ''}});
        fireEvent.click(editButton);
        expect(inputNodeLabel.textContent).toBe('This field is required');
    });

    test('press create with empty secondName field, secondName label should change', () => {
        const container = render(<Provider store={store}><PersonCreate {...defaultProps}/></Provider>);

        const inputNode = container.getByLabelText('Second Name');
        const inputNodeLabel = container.getByText('Second Name');
        const editButton = container.getByText('Create').closest('button');
        fireEvent.change(inputNode, {target: {value: ''}});
        fireEvent.click(editButton);
        expect(inputNodeLabel.textContent).toBe('This field is required');
    });

    test('successful create redirects to /persons', async () => {
        const defaultProps = {
            match: {params: {id: undefined}},
        };
        const store = mockStore({
            persons: {
                success: true
            }
        });
        const Container = () => <Provider store={store}><PersonCreate {...defaultProps}/></Provider>;
        const FakePersonList = () => <div data-testid="fakePersonList"/>;
        const {getByTestId} = render(
            <MemoryRouter>
                <Switch>
                    <Route exact path="/" component={Container}/>
                    <Route path="/persons" component={FakePersonList}/>
                </Switch>
            </MemoryRouter>,
        );

        await waitForElement(() => getByTestId("fakePersonList"));
    });

    test('creating invokes addPerson api call', async () => {
        const personCreateComponent = <PersonCreate {...defaultProps}/>;
        const container = render(<MemoryRouter>{wrapWithProvider(personCreateComponent)}</MemoryRouter>);
        const createButton = container.getByText('Create').closest('button');
        const inputNodeFirstName = container.getByLabelText('First Name');
        const inputNodeSecondName = container.getByLabelText('Second Name');
        window.fetch = jest.fn().mockImplementation();

        fireEvent.change(inputNodeFirstName, {target: {value: mockPersonToCreate.firstName}});
        fireEvent.change(inputNodeSecondName, {target: {value: mockPersonToCreate.secondName}});
        fireEvent.click(createButton);

        expect(window.fetch).toHaveBeenCalledWith('http://drupal7/api/terms',
            {
                "body": "{\"vid\":\"2\",\"name\":\"Dobby TheSock\",\"field_persons_first_name\":{\"und\":[{\"value\":\"Dobby\"}]},\"field_persons_second_name\":{\"und\":[{\"value\":\"TheSock\"}]}}",
                "headers": {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                },
                "method": "POST",
            }
        );

    });

    test('person create snapshot', () => {
        const container = renderer.create(<Provider
            store={store}><PersonCreate {...defaultProps}/></Provider>).toJSON();
        expect(container).toMatchSnapshot();
    });
});