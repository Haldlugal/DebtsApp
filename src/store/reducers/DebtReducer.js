import * as types from '../sagas/debts/ActionTypes';

const initState = {
    fetching: false,
    debtDeleted: false,
    error: false,
    success: false,
    persons: [
    ],
    debts: [],
    debt: []
};

const debtReducer = (state = initState, action) => {
    switch (action.type) {
        case types.GET_ALL_PERSONS_SUCCESS:
            return {...state, persons: action.persons };
        case types.GET_DEBTS_SUCCESS:
            return {...state, debts: action.debts};
        case types.GET_DEBT_REQUEST:
            return {...state};
        case types.GET_DEBT_SUCCESS:
            return {...state, debt:action.debt};
        case types.GET_STATISTICS_SUCCESS:
            return {...state, myDebts: action.myDebts, theirDebts: action.theirDebts, fetching: false, error: false};
        case types.CREATE_DEBT_SUCCESS:
            return {...state, success: true};
        case types.EDIT_DEBT_SUCCESS:
            return {...state, success: true};
        case types.DELETE_DEBT_SUCCESS:
            return {...state, debtDeleted: true};
        case types.FAILURE:
            return {...state, fetching: false, error: action.error};
        case types.FETCHING:
            return {...state, fetching: true};
        case types.FETCHING_RESET:
            return {...state, fetching: false};
        case types.RESET_SUCCESS:
            return {...state, success: false};
        case types.RESET_ERROR:
            return {...state, error: false};
        case types.RESET_DEBT_DELETED:
            return {...state, debtDeleted: false};
        default:
            return state;
    }
};

export default debtReducer;


