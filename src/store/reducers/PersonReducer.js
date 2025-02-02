import * as types from '../sagas/persons/ActionTypes';

const initState = {
    creating: false,
    error: null,
    persons: [
    ],
    fetching: false
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
            return {...state, success: true, creating: false};
        case types.CREATE_PERSON_FAILURE:
            return {...state, success: false, error: action.error};
        case types.CREATE_PERSON_PROGRESS:
            return {...state, creating: true};

        case types.EDIT_PERSON_REQUEST:
            return {...state, firstName: action.payload.firstName, secondName: action.payload.secondName};
        case types.EDIT_PERSON_SUCCESS:
            return {...state, success: true};
        case types.EDIT_PERSON_FAILURE:
            return {...state, success: false, error: action.error};

        case types.DELETE_PERSON_SUCCESS:
            return state;

        case types.LAST_PERSON_CREATED:
            return {...state, lastPersonCreatedId: action.personCreatedId};
        case types.CREATE_PERSON_RESET:
            return {...state, lastPersonCreatedId: null};

        case types.RESET_SUCCESS:
            return {...state, success: false};
        case types.RESET_ERROR:
            return {...state, error: null};
        default:
            return state;
        }


};

export default personReducer;


