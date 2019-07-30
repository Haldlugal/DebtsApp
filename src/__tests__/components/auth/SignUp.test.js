import renderer from "react-test-renderer";
import {render, fireEvent} from "@testing-library/react";
import {Provider} from "react-redux";
import SignInForm from "../../../components/auth/SignIn";
import React from "react";
import configureMockStore from "redux-mock-store";
import SignUpForm from "../../../components/auth/SignUp";

const mockStore = configureMockStore();
const store = mockStore({
    auth: {
        authSuccess: false
    }

});

const mockedUser = {
    login: 'Umbra',
    password: 'TheDark',
    email: 'umbra@dark.ru',
    firstName: 'Rlieh'
};

afterEach(()=>{
    store.clearActions();
});

describe('SignUp', () => {

    test('SIGN_UP_REQUEST is dispatched on signing up', ()=>{
        const container = render(<Provider store={store}><SignUpForm/></Provider>);
        const inputNodeLogin = container.getByLabelText('Login');
        const inputNodePassword = container.getByLabelText('Password');
        const inputNodeRepeatPassword = container.getByLabelText('Repeat Password');
        const inputNodeMail = container.getByLabelText('Email');
        const inputNodeFirstName = container.getByLabelText('First Name');
        const signUpButton = container.getByText('Sign Up').closest('button');

        fireEvent.change(inputNodeLogin, {target: {value: mockedUser.login}});
        fireEvent.change(inputNodePassword, {target: {value: mockedUser.password}});
        fireEvent.change(inputNodeRepeatPassword, {target: {value: mockedUser.password}});
        fireEvent.change(inputNodeMail, {target: {value: mockedUser.email}});
        fireEvent.change(inputNodeFirstName, {target: {value: mockedUser.firstName}});
        fireEvent.click(signUpButton);

        expect(store.getActions()).toEqual([
            {payload: {
                email:mockedUser.email,
                firstName: mockedUser.firstName,
                login: mockedUser.login,
                password: mockedUser.password},
            type: 'SIGN_UP_REQUEST'}]);
    });

    test ('Successful signup message is shown', ()=>{
        const store = mockStore({
            auth: {
                authSuccess: true,
                authError: false
            }}
        );
        const container = render(<Provider store={store}><SignUpForm/></Provider>);
        const snackbar = container.getByText('User created successfully');
        expect(snackbar).toBeDefined();
    });

    test ('Error message is shown', ()=>{
        const store = mockStore({
            auth: {
                authSuccess: false,
                authError: 'i am error message!'
            }}

        );
        const container = render(<Provider store={store}><SignUpForm/></Provider>);
        const snackbar = container.getByText('i am error message!');
        expect(snackbar).toBeDefined();
    });

    test('Errors are shown in fields if fields are blank', ()=>{
        const container = render(<Provider store={store}><SignUpForm/></Provider>);
        const inputNodeLogin = container.getByLabelText('Login');
        const inputNodeLoginLabel = container.getByText('Login');
        const inputNodePassword = container.getByLabelText('Password');
        const inputNodePasswordLabel = container.getByText('Password');
        const inputNodeRepeatPassword = container.getByLabelText('Repeat Password');
        const inputNodeRepeatPasswordLabel = container.getByText('Repeat Password');
        const inputNodeMail = container.getByLabelText('Email');
        const inputNodeMailLabel = container.getByText('Email');
        const inputNodeFirstName = container.getByLabelText('First Name');
        const inputNodeFirstNameLabel = container.getByText('First Name');
        const signUpButton = container.getByText('Sign Up').closest('button');

        fireEvent.change(inputNodeLogin, {target: {value:''}});

        fireEvent.change(inputNodePassword, {target: {value: ''}});
        fireEvent.change(inputNodeRepeatPassword, {target: {value: ''}});
        fireEvent.change(inputNodeMail, {target: {value: ''}});
        fireEvent.change(inputNodeFirstName, {target: {value: ''}});
        fireEvent.click(signUpButton);

        expect(inputNodeLoginLabel.textContent).toBe('Login: This field is required');
        expect(inputNodePasswordLabel.textContent).toBe('Password: This field is required');
        expect(inputNodeRepeatPasswordLabel.textContent).toBe('Repeat Password: This field is required');
        expect(inputNodeMailLabel.textContent).toBe('Email: This field is required');
        expect(inputNodeFirstNameLabel.textContent).toBe('First Name: This field is required');
    });

    test('Email Error is shown if email is invalid', ()=>{
        const container = render(<Provider store={store}><SignUpForm/></Provider>);
        const inputNodeLogin = container.getByLabelText('Login');
        const inputNodePassword = container.getByLabelText('Password');
        const inputNodeRepeatPassword = container.getByLabelText('Repeat Password');
        const inputNodeMail = container.getByLabelText('Email');
        const inputNodeMailLabel = container.getByText('Email');
        const inputNodeFirstName = container.getByLabelText('First Name');
        const signUpButton = container.getByText('Sign Up').closest('button');

        fireEvent.change(inputNodeLogin, {target: {value:'1'}});

        fireEvent.change(inputNodePassword, {target: {value: '1'}});
        fireEvent.change(inputNodeRepeatPassword, {target: {value: '1'}});
        fireEvent.change(inputNodeMail, {target: {value: '1'}});
        fireEvent.change(inputNodeFirstName, {target: {value: '1'}});
        fireEvent.click(signUpButton);

        expect(inputNodeMailLabel.textContent).toBe('Email is not valid');

    });

    test('Passwords dont match error is shown', ()=>{
        const container = render(<Provider store={store}><SignUpForm/></Provider>);
        const inputNodeLogin = container.getByLabelText('Login');
        const inputNodePassword = container.getByLabelText('Password');
        const inputNodeRepeatPassword = container.getByLabelText('Repeat Password');
        const inputNodeRepeatPasswordLabel = container.getByText('Repeat Password');
        const inputNodeMail = container.getByLabelText('Email');

        const inputNodeFirstName = container.getByLabelText('First Name');
        const signUpButton = container.getByText('Sign Up').closest('button');

        fireEvent.change(inputNodeLogin, {target: {value:'1'}});

        fireEvent.change(inputNodePassword, {target: {value: '1'}});
        fireEvent.change(inputNodeRepeatPassword, {target: {value: '12'}});
        fireEvent.change(inputNodeMail, {target: {value: 'test@test.ru'}});
        fireEvent.change(inputNodeFirstName, {target: {value: '1'}});
        fireEvent.click(signUpButton);

        expect(inputNodeRepeatPasswordLabel.textContent).toBe("Passwords don't match");

    });

    test ('SignUp snapshot', ()=>{
        const container = renderer.create(<Provider store={store}><SignInForm/></Provider>).toJSON();
        expect(container).toMatchSnapshot();
    });

});