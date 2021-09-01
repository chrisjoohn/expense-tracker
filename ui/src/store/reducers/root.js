import { combineReducers } from "redux";

import AuthReducer from "./AuthReducer";
import ExpenseReducer from "./ExpenseReducer";
import FixedExpenseReducer from "./FixedExpenseReducer";
import CommonReducer from './CommonReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  expense: ExpenseReducer,
  fixedExpense: FixedExpenseReducer,
  common: CommonReducer
});

export default rootReducer;
