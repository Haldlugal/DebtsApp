import { takeLatest } from 'redux-saga/effects';
import * as types from "../../../../store/sagas/auth/ActionTypes";
import * as actions from "../../../../store/sagas/auth/Actions";
import * as listeners from "../../../../store/sagas/auth/Listeners";

describe('sagas authListeners', () => {
    it('should dispatch action "LOGIN_REQUEST" ', () => {
        const generator = listeners.signInSaga();
        expect(generator.next().value)
            .toEqual(takeLatest(types.LOGIN_REQUEST, actions.signIn));
        expect(generator.next().done).toBeTruthy();
    });
    it('should dispatch action "LOGOUT_REQUEST" ', () => {
        const generator = listeners.logoutSaga();
        expect(generator.next().value)
            .toEqual(takeLatest(types.LOGOUT_REQUEST, actions.logout));
        expect(generator.next().done).toBeTruthy();
    });
    it('should dispatch action "IS_AUTHENTICATED_REQUEST" ', () => {
        const generator = listeners.isAuthenticatedSaga();
        expect(generator.next().value)
            .toEqual(takeLatest(types.IS_AUTHENTICATED_REQUEST, actions.checkAuth));
        expect(generator.next().done).toBeTruthy();
    });
    it('should dispatch action "SIGN_UP_REQUEST" ', () => {
        const generator = listeners.signUpSaga();
        expect(generator.next().value)
            .toEqual(takeLatest(types.SIGN_UP_REQUEST, actions.signUp));
        expect(generator.next().done).toBeTruthy();
    });
});