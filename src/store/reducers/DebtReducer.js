import * as types from '../sagas/debts/ActionTypes';

const initState = {
    fetchingPersons: true,
    persons: [
    ]
};

const debtReducer = (state = initState, action) => {
    switch (action.type) {
        case types.GET_ALL_PERSONS_SUCCESS:
            return {...state, fetchingPersons:false, persons: action.persons };
    }
    return state;
};

export default debtReducer;


