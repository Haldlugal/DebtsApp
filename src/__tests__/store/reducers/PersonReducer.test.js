import reducer from '../../../store/reducers/PersonReducer'


describe('PERSON REDUCER', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({persons: [], error: null, fetching: false})
    });

    it('should handle "GET_PERSONS_REQUEST" action', () => {
        expect(reducer({}, {type: 'GET_PERSONS_REQUEST'})).toEqual({fetching:true, error: null, success:false})
    });
    it('should handle "GET_PERSONS_SUCCESS" action', () => {
        expect(reducer({}, {type: 'GET_PERSONS_SUCCESS', persons: 'person'})).toEqual({fetching:false, persons: 'person'})
    });
    it('should handle "GET_PERSONS_FAILURE" action', () => {
        expect(reducer({}, {type: 'GET_PERSONS_FAILURE', error: 'error'})).toEqual({fetching:false, error: 'error'})
    });

    it('should handle "PERSON_FETCHING" action', () => {
        expect(reducer({}, {type: 'PERSON_FETCHING', error: 'error'})).toEqual({fetching: true, firstName: "", secondName: ""})
    });
    it('should handle "GET_PERSON_SUCCESS" action', () => {
        expect(reducer({}, {type: 'GET_PERSON_SUCCESS', person: {firstName:'test1', secondName:'test2'}})).toEqual({fetching: false, firstName: 'test1', secondName: 'test2'})
    });
    it('should handle "GET_PERSON_FAILURE" action', () => {
        expect(reducer({}, {type: 'GET_PERSON_FAILURE'})).toEqual({fetching: false, firstName: "", secondName: ""})
    });

    it('should handle "CREATE_PERSON_SUCCESS" action', () => {
        expect(reducer({}, {type: 'CREATE_PERSON_SUCCESS'})).toEqual({success: true})
    });

    it('should handle "EDIT_PERSON_REQUEST" action', () => {
        expect(reducer({}, {type: 'EDIT_PERSON_REQUEST', payload: {firstName:'test1', secondName:'test2'}})).toEqual({firstName: 'test1', secondName: 'test2'})
    });
    it('should handle "EDIT_PERSON_SUCCESS" action', () => {
        expect(reducer({}, {type: 'EDIT_PERSON_SUCCESS'})).toEqual({success: true})
    });
    it('should handle "EDIT_PERSON_FAILURE" action', () => {
        expect(reducer({}, {type: 'EDIT_PERSON_FAILURE', error: 'error'})).toEqual({success: false, error: 'error'})
    });

    it('should handle "DELETE_PERSON_SUCCESS" action', () => {
        expect(reducer({}, {type: 'DELETE_PERSON_SUCCESS'})).toEqual({})
    });

    it('should handle "RESET_SUCCESS" action', () => {
        expect(reducer({}, {type: 'RESET_SUCCESS'})).toEqual({success: false})
    });
    it('should handle "RESET_ERROR" action', () => {
        expect(reducer({}, {type: 'RESET_ERROR'})).toEqual({error: null})
    });
});