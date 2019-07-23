import * as types from '../sagas/debts/ActionTypes';

const initState = {
    fetchingPersons: true,
    fetchingDebts: true,
    fetchingDebt: false,
    persons: [
    ],
    debts: [],
    debt: []
};

const debtReducer = (state = initState, action) => {
    switch (action.type) {
        case types.GET_ALL_PERSONS_SUCCESS:
            return {...state, fetchingPersons:false, persons: action.persons };
        case types.GET_DEBTS_SUCCESS:
            return {...state, debts: action.debts, fetchingDebts:false};
        case types.GET_DEBT_REQUEST:
            return {...state, fetchingDebt: true};
        case types.GET_DEBT_SUCCESS:
            return {...state, debt:action.debt, fetchingDebt: false};
        case types.GET_STATISTICS_SUCCESS:
            return {...state, myDebts: action.myDebts, theirDebts: action.theirDebts};
        default:
            return state;
    }

};

export default debtReducer;


