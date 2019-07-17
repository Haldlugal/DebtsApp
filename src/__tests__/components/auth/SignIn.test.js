import {render, fireEvent} from "@testing-library/react";
import {Provider} from "react-redux";
import Logout from "../../../components/auth/Logout";
import authApi from "../../../api/AuthApi";
import renderer from "react-test-renderer";
import React from "react";
import configureMockStore from "redux-mock-store";
import SignInForm from "../../../components/auth/SignIn";
import PersonCreate from "../../../components/persons/PersonCreate";
import {wrapWithProvider} from "../../providerWrapper";

const mockStore = configureMockStore();
const store = mockStore({persons: {
    }});

const mockPersonToLogin = {
    firstName: 'Dobby',
    password: 'Iwanttobreakfree'
};

describe('SignIn', () => {
    test('SignIn api call is invoked when sign in button pressed and fields are validated', async () => {
        const container = render(wrapWithProvider(<SignInForm/>));
        const inputNodeLogin = container.getByLabelText('Login');
        const inputNodePassword = container.getByLabelText('Password');
        const loginBtn = container.getByText('Sign In').closest('button');

        window.fetch = jest.fn(()=>Promise.resolve());

        fireEvent.change(inputNodeLogin, {target: {value: mockPersonToLogin.firstName}});
        fireEvent.change(inputNodePassword, {target: {value: mockPersonToLogin.password}});
        fireEvent.click(loginBtn);

        expect(window.fetch).toHaveBeenCalledWith("http://drupal7/services/session/token",
            {"headers": {"Accept": "application/json", "content-type": "plain/text"}, "method": "POST"}
        );
        expect(window.fetch).toHaveBeenCalledWith('http://drupal7/api/user/login');
    });

    test('change login field', () => {
        const container = render(<Provider store={store}><SignInForm/></Provider>);
        const inputNode = container.getByLabelText('Login');
        fireEvent.change(inputNode, { target: { value: 'test' } });
        expect(inputNode.value).toBe('test');
    });

    test('change password field', () => {
        const container = render(<Provider store={store}><SignInForm/></Provider>);
        const inputNode = container.getByLabelText('Password');
        fireEvent.change(inputNode, { target: { value: 'test' } });
        expect(inputNode.value).toBe('test');
    });

    test('press edit with empty login field, login label should change', () => {
        const container = render(<Provider store={store}><SignInForm/></Provider>);

        const loginNode = container.getByLabelText('Login');
        const loginNodeLabel = container.getByText('Login');
        const loginButton = container.getByText('Sign In').closest('button');
        fireEvent.change(loginNode, { target: { value: '' } });
        fireEvent.click(loginButton);
        expect(loginNodeLabel.textContent).toBe('This field is required');
    });

    test('press edit with empty password field, password label should change', () => {
        const container = render(<Provider store={store}><SignInForm/></Provider>);

        const passwordNode = container.getByLabelText('Password');
        const passwordNodeLabel = container.getByText('Password');
        const loginButton = container.getByText('Sign In').closest('button');
        fireEvent.change(passwordNode, { target: { value: '' } });
        fireEvent.click(loginButton);
        expect(passwordNodeLabel.textContent).toBe('This field is required');
    });

    test ('SignIn snapshot', ()=>{
        const container = renderer.create(<Provider
            store={store}><SignInForm/></Provider>).toJSON();
        expect(container).toMatchSnapshot();
    });
});