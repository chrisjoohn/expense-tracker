import { combineReducers } from "redux";

import AuthReducer from "./AuthReducer";
import ExpenseReducer from "./ExpenseReducer";
import FixedExpenseReducer from "./FixedExpenseReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  expense: ExpenseReducer,
  fixedExpense: FixedExpenseReducer,
});

export default rootReducer;
