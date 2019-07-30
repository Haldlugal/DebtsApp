import { takeLatest } from 'redux-saga/effects';
import * as types from "../../../../store/sagas/debts/ActionTypes";
import * as actions from "../../../../store/sagas/debts/Actions";
import * as listeners from "../../../../store/sagas/debts/Listeners";

describe('sagas authListeners', () => {
    it('should dispatch action "GET_ALL_PERSONS_REQUEST" ', () => {
        const generator = listeners.personsSaga();
        expect(generator.next().value)
            .toEqual(takeLatest(types.GET_ALL_PERSONS_REQUEST, actions.getAllPersons));
        expect(generator.next().done).toBeTruthy();
    });
    it('should dispatch action "CREATE_DEBT_REQUEST" ', () => {
        const generator = listeners.createDebtSaga();
        expect(generator.next().value)
            .toEqual(takeLatest(types.CREATE_DEBT_REQUEST, actions.createDebt));
        expect(generator.next().done).toBeTruthy();
    });
    it('should dispatch action "GET_DEBTS_REQUEST" ', () => {
        const generator = listeners.debtsSaga();
        expect(generator.next().value)
            .toEqual(takeLatest(types.GET_DEBTS_REQUEST, actions.getDebts));
        expect(generator.next().done).toBeTruthy();
    });
    it('should dispatch action "DELETE_DEBT_REQUEST" ', () => {
        const generator = listeners.deleteDebtSaga();
        expect(generator.next().value)
            .toEqual(takeLatest(types.DELETE_DEBT_REQUEST, actions.deleteDebt));
        expect(generator.next().done).toBeTruthy();
    });
    it('should dispatch action "GET_DEBT_REQUEST" ', () => {
        const generator = listeners.getSingleDebtSaga();
        expect(generator.next().value)
            .toEqual(takeLatest(types.GET_DEBT_REQUEST, actions.getSingleDebt));
        expect(generator.next().done).toBeTruthy();
    });
    it('should dispatch action "EDIT_DEBT_REQUEST" ', () => {
        const generator = listeners.editDebtSaga();
        expect(generator.next().value)
            .toEqual(takeLatest(types.EDIT_DEBT_REQUEST, actions.editDebt));
        expect(generator.next().done).toBeTruthy();
    });
    it('should dispatch action "GET_STATISTICS_REQUEST" ', () => {
        const generator = listeners.getStatisticsSaga();
        expect(generator.next().value)
            .toEqual(takeLatest(types.GET_STATISTICS_REQUEST, actions.getStatistics));
        expect(generator.next().done).toBeTruthy();
    });

});