import { call, put } from "redux-saga/effects";
import * as types from "../../../../store/sagas/auth/ActionTypes";
import * as actions from "../../../../store/sagas/auth/Actions";
import authApi from "../../../../api/AuthApi";

describe('sagas auth actions', () => {
    it('signIn', () => {
        const fakeAction ={
            payload:'fakePayload'
        };
        const fakeError = {
            message: 'fake'
        };
        const generator = actions.signIn(fakeAction);

        expect(generator.next().value)
            .toEqual(call(authApi.getToken));
        expect(generator.next().value)
            .toEqual(call(authApi.signIn, fakeAction.payload));
        expect(generator.next().value)
            .toEqual(put({ type: types.LOGIN_SUCCESS}));
        expect(generator.throw(fakeError).value)
            .toEqual(put({ type: types.LOGIN_FAILURE, error:fakeError.message }));
    });

    it('logout', () => {
        const fakeError = {
            message: 'fake'
        };
        const generator = actions.logout();

        expect(generator.next().value)
            .toEqual(call(authApi.logout));
        expect(generator.next().value)
            .toEqual(put({ type: types.LOGOUT_SUCCESS}));
        expect(generator.throw(fakeError).value)
            .toEqual(put({ type: types.LOGOUT_ERROR, error:fakeError }));
    });

    it('check authorization', () => {
        const fakeError = {
            message: 'fake'
        };
        const generator = actions.checkAuth();

        expect(generator.next().value)
            .toEqual(call(authApi.getUserLoggedIn));
        expect(generator.next().value)
            .toEqual(put({type: types.AUTHENTICATED, auth: true}));
        expect(generator.throw(fakeError).value)
            .toEqual(put({type:types.AUTHENTICATED, auth: false}));
    });

    it('check signUp', () => {
        const fakeAction ={
            payload:'fakePayload'
        };
        const fakeError = {
            message: 'fake'
        };
        const generator = actions.signUp(fakeAction);

        expect(generator.next().value)
            .toEqual(call(authApi.getToken));
        expect(generator.next().value)
            .toEqual(call(authApi.signUpUser, fakeAction.payload));
        expect(generator.next().value)
            .toEqual( put({type: types.SIGN_UP_SUCCESS}));
        expect(generator.throw(fakeError).value)
            .toEqual( put({type: types.SIGN_UP_ERROR, error: fakeError.message}));
    });
});

