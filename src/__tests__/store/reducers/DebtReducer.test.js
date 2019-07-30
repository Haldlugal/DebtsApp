import reducer from '../../../store/reducers/DebtReducer'
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
const mockPersons = ['person1', 'person2'];
const mockDebts = ['debt1', 'debt2'];
const mockDebt = {debt:'debt'};
const mockError = new Error('mock');

describe('DEBT REDUCER', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initState)
    });
    it('should handle "GET_ALL_PERSONS_SUCCESS" action', () => {
        expect(reducer({}, {type: 'GET_ALL_PERSONS_SUCCESS', persons: mockPersons})).toEqual({persons: mockPersons});
    });
    it('should handle "GET_DEBTS_SUCCESS" action', () => {
        expect(reducer({}, {type: 'GET_DEBTS_SUCCESS', debts: mockDebts})).toEqual({ debts: mockDebts})
    });
    it('should handle "GET_DEBT_REQUEST" action', () => {
        expect(reducer({}, {type: 'GET_DEBT_REQUEST'})).toEqual({})
    });
    it('should handle "GET_DEBT_SUCCESS" action', () => {
        expect(reducer({}, {type: 'GET_DEBT_SUCCESS', debt: mockDebt})).toEqual({debt: mockDebt})
    });
    it('should handle "GET_STATISTICS_SUCCESS" action', () => {
        expect(reducer({}, {type: 'GET_STATISTICS_SUCCESS', myDebts: mockDebts, theirDebts: mockDebts}))
            .toEqual({fetching: false, error: false, myDebts: mockDebts, theirDebts: mockDebts});
    });
    it('should handle "CREATE_DEBT_SUCCESS" action', () => {
        expect(reducer({}, {type: 'CREATE_DEBT_SUCCESS'})).toEqual({success: true})
    });
    it('should handle "EDIT_DEBT_SUCCESS" action', () => {
        expect(reducer({}, {type: 'EDIT_DEBT_SUCCESS'})).toEqual({success: true})
    });
    it('should handle "DELETE_DEBT_SUCCESS" action', () => {
        expect(reducer({}, {type: 'DELETE_DEBT_SUCCESS'})).toEqual({debtDeleted: true})
    });
    it('should handle "FAILURE" action', () => {
        expect(reducer({}, {type: 'FAILURE', error: mockError})).toEqual({fetching: false, error: mockError})
    });
    it('should handle "FETCHING" action', () => {
        expect(reducer({}, {type: 'FETCHING'})).toEqual({fetching: true})
    });
    it('should handle "FETCHING_RESET" action', () => {
        expect(reducer({}, {type: 'FETCHING_RESET'})).toEqual({fetching: false})
    });
    it('should handle "RESET_SUCCESS" action', () => {
        expect(reducer({}, {type: 'RESET_SUCCESS'})).toEqual({success: false})
    });
    it('should handle "RESET_ERROR" action', () => {
        expect(reducer({}, {type: 'RESET_ERROR'})).toEqual({error: false})
    });
    it('should handle "RESET_DEBT_DELETED" action', () => {
        expect(reducer({}, {type: 'RESET_DEBT_DELETED'})).toEqual({debtDeleted: false})
    });
});