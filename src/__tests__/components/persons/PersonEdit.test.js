import React from 'react'
import { render, fireEvent, waitForElement, waitForElementToBeRemoved} from '@testing-library/react'
import PersonCreate from '../../../components/persons/PersonCreate';
import {Provider} from "react-redux";
import configureMockStore from 'redux-mock-store';
import {MemoryRouter, Route, Switch} from 'react-router-dom';
import '@testing-library/jest-dom';
import renderer from "react-test-renderer";
import "@testing-library/react/cleanup-after-each";
import {wrapWithProvider} from "../helpers/providerWrapper";

const mockStore = configureMockStore();
const store = mockStore({persons: {
    }});
const defaultProps = {
    match: { params: { id: 65 } },
};

const mockPersonToEdit = {
    id: 65,
    firstName: 'Dobby',
    secondName: 'TheSock'
};

const mockPersonToDelete = {
    id: 65
};

describe('PersonEdit', () => {
    test('there is edit button if id is defined', () => {
        const container = render(<Provider store={store}><PersonCreate {...defaultProps}/></Provider>);
        const editButton = container.getByText('Edit').closest('button');
        expect(editButton).toBeDefined();
    });

    test('change firstName field', () => {
        const container = render(<Provider store={store}><PersonCreate {...defaultProps}/></Provider>);
        const inputNode = container.getByLabelText('First Name');
        fireEvent.change(inputNode, { target: { value: 'test' } });
        expect(inputNode.value).toBe('test');
    });

    test('change secondName field', () => {
        const container = render(<Provider store={store}><PersonCreate {...defaultProps}/></Provider>);
        const inputNode = container.getByLabelText('Second Name');
        fireEvent.change(inputNode, { target: { value: 'test' } });
        expect(inputNode.value).toBe('test');
    });

    test('press edit with empty firstName field, firstName label should change', () => {
        const container = render(<Provider store={store}><PersonCreate {...defaultProps}/></Provider>);

        const inputNode = container.getByLabelText('First Name');
        const inputNodeLabel = container.getByText('First Name');
        const editButton = container.getByText('Edit').closest('button');
        fireEvent.change(inputNode, { target: { value: '' } });
        fireEvent.click(editButton);
        expect(inputNodeLabel.textContent).toBe('This field is required');
    });

    test('press edit with empty secondName field, secondName label should change', () => {
        const container = render(<Provider store={store}><PersonCreate {...defaultProps}/></Provider>);

        const inputNode = container.getByLabelText('Second Name');
        const inputNodeLabel = container.getByText('Second Name');
        const editButton = container.getByText('Edit').closest('button');
        fireEvent.change(inputNode, { target: { value: '' } });
        fireEvent.click(editButton);
        expect(inputNodeLabel.textContent).toBe('This field is required');
    });

    test('snackbar appears when edit is successful and then disappears', async () => {
        const defaultProps = {
            match: { params: { id: 1 } },
        };
        const store = mockStore({persons:{
                success:true
            }});

        const container = render(<Provider store={store}><PersonCreate {...defaultProps}/></Provider>);
        await waitForElement(() => container.getByText('Edit successfully!'));
        await waitForElementToBeRemoved(() => container.queryByText('Edit successfully!'));

    });

    test ('snackbar with error appears and then disappears if error happened while editing', async () => {
        const defaultProps = {
            match: { params: { id: 1 } },
        };
        const store = mockStore({persons:{
                success:false,
                error: {
                    message: 'test error'
                }
            }});
        const container = render(<Provider store={store}><PersonCreate {...defaultProps}/></Provider>);
        await waitForElement(() => container.getByText('test error'));
    });

    test ('pressing delete redirects to /persons', async () => {
        const defaultProps = {
            match: { params: { id: 1 } },
        };
        const Container = () =><Provider store={store}><PersonCreate {...defaultProps}/></Provider>;
        const FakePersonList = () => <div data-testid="fakePersonList" />;
        const {getByText, getByTestId } = render(
            <MemoryRouter>
                <Switch>
                    <Route exact path="/" component={Container} />
                    <Route path="/persons" component={FakePersonList} />
                </Switch>
            </MemoryRouter>,
        );
        const deleteButton = getByText('Delete Person').closest('button');
        fireEvent.click(deleteButton);
        await waitForElement(() => getByTestId("fakePersonList"));
    });

    test ('pressing edit button dispatches EDIT_PERSON_REQUEST', () =>{
        const container = render(<Provider store={store}><PersonCreate {...defaultProps}/></Provider>);
        const editButton = container.getByText('Edit').closest('button');
        const inputNodeFirstName = container.getByLabelText('First Name');
        const inputNodeSecondName = container.getByLabelText('Second Name');
        fireEvent.change(inputNodeFirstName, {target: {value: mockPersonToEdit.firstName}});
        fireEvent.change(inputNodeSecondName, {target: {value: mockPersonToEdit.secondName}});
        store.clearActions();
        fireEvent.click(editButton);
        expect(store.getActions()).toEqual([{
            type: 'EDIT_PERSON_REQUEST', payload: mockPersonToEdit
        }])
    });

    test ('pressing delete button dispatches DELETE_PERSON_REQUEST', () =>{
        const container = render(<MemoryRouter><Provider store={store}><PersonCreate {...defaultProps}/></Provider></MemoryRouter>);
        const deleteButton = container.getByText('Delete Person').closest('button');
        store.clearActions();
        fireEvent.click(deleteButton);
        expect(store.getActions()).toEqual([{
            type: 'DELETE_PERSON_REQUEST', payload: {id:mockPersonToEdit.id}
        }])
    });

    test('Person Edit snapshot', () => {
        const container = renderer.create(<Provider
            store={store}><PersonCreate {...defaultProps}/></Provider>).toJSON();
        expect(container).toMatchSnapshot();
})});

/*test('deleting invokes deleting api call', async ()=> {
        const personCreateComponent = <PersonCreate {...defaultProps}/>;
        const container = render(<MemoryRouter>{wrapWithProvider(personCreateComponent)}</MemoryRouter>);
        const deleteButton = container.getByText('Delete Person').closest('button');

        window.fetch = jest.fn().mockImplementation((url, params) =>{
            expect(url).toBe('http://drupal7/api/terms/'+mockPersonToDelete.id);
        });

        fireEvent.click(deleteButton);
        expect(window.fetch).toHaveBeenCalledWith('http://drupal7/api/terms/'+mockPersonToDelete.id, {"headers": {"Accept": "application/json"}, "method": "DELETE"});
    });*/

/*test('editing invokes editing api call', async ()=> {
        const personCreateComponent = <PersonCreate {...defaultProps}/>;
        const container = render(wrapWithProvider(personCreateComponent));
        const inputNodeFirstName = container.getByLabelText('First Name');
        const inputNodeSecondName = container.getByLabelText('Second Name');
        const editButton = container.getByText('Edit').closest('button');

        window.fetch = jest.fn().mockImplementation();

        fireEvent.change(inputNodeFirstName, {target: {value: mockPersonToEdit.firstName}});
        fireEvent.change(inputNodeSecondName, {target: {value: mockPersonToEdit.secondName}});
        fireEvent.click(editButton);
        expect(window.fetch).toHaveBeenCalledWith('http://drupal7/api/terms/',
            {
                "body": "{\"tid\":65,\"name\":\"Dobby TheSock\",\"vocabulary_machine_name\":\"persons\",\"field_persons_first_name\":{\"und\":[{\"value\":\"Dobby\"}]},\"field_persons_second_name\":{\"und\":[{\"value\":\"TheSock\"}]}}",
                "headers": {
                    "Accept": "application/json",
                    "content-type": "application/json",
                 },
                "method": "POST",
                "credentials": "include",
                "mode": "cors"
            }
        );
    });   */