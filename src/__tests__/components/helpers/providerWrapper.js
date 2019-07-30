import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "../../../store/reducers/RootReducer";
import {watcherSaga} from "../../../store/sagas/RootSaga";
import {Provider} from "react-redux";
import React from "react";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    compose(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watcherSaga);

export function wrapWithProvider(component) {
    return <Provider store={store}>{component}</Provider>;
}

