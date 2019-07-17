import * as types from "./ActionTypes";
import * as actions from "./Actions";
import { takeLatest } from "redux-saga/effects";

export function* signInSaga() {
    yield takeLatest(types.LOGIN_REQUEST, actions.signIn);
}

export function* logoutSaga() {
    yield takeLatest(types.LOGOUT_REQUEST, actions.logout);
}

export function* isAuthenticatedSaga() {
    yield takeLatest(types.IS_AUTHENTICATED_REQUEST, actions.checkAuth);
}

export function* signUpSaga() {
    yield takeLatest(types.SIGN_UP_REQUEST, actions.signUp);
}