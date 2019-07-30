import { call, put } from "redux-saga/effects";
import * as types from './ActionTypes';
import authApi from '../../../api/AuthApi';
import {delay} from "q";

export function* signIn(action) {
    try {
        yield call(authApi.getToken);
        yield call(authApi.signIn, action.payload);
        yield put({ type: types.LOGIN_SUCCESS});
    } catch (error) {
        yield put({ type: types.LOGIN_FAILURE, error: error.message });
        yield delay(4000);
        yield put({type: types.LOGIN_ERROR_RESET});
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
        yield put({type: types.AUTHENTICATED, auth: isAuth!==0});
    } catch (error) {
        yield put({type:types.AUTHENTICATED, auth: false});
    }
}

export function* signUp(action) {
    try {
        yield call(authApi.getToken);
        yield call(authApi.signUpUser, action.payload);
        yield put({type: types.SIGN_UP_SUCCESS});
        yield delay(2000);
        yield put({type: types.SIGN_UP_SUCCESS_RESET});
    } catch (error) {
        yield put({type: types.SIGN_UP_ERROR, error: error.message});
        yield delay(4000);
        yield put({type: types.SIGN_UP_ERROR_RESET});
    }
}