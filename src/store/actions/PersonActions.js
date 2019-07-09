import personApi from '../../api/PersonApi';
import * as types from '../sagas/persons/ActionTypes';


export const createPerson = (person) => {
    return (dispatch, getState) => {
        personApi.addPerson(person).then(() => {
            dispatch({
                type: types.CREATE_PERSON
            })
        });
    }
};

export const selectPersons = () => {
    return (dispatch, getState) => {
        personApi.getPersons().then(persons => {
            dispatch(loadPersonsSuccess(persons));
        });
    }
};

export const getPerson = (id) => {
    console.log("getPerson called");
    /*return (dispatch, getState) => {
        personApi.getPerson(id).then( person => {
            console.log(person);
            dispatch ({
                type: types.GET_PERSON,
                person
            });
        });
    }*/
};



function loadPersonsSuccess(persons) {
    return {type: types.LOAD_PERSONS_SUCCESS, persons};
}
