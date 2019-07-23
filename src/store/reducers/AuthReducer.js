import * as types from '../sagas/auth/ActionTypes';

const initState = {login: false, authChecked: false};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return {...state, authenticated:true};
        case types.LOGIN_FAILURE:
            return {...state, authenticated:false, loginError: action.error};
        case types.LOGOUT_SUCCESS:
            return {...state, authenticated:false};
        case types.AUTHENTICATED:
            return {...state, authenticated: action.auth, authChecked: true};
        case types.SIGN_UP_SUCCESS:
            return {...state, authSuccess: true};
        case types.SIGN_UP_ERROR:
            return {...state, authError: action.error};
        case types.SIGN_UP_SUCCESS_RESET:
            return {...state, authSuccess: false};
        case types.SIGN_UP_ERROR_RESET:
            return {...state, authError: null};
        case types.LOGIN_ERROR_RESET:
            return {...state, loginError: null}
        default:
            return state;
    }

};

export default authReducer;


