import { fork, all } from "redux-saga/effects";
import * as listeners from './persons/Listeners';


export function* watcherSaga() {
    yield all([fork(listeners.personsSaga), fork(listeners.singlePersonSaga), fork(listeners.editPersonSaga), fork(listeners.addPersonSaga), fork(listeners.deletePersonSaga)]);
}
