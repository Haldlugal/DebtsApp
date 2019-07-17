import { fork, all } from "redux-saga/effects";
import * as personListeners from './persons/Listeners';
import * as authListeners from './auth/Listeners';


export function* watcherSaga() {
    yield all([
        fork(personListeners.personsSaga), fork(personListeners.singlePersonSaga), fork(personListeners.editPersonSaga), fork(personListeners.addPersonSaga), fork(personListeners.deletePersonSaga),
        fork(authListeners.signInSaga), fork(authListeners.logoutSaga), fork(authListeners.isAuthenticatedSaga), fork(authListeners.signUpSaga)
        ]);
}
