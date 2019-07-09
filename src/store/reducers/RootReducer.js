import authReducer from './AuthReducer';
import debtReducer from './DebtReducer';
import personReducer from './PersonReducer';
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    auth: authReducer,
    debts: debtReducer,
    persons: personReducer
});

export default rootReducer