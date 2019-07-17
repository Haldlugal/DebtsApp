import { call, put } from "redux-saga/effects";
import * as types from './ActionTypes';
import authApi from '../../../api/AuthApi';

export function* signIn(action) {
    try {
        yield call(authApi.signIn, action.payload);
        yield put({ type: types.LOGIN_SUCCESS});
    } catch (error) {
        yield put({ type: types.LOGIN_FAILURE, error: error.message });
    }
}

export function* logout() {
    try {
        yield call(authApi.logout);
        yield put({type: types.LOGOUT_SUCCESS});
    } catch (error) {
        yield put({type: types.LOGOUT_ERROR, error});
    }
}

export function* checkAuth() {
    try {
        const isAuth = yield call(authApi.getUserLoggedIn);
        yield put({type: types.AUTHENTICATED, auth: isAuth});
    } catch (error) {
        yield put({type:types.AUTHENTICATED, auth: false});
    }
}

export function* signUp(action) {
    try {
        yield call(authApi.signUpUser, action.payload);
        yield put({type: types.SIGN_UP_SUCCESS});
    } catch (error) {
        yield put({type: types.SIGN_UP_ERROR, error: error});
    }
}