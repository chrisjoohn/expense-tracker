import ExpenseContainer from "../ExpenseContainer";

import FixedExpenseForm from "./form";
const FixedExpenseContainer = (props) => {
  return <ExpenseContainer title="Fixed Expenses" form={FixedExpenseForm} />;
};

export default FixedExpenseContainer;
