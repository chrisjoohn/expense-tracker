import { combineReducers } from "redux";

import AuthReducer from "./AuthReducer";
import ExpenseReducer from "./ExpenseReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  expense: ExpenseReducer,
});

export default rootReducer;
