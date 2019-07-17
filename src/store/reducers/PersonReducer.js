import * as types from '../sagas/persons/ActionTypes';

const initState = {
    persons: [
    ]
};

const personReducer = (state = initState, action) => {
    switch (action.type) {
        case types.GET_PERSONS_REQUEST:
            return {...state, fetching:true, error: null, success:false};
        case types.GET_PERSONS_SUCCESS:
            return {...state, fetching:false, persons: action.persons };
        case types.GET_PERSONS_FAILURE:
            return {...state, fetching:false, error: action.error};

        case types.PERSON_FETCHING:
            return {...state, fetching: true, firstName: "", secondName: ""};
        case types.GET_PERSON_SUCCESS:
            return {...state, fetching: false, firstName: action.person.firstName, secondName: action.person.secondName};
        case types.GET_PERSON_FAILURE:
            return {...state, fetching: false, firstName: "", secondName: ""};

        case types.CREATE_PERSON_SUCCESS:
            return {...state, success: true};

        case types.EDIT_PERSON_REQUEST:
            return {...state, firstName: action.payload.firstName, secondName: action.payload.secondName};
        case types.EDIT_PERSON_SUCCESS:
            return {...state, success: true};
        case types.EDIT_PERSON_FAILURE:
            return {...state, success: false, error: action.error};

        case types.DELETE_PERSON_SUCCESS:
            return state;

        case types.RESET_SUCCESS:
            return {...state, success: false};
        case types.RESET_ERROR:
            return {...state, error: null};
        default:
            return state;
        }


};

export default personReducer;


