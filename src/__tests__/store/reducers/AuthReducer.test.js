import reducer from "../../../store/reducers/AuthReducer";

const initState = {login: false, authChecked: false};
const mockError = new Error('mock');
const mockAuth = false;

describe('AUTH REDUCER', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initState)
    });
    it('should handle "LOGIN_SUCCESS" action', () => {
        expect(reducer({}, {type: 'LOGIN_SUCCESS'})).toEqual({authenticated:true});
    });
    it('should handle "LOGIN_FAILURE" action', () => {
        expect(reducer({}, {type: 'LOGIN_FAILURE', error: mockError})).toEqual({authenticated:false, loginError: mockError});
    });
    it('should handle "LOGOUT_SUCCESS" action', () => {
        expect(reducer({}, {type: 'LOGOUT_SUCCESS'})).toEqual({authenticated:false});
    });
    it('should handle "AUTHENTICATED" action', () => {
        expect(reducer({}, {type: 'AUTHENTICATED', auth: mockAuth})).toEqual({authenticated:mockAuth,  authChecked: true});
    });
    it('should handle "SIGN_UP_SUCCESS" action', () => {
        expect(reducer({}, {type: 'SIGN_UP_SUCCESS'})).toEqual({authSuccess:true});
    });
    it('should handle "SIGN_UP_ERROR" action', () => {
        expect(reducer({}, {type: 'SIGN_UP_ERROR', error: mockError})).toEqual({authError: mockError});
    });
    it('should handle "SIGN_UP_SUCCESS_RESET" action', () => {
        expect(reducer({}, {type: 'SIGN_UP_SUCCESS_RESET'})).toEqual({ authSuccess: false});
    });
    it('should handle "SIGN_UP_ERROR_RESET" action', () => {
        expect(reducer({}, {type: 'SIGN_UP_ERROR_RESET'})).toEqual({ authError: null});
    });
    it('should handle "LOGIN_ERROR_RESET" action', () => {
        expect(reducer({}, {type: 'LOGIN_ERROR_RESET'})).toEqual({ loginError: null});
    });
});
