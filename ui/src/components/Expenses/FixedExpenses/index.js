import { useSelector } from "react-redux";
import ExpenseContainer from "../ExpenseContainer";

import FixedExpenseForm from "./form";
const FixedExpenseContainer = (props) => {
  const { list } = useSelector((state) => state.fixedExpense);
  return (
    <ExpenseContainer
      title="Fixed Expenses"
      form={FixedExpenseForm}
      expenses={list}
    />
  );
};

export default FixedExpenseContainer;
